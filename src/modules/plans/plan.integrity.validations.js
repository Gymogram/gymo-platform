import _ from 'lodash';
import PeriodType from './models/periodType.model';
import Stage from './models/stageType.model';
import Activity from '../activities/models/activity.model';

export default class PlanIntegrityValidator {
  constructor(build) {
    this.areAllStagesValid = build.areAllStagesValid;
    this.areAllPeriodTypesValid = build.areAllPeriodTypesValid;
    this.areAllActivitiesValid = build.areAllActivitiesValid;
    this.isBasicStructureValid = this.areAllActivitiesValid === true && this.areAllPeriodTypesValid === true && this.areAllStagesValid === true;
    this.isPlanDurationValid = build.isPlanDurationValid;
  }
  static get Builder() {
    class Builder {
      constructor(req, original) {
        this.req = req;
        this.legacyActivities = [];
        this.legacyPeriodTypes = [];
        this.legacyStages = [];
        this.original = original || null;
      }
      withPlanDurationValidation() {
        this.isPlanDurationValid = true;

        if (this.original) {
          const partialStart = this.req.startDate ? this.req.startDate : this.original.startDate;
          const partialEnd = this.req.endDate ? this.req.endDate : this.original.endDate;
         
          /* const diffTime = Math.abs(partialStart.getTime() - partialEnd.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); */
          this.isPlanDurationValid = partialEnd > partialStart;
        }
        return this;
      }
      withDefaultBasicValidation() {
        this.areAllActivitiesValid = true;
        this.areAllStagesValid = true;
        this.areAllPeriodTypesValid = true;
       
        if (this.req.months && this.req.months.length > 0) {
          // Check all the activities in the plan exist.
          const activityIDs = [];
          this.req.months.forEach(month => {
            if (month.weeks) {
              month.weeks.forEach(week => {
                if (week.sessions) {
                  week.sessions.forEach(session => {
                    if (session.works) {
                      session.works.forEach(work => {
                        if (!_.find(activityIDs, work.activityID)) {
                          activityIDs.push(work.activityID);
                        }    
                      });
                    }
                  });
                }
              });
            } 
          });

          this.areAllActivitiesValid = _.difference(activityIDs, this.legacyActivities).length === 0;
        
          // Check valid Stage
          const stagesIDs = [];
          this.req.months.forEach(month => {
            if (!_.find(stagesIDs, month.stageID) && month.stageID) {
              stagesIDs.push(month.stageID);
            }
          });
          if (stagesIDs.length !== 0) {
            this.areAllStagesValid = _.difference(stagesIDs, this.legacyStages).length === 0;
          }

          // Check valid Period Type
          const periodTypeIDs = [];
          this.req.months.forEach(month => {
            if (!_.find(periodTypeIDs, month.periodTypeID) && month.periodTypeID) {
              periodTypeIDs.push(month.periodTypeID);
            }
          });
          if (periodTypeIDs.length !== 0) {
            this.areAllPeriodTypesValid = _.difference(periodTypeIDs, this.legacyPeriodTypes).length === 0;
          }
        }

        return this;
      }
      
      build() {
        return new PlanIntegrityValidator(this);
      }

      async syncronizeLegacyData() {
        this.legacyPeriodTypes = await PeriodType.distinct('_id');
        this.legacyPeriodTypes = this.legacyPeriodTypes.map((element) => element.toHexString());
        this.legacyStages = await Stage.distinct('_id');
        this.legacyStages = this.legacyStages.map((element) => element.toHexString());
        this.legacyActivities = await Activity.distinct('_id');
        this.legacyActivities = this.legacyActivities.map((element) => element.toHexString());
      }
    }
    return Builder;
  }
}
