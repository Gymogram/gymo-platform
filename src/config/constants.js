// TODO: REFACTOR TO UDR NPM CONFIG PACKAGE. JSON BY ENVIRONMENT, CUSTOM ENV JSON FOR SENSIBLE DATA. (DONE)
// TODO: SEE EMBBEDB OBJECT DESIGN , (IN PRO)
// TODO: USE LODASH to handle REQUEST BODY ATTR. (DONE)
// TODO: USE JOI PASS COMPLEXITY LIB to improve password validation (N/A for this)
// TODO: USE BCRYPT SALT TO HASS PASSWORD (DONE)
// TODO: DEFINE AND SETUP LOG POLICY, MORGAN AND WISTON
// TODO: IMPROVE ERROR HANDLING FOR MOGNO DB QUERIES
// TODO: EXCLUDE COVERGAGE FOLDER IN GITIGNORE

const defaultServerCfg = {
  PORT: process.env.PORT || 3434,
};

export default {
  ...defaultServerCfg,
};