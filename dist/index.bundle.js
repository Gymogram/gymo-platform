module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/constants.js":
/*!*********************************!*\
  !*** ./src/config/constants.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"@babel/runtime/helpers/objectSpread\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n\n// TODO: REFACTOR TO UDR NPM CONFIG PACKAGE. JSON BY ENVIRONMENT, CUSTOM ENV JSON FOR SENSIBLE DATA. (DONE)\n// TODO: SEE EMBBEDB OBJECT DESIGN , (IN PRO)\n// TODO: USE LODASH to handle REQUEST BODY ATTR. (DONE)\n// TODO: USE JOI PASS COMPLEXITY LIB to improve password validation (N/A for this)\n// TODO: USE BCRYPT SALT TO HASS PASSWORD (DONE)\n// TODO: DEFINE AND SETUP LOG POLICY, MORGAN AND WISTON\n// TODO: IMPROVE ERROR HANDLING FOR MOGNO DB QUERIES\n// TODO: EXCLUDE COVERGAGE FOLDER IN GITIGNORE\nvar defaultServerCfg = {\n  PORT: process.env.PORT || 3434\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultServerCfg));\n\n//# sourceURL=webpack:///./src/config/constants.js?");

/***/ }),

/***/ "./src/config/data/identification_types.json":
/*!***************************************************!*\
  !*** ./src/config/data/identification_types.json ***!
  \***************************************************/
/*! exports provided: 0, 1, 2, default */
/***/ (function(module) {

eval("module.exports = [{\"name\":\"D.N.I.\",\"description\":\"\"},{\"name\":\"I.D.\",\"description\":\"\"},{\"name\":\"Passport\",\"description\":\"\"}];\n\n//# sourceURL=webpack:///./src/config/data/identification_types.json?");

/***/ }),

/***/ "./src/config/data/period_types.json":
/*!*******************************************!*\
  !*** ./src/config/data/period_types.json ***!
  \*******************************************/
/*! exports provided: 0, 1, 2, default */
/***/ (function(module) {

eval("module.exports = [{\"name\":\"Preparation\",\"description\":\"TBD.\"},{\"name\":\"Competitive\",\"description\":\"TBD.\"},{\"name\":\"Transition\",\"description\":\"TBD.\"}];\n\n//# sourceURL=webpack:///./src/config/data/period_types.json?");

/***/ }),

/***/ "./src/config/data/stage_types.json":
/*!******************************************!*\
  !*** ./src/config/data/stage_types.json ***!
  \******************************************/
/*! exports provided: 0, 1, 2, 3, default */
/***/ (function(module) {

eval("module.exports = [{\"name\":\"General\",\"description\":\"TBD\"},{\"name\":\"Specific\",\"description\":\"TBD\"},{\"name\":\"Development\",\"description\":\"TBD\"},{\"name\":\"Maintenance\",\"description\":\"TBD\"}];\n\n//# sourceURL=webpack:///./src/config/data/stage_types.json?");

/***/ }),

/***/ "./src/config/databases.js":
/*!*********************************!*\
  !*** ./src/config/databases.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! config */ \"config\");\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _modules_users_models_identificationType_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../modules/users/models/identificationType.model */ \"./src/modules/users/models/identificationType.model.js\");\n/* harmony import */ var _modules_plans_models_stageType_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../modules/plans/models/stageType.model */ \"./src/modules/plans/models/stageType.model.js\");\n/* harmony import */ var _modules_plans_models_periodType_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../modules/plans/models/periodType.model */ \"./src/modules/plans/models/periodType.model.js\");\n\n\n\n/* eslint-disable no-console */\n\n\n\n\n\nmongoose__WEBPACK_IMPORTED_MODULE_2___default.a.Promise = global.Promise;\n\ntry {\n  mongoose__WEBPACK_IMPORTED_MODULE_2___default.a.connect(config__WEBPACK_IMPORTED_MODULE_3___default.a.get('db.url'), {\n    useNewUrlParser: true\n  });\n} catch (error) {\n  mongoose__WEBPACK_IMPORTED_MODULE_2___default.a.createConnection(config__WEBPACK_IMPORTED_MODULE_3___default.a.get('db.url'));\n}\n\nmongoose__WEBPACK_IMPORTED_MODULE_2___default.a.connection.on('error', function (e) {\n  console.error.bind(console, 'DB connection error:');\n  throw e;\n}).once('open',\n/*#__PURE__*/\n_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n/*#__PURE__*/\n_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          console.log(\"DB connected to: \".concat(config__WEBPACK_IMPORTED_MODULE_3___default.a.get('db.url')));\n          _context.next = 3;\n          return initializeReferenceData();\n\n        case 3:\n        case \"end\":\n          return _context.stop();\n      }\n    }\n  }, _callee);\n})));\n\nfunction initializeReferenceData() {\n  return _initializeReferenceData.apply(this, arguments);\n}\n\nfunction _initializeReferenceData() {\n  _initializeReferenceData = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.next = 2;\n            return _modules_users_models_identificationType_model__WEBPACK_IMPORTED_MODULE_4__[\"default\"].initialize();\n\n          case 2:\n            _context2.next = 4;\n            return _modules_plans_models_stageType_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].initialize();\n\n          case 4:\n            _context2.next = 6;\n            return _modules_plans_models_periodType_model__WEBPACK_IMPORTED_MODULE_6__[\"default\"].initialize();\n\n          case 6:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n  return _initializeReferenceData.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/config/databases.js?");

/***/ }),

/***/ "./src/config/error.js":
/*!*****************************!*\
  !*** ./src/config/error.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// eslint-disable-next-line no-unused-vars\nmodule.exports = function (err, req, res, next) {\n  // eslint-disable-next-line no-console\n  console.log(err.message);\n  res.status(500).send('Something failed');\n};\n\n//# sourceURL=webpack:///./src/config/error.js?");

/***/ }),

/***/ "./src/config/middlewares.js":
/*!***********************************!*\
  !*** ./src/config/middlewares.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error */ \"./src/config/error.js\");\n/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_error__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nvar isDev = \"development\" === 'development';\nvar isProd = \"development\" === 'production';\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (app) {\n  if (isProd) {\n    app.use(helmet__WEBPACK_IMPORTED_MODULE_3___default()());\n    app.use(compression__WEBPACK_IMPORTED_MODULE_2___default()());\n  }\n\n  app.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.json());\n  app.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.urlencoded({\n    extended: true\n  }));\n\n  if (isDev) {\n    app.use(morgan__WEBPACK_IMPORTED_MODULE_0___default()('dev'));\n  }\n\n  app.use(_error__WEBPACK_IMPORTED_MODULE_4___default.a);\n});\n\n//# sourceURL=webpack:///./src/config/middlewares.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! config */ \"config\");\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _config_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/constants */ \"./src/config/constants.js\");\n/* harmony import */ var _config_databases__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/databases */ \"./src/config/databases.js\");\n/* harmony import */ var _config_middlewares__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/middlewares */ \"./src/config/middlewares.js\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules */ \"./src/modules/index.js\");\n/* eslint-disable no-console */\n\n\n\n\n\n\n\n__webpack_require__(/*! express-async-errors */ \"express-async-errors\");\n\nprocess.on('uncaughtException', function (ex) {\n  console.log(ex); // USE WINSTON\n\n  process.exit(1);\n});\nprocess.on('unhandledRejection', function (ex) {\n  console.log(ex);\n  process.exit(1);\n});\n\nif (!config__WEBPACK_IMPORTED_MODULE_1___default.a.has('secretKey')) {\n  console.error('FATAL ERROR. Gymogram app secret key was not configured. Check documentation');\n  process.exit(1);\n}\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\nvar debug = __webpack_require__(/*! debug */ \"debug\")('gymo:startup');\n\nObject(_config_middlewares__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(app);\nObject(_modules__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(app);\napp.get('/', function (req, res) {\n  res.send('Gymo API. On going');\n}); // eslint-disable-next-line no-unused-vars\n\napp.use('/api', function (err, req, res, next) {\n  res.status(err.status).json(err);\n});\napp.listen(_config_constants__WEBPACK_IMPORTED_MODULE_2__[\"default\"].PORT, function (err) {\n  if (err) {\n    throw err;\n  } else {\n    debug(\"Server running.\\nPort: \".concat(_config_constants__WEBPACK_IMPORTED_MODULE_2__[\"default\"].PORT, \"\\nEnvironment: \").concat(\"development\"));\n    console.log(\"Server running.\\nPort: \".concat(_config_constants__WEBPACK_IMPORTED_MODULE_2__[\"default\"].PORT, \"\\nEnvironment: \").concat(\"development\"));\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/index.js":
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _users_user_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./users/user.routes */ \"./src/modules/users/user.routes.js\");\n/* harmony import */ var _plans_plan_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plans/plan.routes */ \"./src/modules/plans/plan.routes.js\");\n/* harmony import */ var _login_login_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.routes */ \"./src/modules/login/login.routes.js\");\n/* harmony import */ var _trainees_trainee_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trainees/trainee.routes */ \"./src/modules/trainees/trainee.routes.js\");\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (app) {\n  app.use('/api/v1/users', _users_user_routes__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n  app.use('/api/v1/plans', _plans_plan_routes__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  app.use('/api/v1/login', _login_login_routes__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n  app.use('/api/v1/trainees', _trainees_trainee_routes__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n});\n\n//# sourceURL=webpack:///./src/modules/index.js?");

/***/ }),

/***/ "./src/modules/login/login.controllers.js":
/*!************************************************!*\
  !*** ./src/modules/login/login.controllers.js ***!
  \************************************************/
/*! exports provided: login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return login; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http-status */ \"http-status\");\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_status__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _users_models_user_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../users/models/user.model */ \"./src/modules/users/models/user.model.js\");\n\n\n\n\n\nfunction login(_x, _x2) {\n  return _login.apply(this, arguments);\n}\n\nfunction _login() {\n  _login = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {\n    var token;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n\n            if (!(req.body.socialLoginEnabled && req.body.socialLoginEnabled === true)) {\n              _context.next = 6;\n              break;\n            }\n\n            _context.next = 4;\n            return _users_models_user_model__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findByIdAndUpdate(req.user._id, {\n              socialLoginEnabled: true,\n              urlProfilePhoto: req.body.urlProfilePhoto,\n              phone: req.body.phone,\n              displayName: req.body.displayName,\n              isActivated: true\n            }, {\n              \"new\": true\n            });\n\n          case 4:\n            _context.next = 9;\n            break;\n\n          case 6:\n            if (req.user.isActivated) {\n              _context.next = 9;\n              break;\n            }\n\n            _context.next = 9;\n            return _users_models_user_model__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findByIdAndUpdate(req.user._id, {\n              isActivated: true\n            }, {\n              \"new\": true\n            });\n\n          case 9:\n            token = \"JWT \".concat(req.user.buildToken());\n            return _context.abrupt(\"return\", res.header('x-auth-token', token).status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.OK).json(req.user.toAuthJSON()));\n\n          case 13:\n            _context.prev = 13;\n            _context.t0 = _context[\"catch\"](0);\n            res.setHeader('Content-Type', 'application/json');\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).json(_context.t0));\n\n          case 17:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 13]]);\n  }));\n  return _login.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/modules/login/login.controllers.js?");

/***/ }),

/***/ "./src/modules/login/login.routes.js":
/*!*******************************************!*\
  !*** ./src/modules/login/login.routes.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/auth.strategies.service */ \"./src/services/auth.strategies.service.js\");\n/* harmony import */ var _services_auth_op_privileges_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.op.privileges.services */ \"./src/services/auth.op.privileges.services.js\");\n/* harmony import */ var _login_controllers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.controllers */ \"./src/modules/login/login.controllers.js\");\n\n\n\n\nvar routes = new express__WEBPACK_IMPORTED_MODULE_0__[\"Router\"]();\nroutes.post('/', [_services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_1__[\"authLocal\"], _services_auth_op_privileges_services__WEBPACK_IMPORTED_MODULE_2__[\"hasUserLoginPremission\"]], _login_controllers__WEBPACK_IMPORTED_MODULE_3__[\"login\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (routes);\n\n//# sourceURL=webpack:///./src/modules/login/login.routes.js?");

/***/ }),

/***/ "./src/modules/plans/models/periodType.model.js":
/*!******************************************************!*\
  !*** ./src/modules/plans/models/periodType.model.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nvar PeriodTypeSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__[\"Schema\"]({\n  name: {\n    type: String,\n    min: 1,\n    max: 255,\n    trim: true,\n    required: true\n  },\n  description: {\n    type: String,\n    max: 255,\n    trim: true\n  },\n  isActive: {\n    type: Boolean,\n    \"default\": true\n  }\n}, {\n  timestamps: true\n});\nPeriodTypeSchema.statics = {\n  initialize: function initialize() {\n    var _this = this;\n\n    this.countDocuments({}, function (err, count) {\n      if (count <= 0) {\n        console.log('No predefined Period Types`s collections were found. Reading file...');\n\n        var data = __webpack_require__(/*! ../../../config/data/period_types.json */ \"./src/config/data/period_types.json\");\n\n        data.forEach(function (element) {\n          _this.create(element);\n        });\n      }\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('PeriodType', PeriodTypeSchema));\n\n//# sourceURL=webpack:///./src/modules/plans/models/periodType.model.js?");

/***/ }),

/***/ "./src/modules/plans/models/plan.model.js":
/*!************************************************!*\
  !*** ./src/modules/plans/models/plan.model.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);\n\n\nvar _ref;\n\n\n\nvar PlanSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"]((_ref = {\n  name: {\n    type: String,\n    minlength: 2,\n    maxlength: 255,\n    trim: true,\n    uppercase: true\n  },\n  goals: [{\n    type: String,\n    minlength: 5,\n    maxlength: 500,\n    trim: true\n  }],\n  startDate: {\n    type: Date,\n    required: true\n  },\n  endDate: {\n    type: Date,\n    required: true\n  },\n  isActive: {\n    type: Boolean,\n    \"default\": true\n  }\n}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, \"isActive\", {\n  type: Boolean,\n  \"default\": false\n}), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, \"signOffDate\", {\n  type: Date\n}), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, \"weekFrequency\", {\n  type: Number,\n  min: 1,\n  max: 21\n}), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, \"trainee\", {\n  type: mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"].Types.ObjectId,\n  ref: 'Trainee',\n  required: true\n}), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, \"months\", [{\n  type: new mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"]({\n    order: {\n      type: Number,\n      min: 1,\n      required: true\n    },\n    goals: [{\n      type: String,\n      minlength: 5,\n      maxlength: 500,\n      trim: true\n    }],\n    periodType: {\n      type: mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"].Types.ObjectId,\n      ref: 'PeriodType'\n    },\n    stage: {\n      type: mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"].Types.ObjectId,\n      ref: 'StageType'\n    },\n    weeks: new mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"]({\n      order: {\n        type: Number,\n        min: 1,\n        required: true\n      },\n      goals: [{\n        type: String,\n        minlength: 5,\n        maxlength: 500,\n        trim: true\n      }],\n      sessions: new mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"]({\n        order: {\n          type: Number,\n          min: 1,\n          required: true\n        },\n        goals: [{\n          type: String,\n          minlength: 5,\n          maxlength: 500,\n          trim: true\n        }],\n        hasTimer: {\n          type: Boolean,\n          \"default\": false\n        },\n        isCurrent: {\n          type: Boolean,\n          \"default\": false\n        },\n        isSkipped: {\n          type: Boolean,\n          \"default\": false\n        },\n        delayedWeeks: {\n          type: Number,\n          min: 1\n        },\n        works: new mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"]({\n          series: {\n            type: Number,\n            min: 1,\n            max: 100\n          },\n          reps: {\n            type: Number,\n            min: 1,\n            max: 100\n          },\n          weight: {\n            type: Number,\n            min: 1,\n            max: 1000\n          },\n          completionTime: {\n            type: Number,\n            min: 1 // CHECK IF MAX NEEDED\n\n          },\n          estimatedTime: {\n            type: Number,\n            min: 1 // CHECK IF MAX NEEDED\n\n          },\n          isCompleted: {\n            type: Boolean,\n            \"default\": false\n          },\n          activity: {\n            type: mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"].Types.ObjectId,\n            ref: 'Activity'\n          }\n        })\n      })\n    })\n  })\n}]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, \"isPublished\", {\n  type: Boolean,\n  \"default\": false\n}), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, \"template\", {\n  type: mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"].Types.ObjectId,\n  ref: 'Template'\n}), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, \"createdBy\", {\n  type: mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"].Types.ObjectId,\n  ref: 'User',\n  required: true\n}), _ref), {\n  timestamps: true\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('Plan', PlanSchema));\n\n//# sourceURL=webpack:///./src/modules/plans/models/plan.model.js?");

/***/ }),

/***/ "./src/modules/plans/models/stageType.model.js":
/*!*****************************************************!*\
  !*** ./src/modules/plans/models/stageType.model.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nvar StageTypeSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__[\"Schema\"]({\n  name: {\n    type: String,\n    min: 1,\n    max: 255,\n    trim: true,\n    required: true\n  },\n  description: {\n    type: String,\n    max: 255,\n    trim: true\n  },\n  isActive: {\n    type: Boolean,\n    \"default\": true\n  }\n}, {\n  timestamps: true\n});\nStageTypeSchema.statics = {\n  initialize: function initialize() {\n    var _this = this;\n\n    this.countDocuments({}, function (err, count) {\n      if (count <= 0) {\n        console.log('No predefined Stage Types`s collections were found. Reading file...');\n\n        var data = __webpack_require__(/*! ../../../config/data/stage_types.json */ \"./src/config/data/stage_types.json\");\n\n        data.forEach(function (element) {\n          _this.create(element);\n        });\n      }\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('StageType', StageTypeSchema));\n\n//# sourceURL=webpack:///./src/modules/plans/models/stageType.model.js?");

/***/ }),

/***/ "./src/modules/plans/plan.controllers.js":
/*!***********************************************!*\
  !*** ./src/modules/plans/plan.controllers.js ***!
  \***********************************************/
/*! exports provided: create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _models_plan_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/plan.model */ \"./src/modules/plans/models/plan.model.js\");\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http-status */ \"http-status\");\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http_status__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction create(_x, _x2) {\n  return _create.apply(this, arguments);\n}\n\nfunction _create() {\n  _create = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_3___default.a.BAD_REQUEST).send('Invalid Trainee.'));\n\n          case 1:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _create.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/modules/plans/plan.controllers.js?");

/***/ }),

/***/ "./src/modules/plans/plan.routes.js":
/*!******************************************!*\
  !*** ./src/modules/plans/plan.routes.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/auth.strategies.service */ \"./src/services/auth.strategies.service.js\");\n/* harmony import */ var _plan_controllers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plan.controllers */ \"./src/modules/plans/plan.controllers.js\");\n\n\n\nvar routes = new express__WEBPACK_IMPORTED_MODULE_0__[\"Router\"]();\nroutes.post('/', _services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_1__[\"authJWT\"], _plan_controllers__WEBPACK_IMPORTED_MODULE_2__[\"create\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (routes);\n\n//# sourceURL=webpack:///./src/modules/plans/plan.routes.js?");

/***/ }),

/***/ "./src/modules/trainees/models/trainee.model.js":
/*!******************************************************!*\
  !*** ./src/modules/trainees/models/trainee.model.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"@babel/runtime/helpers/objectSpread\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nvar TraineeSchema = new mongoose__WEBPACK_IMPORTED_MODULE_3__[\"Schema\"]({\n  emergencyContactName: {\n    type: String,\n    required: [true, 'Emergency contact name is required'],\n    trim: true,\n    minlength: 2,\n    maxlength: 255\n  },\n  emergencyContactPhone: {\n    type: String,\n    required: [true, 'Emergency contact phone is required'],\n    trim: true,\n    minlength: 8,\n    maxlength: 50\n  },\n  lastStartDate: {\n    type: Date,\n    required: [true, 'Last start date is required']\n  },\n  lastExitDate: {\n    type: Date\n  },\n  gender: {\n    type: String,\n    \"enum\": ['M', 'F', 'O'],\n    required: [true, 'Gender is required']\n  },\n  invitationCode: {\n    type: String,\n    trim: true,\n    minlength: 6,\n    maxlength: 6\n  },\n  user: {\n    type: mongoose__WEBPACK_IMPORTED_MODULE_3__[\"Schema\"].Types.ObjectId,\n    ref: 'User',\n    unique: true,\n    required: true\n  }\n});\nTraineeSchema.pre('save',\n/*#__PURE__*/\nfunction () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(next) {\n    var ic, icValid, customer;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            ic = null;\n            icValid = false;\n\n          case 3:\n            ic = _Trainee.generateInvitationCode();\n            _context.next = 6;\n            return _Trainee.findOne({\n              invitationCode: ic\n            });\n\n          case 6:\n            customer = _context.sent;\n\n            if (!customer) {\n              icValid = true;\n            }\n\n          case 8:\n            if (!icValid) {\n              _context.next = 3;\n              break;\n            }\n\n          case 9:\n            this.invitationCode = ic;\n            return _context.abrupt(\"return\", next());\n\n          case 13:\n            _context.prev = 13;\n            _context.t0 = _context[\"catch\"](0);\n            throw _context.t0;\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, this, [[0, 13]]);\n  }));\n\n  return function (_x) {\n    return _ref.apply(this, arguments);\n  };\n}());\nTraineeSchema.methods = {\n  toJSON: function toJSON() {\n    var selectedFields = TraineeSchema.statics.getPublicFields();\n\n    var filteredObj = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.pick(this, selectedFields);\n\n    return filteredObj;\n  }\n};\nTraineeSchema.statics = {\n  createTrainee: function createTrainee(args, user) {\n    return this.create(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, args, {\n      user: user\n    }));\n  },\n  generateInvitationCode: function generateInvitationCode() {\n    var code = '';\n    var alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';\n\n    for (var i = 0; i < 6; i++) {\n      code += alphabet.charAt(Math.floor(Math.random() * alphabet.length)).toUpperCase();\n    }\n\n    return code;\n  },\n  getPublicFields: function getPublicFields() {\n    return ['_id', 'emergencyContactName', 'emergencyContactPhone', 'lastStartDate', 'gender', 'invitationCode', 'user'];\n  },\n  getUpdatableFields: function getUpdatableFields() {\n    return ['emergencyContactName', 'emergencyContactPhone', 'lastStartDate', 'gender'];\n  }\n};\n\nvar _Trainee = mongoose__WEBPACK_IMPORTED_MODULE_3___default.a.model('Trainee', TraineeSchema);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_3___default.a.model('Trainee', TraineeSchema));\n\n//# sourceURL=webpack:///./src/modules/trainees/models/trainee.model.js?");

/***/ }),

/***/ "./src/modules/trainees/trainee.controllers.js":
/*!*****************************************************!*\
  !*** ./src/modules/trainees/trainee.controllers.js ***!
  \*****************************************************/
/*! exports provided: create, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"update\", function() { return update; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http-status */ \"http-status\");\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_status__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _models_trainee_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/trainee.model */ \"./src/modules/trainees/models/trainee.model.js\");\n/* harmony import */ var _users_models_user_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../users/models/user.model */ \"./src/modules/users/models/user.model.js\");\n\n\n\n\n\n\n\nfunction create(_x, _x2) {\n  return _create.apply(this, arguments);\n}\n\nfunction _create() {\n  _create = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {\n    var customer, user, trainee;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return _models_trainee_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findOne({\n              user: req.body.userID\n            });\n\n          case 3:\n            customer = _context.sent;\n\n            if (!customer) {\n              _context.next = 6;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.NOT_FOUND).send('Invalid user.'));\n\n          case 6:\n            _context.next = 8;\n            return _users_models_user_model__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findById(req.body.userID);\n\n          case 8:\n            user = _context.sent;\n\n            if (!(!user || user && !lodash__WEBPACK_IMPORTED_MODULE_3___default.a.includes(user.roles, 'CUSTOMER'))) {\n              _context.next = 11;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.NOT_FOUND).send('Invalid user.'));\n\n          case 11:\n            trainee = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.pick(req.body, _models_trainee_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getUpdatableFields());\n            _context.next = 14;\n            return _models_trainee_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].createTrainee(trainee, user._id);\n\n          case 14:\n            trainee = _context.sent;\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.OK).json(trainee));\n\n          case 18:\n            _context.prev = 18;\n            _context.t0 = _context[\"catch\"](0);\n            res.setHeader('Content-Type', 'application/json');\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.INTERNAL_SERVER_ERROR).json(_context.t0));\n\n          case 22:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 18]]);\n  }));\n  return _create.apply(this, arguments);\n}\n\nfunction update(_x3, _x4) {\n  return _update.apply(this, arguments);\n}\n\nfunction _update() {\n  _update = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            if (mongoose__WEBPACK_IMPORTED_MODULE_4___default.a.Types.ObjectId.isValid(req.params.id)) {\n              _context2.next = 2;\n              break;\n            }\n\n            return _context2.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).send('Invalid trainee.'));\n\n          case 2:\n            return _context2.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).send('Invalid trainee.'));\n\n          case 3:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n  return _update.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/modules/trainees/trainee.controllers.js?");

/***/ }),

/***/ "./src/modules/trainees/trainee.routes.js":
/*!************************************************!*\
  !*** ./src/modules/trainees/trainee.routes.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-validation */ \"express-validation\");\n/* harmony import */ var express_validation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_validation__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.strategies.service */ \"./src/services/auth.strategies.service.js\");\n/* harmony import */ var _services_auth_roles_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/auth.roles.service */ \"./src/services/auth.roles.service.js\");\n/* harmony import */ var _trainee_controllers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./trainee.controllers */ \"./src/modules/trainees/trainee.controllers.js\");\n/* harmony import */ var _trainee_validations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./trainee.validations */ \"./src/modules/trainees/trainee.validations.js\");\n\n\n\n\n\n\nvar routes = new express__WEBPACK_IMPORTED_MODULE_0__[\"Router\"]();\nroutes.post('/', [_services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_2__[\"authJWT\"], _services_auth_roles_service__WEBPACK_IMPORTED_MODULE_3__[\"isCoachOrAdmin\"]], express_validation__WEBPACK_IMPORTED_MODULE_1___default()(_trainee_validations__WEBPACK_IMPORTED_MODULE_5__[\"default\"].create), _trainee_controllers__WEBPACK_IMPORTED_MODULE_4__[\"create\"]);\nroutes.put('/:id', _services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_2__[\"authJWT\"], _trainee_controllers__WEBPACK_IMPORTED_MODULE_4__[\"update\"]); // update is coach admin or current customer. \n\n/* harmony default export */ __webpack_exports__[\"default\"] = (routes);\n\n//# sourceURL=webpack:///./src/modules/trainees/trainee.routes.js?");

/***/ }),

/***/ "./src/modules/trainees/trainee.validations.js":
/*!*****************************************************!*\
  !*** ./src/modules/trainees/trainee.validations.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);\n\njoi__WEBPACK_IMPORTED_MODULE_0___default.a.objectId = __webpack_require__(/*! joi-objectid */ \"joi-objectid\")(joi__WEBPACK_IMPORTED_MODULE_0___default.a);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  create: {\n    body: {\n      emergencyContactName: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(2).max(255).required(),\n      emergencyContactPhone: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(8).max(50).required(),\n      lastStartDate: joi__WEBPACK_IMPORTED_MODULE_0___default.a.date().min('now').required(),\n      gender: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().valid('M', 'F', 'O').required(),\n      userID: joi__WEBPACK_IMPORTED_MODULE_0___default.a.objectId().required()\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/modules/trainees/trainee.validations.js?");

/***/ }),

/***/ "./src/modules/users/models/identificationType.model.js":
/*!**************************************************************!*\
  !*** ./src/modules/users/models/identificationType.model.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nvar IdentificationTypeSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__[\"Schema\"]({\n  name: {\n    type: String,\n    trim: true\n  },\n  description: {\n    type: String,\n    trim: true\n  }\n});\nIdentificationTypeSchema.statics = {\n  initialize: function initialize() {\n    var _this = this;\n\n    this.countDocuments({}, function (err, count) {\n      if (count <= 0) {\n        console.log('No IdentificationType`s predefined collections' + 'were found. Reading file...');\n\n        var data = __webpack_require__(/*! ../../../config/data/identification_types.json */ \"./src/config/data/identification_types.json\");\n\n        data.forEach(function (element) {\n          _this.create(element);\n        });\n      }\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('IdentificationType', IdentificationTypeSchema));\n\n//# sourceURL=webpack:///./src/modules/users/models/identificationType.model.js?");

/***/ }),

/***/ "./src/modules/users/models/user.model.js":
/*!************************************************!*\
  !*** ./src/modules/users/models/user.model.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"@babel/runtime/helpers/objectSpread\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! validator */ \"validator\");\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! config */ \"config\");\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\n/* harmony import */ var bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _user_validations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../user.validations */ \"./src/modules/users/user.validations.js\");\n\n\n\n\n\n\n\n\nvar UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"]({\n  firstname: {\n    type: String,\n    required: [true, 'Firstname is required'],\n    trim: true,\n    minlength: 2,\n    maxlength: 100\n  },\n  lastname: {\n    type: String,\n    required: [true, 'Lastname is required'],\n    trim: true,\n    minlength: 2,\n    maxlength: 255\n  },\n  displayName: {\n    type: String,\n    trim: true,\n    minlength: 2,\n    maxlength: 255\n  },\n  personalID: {\n    type: Number,\n    required: [true, 'Personal ID is required']\n  },\n  identificationType: {\n    type: mongoose__WEBPACK_IMPORTED_MODULE_1__[\"Schema\"].Types.ObjectId,\n    trim: true,\n    required: [true, 'Identification type is required'],\n    ref: 'IdentificationType'\n  },\n  phone: {\n    type: String,\n    required: [true, 'Phone is required'],\n    trim: true,\n    minlength: 8,\n    maxlength: 50\n  },\n  email: {\n    type: String,\n    required: [true, 'Email is required'],\n    trim: true,\n    unique: true,\n    validate: {\n      validator: function validator(email) {\n        return validator__WEBPACK_IMPORTED_MODULE_2___default.a.isEmail(email);\n      },\n      message: '{VALUE} is not a valid email'\n    }\n  },\n  birthDate: {\n    type: Date\n  },\n  address: {\n    type: String,\n    trim: true,\n    required: [true, 'Address is required'],\n    minlength: 5,\n    maxlength: 255\n  },\n  isActivated: {\n    type: Boolean,\n    \"default\": false\n  },\n  isArchived: {\n    type: Boolean,\n    \"default\": false\n  },\n  socialLoginEnabled: {\n    type: Boolean,\n    \"default\": false\n  },\n  instaID: {\n    type: String,\n    trim: true,\n    minlength: 3,\n    maxlength: 255\n  },\n  fbID: {\n    type: String,\n    trim: true,\n    minlength: 3,\n    maxlength: 255\n  },\n  password: {\n    type: String,\n    required: [true, 'Password is required'],\n    minlength: 8,\n    maxlength: 50,\n    trim: true,\n    validate: {\n      validator: function validator(password) {\n        return _user_validations__WEBPACK_IMPORTED_MODULE_7__[\"passwordReg\"].test(password);\n      },\n      message: '{VALUE} is not a valid password'\n    }\n  },\n  roles: {\n    type: [{\n      type: String,\n      \"enum\": ['ADMIN', 'COACH', 'CUSTOMER']\n    }],\n    required: true\n  },\n  urlProfilePhoto: {\n    type: String,\n    trim: true\n  }\n}, {\n  timestamps: true\n});\nUserSchema.pre('save', function (next) {\n  if (this.isModified('password')) {\n    var salt = Object(bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_6__[\"genSaltSync\"])(13);\n    this.password = Object(bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_6__[\"hashSync\"])(this.password, salt);\n  }\n\n  return next();\n});\nUserSchema.methods = {\n  toJSON: function toJSON() {\n    var selectedFields = UserSchema.statics.getPublicFields();\n\n    var filteredObj = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.pick(this, selectedFields);\n\n    return filteredObj;\n  },\n  toAuthJSON: function toAuthJSON() {\n    return {\n      _id: this._id,\n      email: this.email,\n      firstname: this.firstname,\n      lastname: this.lastname,\n      roles: this.roles,\n      urlProfilePhoto: this.urlProfilePhoto,\n      displayName: this.displayName\n    };\n  },\n  _hashPassword: function _hashPassword(password) {\n    return Object(bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_6__[\"hashSync\"])(password);\n  },\n  authenticateUser: function authenticateUser(password) {\n    return Object(bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_6__[\"compareSync\"])(password, this.password);\n  },\n  buildToken: function buildToken() {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default.a.sign({\n      _id: this._id,\n      roles: this.roles\n    }, config__WEBPACK_IMPORTED_MODULE_5___default.a.get('secretKey'));\n  }\n};\nUserSchema.statics = {\n  createUser: function createUser(args, identificationType) {\n    return this.create(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, args, {\n      identificationType: identificationType\n    }));\n  },\n  getPublicFields: function getPublicFields() {\n    return ['_id', 'firstname', 'lastname', 'personalID', 'identificationType', 'phone', 'email', 'birthDate', 'address', 'instaID', 'fbID', 'roles'];\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('User', UserSchema));\n\n//# sourceURL=webpack:///./src/modules/users/models/user.model.js?");

/***/ }),

/***/ "./src/modules/users/user.controllers.js":
/*!***********************************************!*\
  !*** ./src/modules/users/user.controllers.js ***!
  \***********************************************/
/*! exports provided: signUp, update, getUser, deactivate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signUp\", function() { return signUp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"update\", function() { return update; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUser\", function() { return getUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deactivate\", function() { return deactivate; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http-status */ \"http-status\");\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_status__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/user.model */ \"./src/modules/users/models/user.model.js\");\n/* harmony import */ var _models_identificationType_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models/identificationType.model */ \"./src/modules/users/models/identificationType.model.js\");\n\n\n\n\n\n\n\nfunction signUp(_x, _x2) {\n  return _signUp.apply(this, arguments);\n}\n\nfunction _signUp() {\n  _signUp = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {\n    var idType, user;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return _models_identificationType_model__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findById(req.body.identificationTypeID);\n\n          case 3:\n            idType = _context.sent;\n\n            if (!idType) {\n              res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).send('Invalid Identification Type.');\n            }\n\n            _context.next = 7;\n            return _models_user_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].createUser(lodash__WEBPACK_IMPORTED_MODULE_3___default.a.omit(req.body, 'identificationTypeID'), idType._id);\n\n          case 7:\n            user = _context.sent;\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.CREATED).json(user).send());\n\n          case 11:\n            _context.prev = 11;\n            _context.t0 = _context[\"catch\"](0);\n            res.setHeader('Content-Type', 'application/json');\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.INTERNAL_SERVER_ERROR).json(_context.t0).send());\n\n          case 15:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 11]]);\n  }));\n  return _signUp.apply(this, arguments);\n}\n\nfunction update(_x3, _x4) {\n  return _update.apply(this, arguments);\n}\n\nfunction _update() {\n  _update = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {\n    var idType, userToUpdate, user;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.prev = 0;\n\n            if (!(req.body.constructor === Object && Object.keys(req.body).length === 0)) {\n              _context2.next = 3;\n              break;\n            }\n\n            return _context2.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).send('Object missing. Check API documentation.'));\n\n          case 3:\n            if (!req.body.password) {\n              _context2.next = 5;\n              break;\n            }\n\n            return _context2.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).send('Password change not allowed in this operation.'));\n\n          case 5:\n            idType = null;\n\n            if (!req.body.identificationTypeID) {\n              _context2.next = 11;\n              break;\n            }\n\n            _context2.next = 9;\n            return _models_identificationType_model__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findById(req.body.identificationTypeID);\n\n          case 9:\n            idType = _context2.sent;\n\n            if (!idType) {\n              res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).send('Invalid Identification Type.');\n            }\n\n          case 11:\n            userToUpdate = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.pick(req.body, _models_user_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getPublicFields());\n\n            if (idType) {\n              userToUpdate = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.set(userToUpdate, 'identificationType', idType._id);\n            }\n\n            _context2.next = 15;\n            return _models_user_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findByIdAndUpdate(req.params.id, userToUpdate, {\n              \"new\": true\n            });\n\n          case 15:\n            user = _context2.sent;\n\n            if (user) {\n              _context2.next = 18;\n              break;\n            }\n\n            return _context2.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.NOT_FOUND).send('The user with the given ID was not found.'));\n\n          case 18:\n            return _context2.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.OK).json(user));\n\n          case 21:\n            _context2.prev = 21;\n            _context2.t0 = _context2[\"catch\"](0);\n            res.setHeader('Content-Type', 'application/json');\n            return _context2.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).json(_context2.t0));\n\n          case 25:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[0, 21]]);\n  }));\n  return _update.apply(this, arguments);\n}\n\nfunction getUser(_x5, _x6) {\n  return _getUser.apply(this, arguments);\n}\n\nfunction _getUser() {\n  _getUser = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(req, res) {\n    var userToRead;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            _context3.prev = 0;\n\n            if (!(req.params.id !== req.user._id)) {\n              _context3.next = 9;\n              break;\n            }\n\n            _context3.next = 4;\n            return _models_user_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findById(req.params.id);\n\n          case 4:\n            userToRead = _context3.sent;\n\n            if (userToRead) {\n              _context3.next = 7;\n              break;\n            }\n\n            return _context3.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.NOT_FOUND).send());\n\n          case 7:\n            _context3.next = 10;\n            break;\n\n          case 9:\n            userToRead = req.user;\n\n          case 10:\n            return _context3.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.OK).json(userToRead.toJSON()));\n\n          case 13:\n            _context3.prev = 13;\n            _context3.t0 = _context3[\"catch\"](0);\n            res.setHeader('Content-Type', 'application/json');\n            return _context3.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.INTERNAL_SERVER_ERROR).json(_context3.t0));\n\n          case 17:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3, null, [[0, 13]]);\n  }));\n  return _getUser.apply(this, arguments);\n}\n\nfunction deactivate(_x7, _x8) {\n  return _deactivate.apply(this, arguments);\n}\n\nfunction _deactivate() {\n  _deactivate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(req, res) {\n    var user;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            if (mongoose__WEBPACK_IMPORTED_MODULE_4___default.a.Types.ObjectId.isValid(req.params.id)) {\n              _context4.next = 2;\n              break;\n            }\n\n            return _context4.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).send('Invalid user.'));\n\n          case 2:\n            if (!(req.params.id === req.user._id.toHexString())) {\n              _context4.next = 4;\n              break;\n            }\n\n            return _context4.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.FORBIDDEN).send('Self deactivation not allowed.'));\n\n          case 4:\n            _context4.prev = 4;\n            _context4.next = 7;\n            return _models_user_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findByIdAndUpdate(req.params.id, {\n              isArchived: true\n            }, {\n              \"new\": true\n            });\n\n          case 7:\n            user = _context4.sent;\n\n            if (user) {\n              _context4.next = 10;\n              break;\n            }\n\n            return _context4.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.NOT_FOUND).send('The user with the given ID was not found.'));\n\n          case 10:\n            return _context4.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.OK).send());\n\n          case 13:\n            _context4.prev = 13;\n            _context4.t0 = _context4[\"catch\"](4);\n            res.setHeader('Content-Type', 'application/json');\n            return _context4.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.INTERNAL_SERVER_ERROR).json(_context4.t0));\n\n          case 17:\n          case \"end\":\n            return _context4.stop();\n        }\n      }\n    }, _callee4, null, [[4, 13]]);\n  }));\n  return _deactivate.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/modules/users/user.controllers.js?");

/***/ }),

/***/ "./src/modules/users/user.routes.js":
/*!******************************************!*\
  !*** ./src/modules/users/user.routes.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-validation */ \"express-validation\");\n/* harmony import */ var express_validation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_validation__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _user_controllers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.controllers */ \"./src/modules/users/user.controllers.js\");\n/* harmony import */ var _user_validations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.validations */ \"./src/modules/users/user.validations.js\");\n/* harmony import */ var _services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/auth.strategies.service */ \"./src/services/auth.strategies.service.js\");\n/* harmony import */ var _services_auth_roles_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/auth.roles.service */ \"./src/services/auth.roles.service.js\");\n/* harmony import */ var _services_auth_op_privileges_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/auth.op.privileges.services */ \"./src/services/auth.op.privileges.services.js\");\n\n\n\n\n\n\n\nvar routes = new express__WEBPACK_IMPORTED_MODULE_0__[\"Router\"]();\nroutes.post('/signup', express_validation__WEBPACK_IMPORTED_MODULE_1___default()(_user_validations__WEBPACK_IMPORTED_MODULE_3__[\"default\"].signup), _user_controllers__WEBPACK_IMPORTED_MODULE_2__[\"signUp\"]);\nroutes.put('/:id', [_services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_4__[\"authJWT\"], _services_auth_op_privileges_services__WEBPACK_IMPORTED_MODULE_6__[\"hasUserUpdatePremission\"]], express_validation__WEBPACK_IMPORTED_MODULE_1___default()(_user_validations__WEBPACK_IMPORTED_MODULE_3__[\"default\"].update), _user_controllers__WEBPACK_IMPORTED_MODULE_2__[\"update\"]);\nroutes.get('/:id', [_services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_4__[\"authJWT\"], _services_auth_op_privileges_services__WEBPACK_IMPORTED_MODULE_6__[\"hasUserReadPremission\"]], _user_controllers__WEBPACK_IMPORTED_MODULE_2__[\"getUser\"]);\nroutes[\"delete\"]('/:id', [_services_auth_strategies_service__WEBPACK_IMPORTED_MODULE_4__[\"authJWT\"], _services_auth_roles_service__WEBPACK_IMPORTED_MODULE_5__[\"isAdmin\"]], _user_controllers__WEBPACK_IMPORTED_MODULE_2__[\"deactivate\"]); // NEW ENDOPOINTS SEPARATE set coach profile \n// COACH ADMIN,  MEDIA user endpoint update profile pic (prv user)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (routes);\n\n//# sourceURL=webpack:///./src/modules/users/user.routes.js?");

/***/ }),

/***/ "./src/modules/users/user.validations.js":
/*!***********************************************!*\
  !*** ./src/modules/users/user.validations.js ***!
  \***********************************************/
/*! exports provided: passwordReg, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"passwordReg\", function() { return passwordReg; });\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);\n\nvar passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$/;\njoi__WEBPACK_IMPORTED_MODULE_0___default.a.objectId = __webpack_require__(/*! joi-objectid */ \"joi-objectid\")(joi__WEBPACK_IMPORTED_MODULE_0___default.a);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  signup: {\n    body: {\n      email: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().email(),\n      // eslint-disable-next-line max-len\n      password: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().regex(passwordReg).required().error(function () {\n        return 'Invalid password. It must contain 8 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character';\n      }),\n      firstname: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(2).max(100).required(),\n      lastname: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(2).max(255).required(),\n      personalID: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().required(),\n      phone: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(8).max(50).required(),\n      address: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(5).max(255).required(),\n      roles: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().valid('CUSTOMER', 'COACH', 'ADMIN')).required(),\n      instaID: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(3).max(255),\n      fbID: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(3).max(255),\n      identificationTypeID: joi__WEBPACK_IMPORTED_MODULE_0___default.a.objectId().required(),\n      displayName: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(2).max(255)\n    }\n  },\n  update: {\n    body: {\n      email: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().email(),\n      // eslint-disable-next-line max-len\n      password: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().regex(passwordReg).error(function () {\n        return 'Invalid password. It must contain 8 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character';\n      }),\n      firstname: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(2).max(100),\n      lastname: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(2).max(255),\n      personalID: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number(),\n      phone: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(8).max(50),\n      address: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(5).max(255),\n      roles: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().valid('CUSTOMER', 'COACH', 'ADMIN')),\n      instaID: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(3).max(255),\n      fbID: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(3).max(255),\n      identificationTypeID: joi__WEBPACK_IMPORTED_MODULE_0___default.a.objectId(),\n      displayName: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(2).max(255)\n    }\n  },\n  trainee: {\n    body: {\n      emergencyContactName: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(2).max(255).required(),\n      emergencyContactPhone: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(8).max(50).required(),\n      lastStartDate: joi__WEBPACK_IMPORTED_MODULE_0___default.a.date().min('now').required(),\n      gender: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().valid('M', 'F', 'O').required(),\n      userID: joi__WEBPACK_IMPORTED_MODULE_0___default.a.objectId().required()\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/modules/users/user.validations.js?");

/***/ }),

/***/ "./src/services/auth.op.privileges.services.js":
/*!*****************************************************!*\
  !*** ./src/services/auth.op.privileges.services.js ***!
  \*****************************************************/
/*! exports provided: hasUserUpdatePremission, hasUserReadPremission, hasTraineeUpdatePremission, hasUserLoginPremission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasUserUpdatePremission\", function() { return hasUserUpdatePremission; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasUserReadPremission\", function() { return hasUserReadPremission; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasTraineeUpdatePremission\", function() { return hasTraineeUpdatePremission; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasUserLoginPremission\", function() { return hasUserLoginPremission; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http-status */ \"http-status\");\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_status__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _modules_trainees_models_trainee_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/trainees/models/trainee.model */ \"./src/modules/trainees/models/trainee.model.js\");\n\n\n\n/* eslint-disable no-console */\n\n\n\n\nvar hasUserUpdatePremission = function hasUserUpdatePremission(req, res, next) {\n  var hasValidRoles = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.includes(req.user.roles, 'ADMIN');\n\n  if (!hasValidRoles && req.user._id !== req.params.id) {\n    return res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.FORBIDDEN).send('Access denied.');\n  }\n\n  next();\n};\nvar hasUserReadPremission = function hasUserReadPremission(req, res, next) {\n  if (!mongoose__WEBPACK_IMPORTED_MODULE_4___default.a.Types.ObjectId.isValid(req.params.id)) {\n    return res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).send('Invalid user.');\n  }\n\n  var hasValidRoles = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.intersection(req.user.roles, ['ADMIN', 'COACH']).length > 0;\n\n  if (hasValidRoles === false && req.user._id.toHexString() !== req.params.id) {\n    return res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.FORBIDDEN).send('Access denied.');\n  }\n\n  next();\n};\nvar hasTraineeUpdatePremission =\n/*#__PURE__*/\nfunction () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res, next) {\n    var hasValidRoles, hasCustomerRole, customer;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            if (mongoose__WEBPACK_IMPORTED_MODULE_4___default.a.Types.ObjectId.isValid(req.params.id)) {\n              _context.next = 2;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.BAD_REQUEST).send('Invalid user.'));\n\n          case 2:\n            hasValidRoles = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.intersection(req.user.roles, ['ADMIN', 'COACH']).length > 0;\n            console.log(\"roles \".concat(req.user.roles));\n\n            if (!(hasValidRoles === false)) {\n              _context.next = 15;\n              break;\n            }\n\n            hasCustomerRole = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.includes(req.user.roles, 'CUSTOMER'); // eslint-disable-next-line prefer-template\n\n            console.log('is trainee' + hasCustomerRole);\n\n            if (!(hasCustomerRole === true)) {\n              _context.next = 14;\n              break;\n            }\n\n            _context.next = 10;\n            return _modules_trainees_models_trainee_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findOne({\n              user: req.user._id.toHexString()\n            });\n\n          case 10:\n            customer = _context.sent;\n            console.log(customer);\n\n            if (!(customer && customer._id.toHexString() !== req.params.id)) {\n              _context.next = 14;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.FORBIDDEN).send('Access denied.'));\n\n          case 14:\n            return _context.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.FORBIDDEN).send('Access denied.'));\n\n          case 15:\n            next();\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function hasTraineeUpdatePremission(_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n}();\nvar hasUserLoginPremission =\n/*#__PURE__*/\nfunction () {\n  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res, next) {\n    var hasCustomerRole, hasCoachRole, customer;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.prev = 0;\n            hasCustomerRole = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.includes(req.user.roles, 'CUSTOMER');\n            hasCoachRole = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.includes(req.user.roles, 'COACH');\n\n            if (!(hasCoachRole && req.user.isArchived === true)) {\n              _context2.next = 5;\n              break;\n            }\n\n            return _context2.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.FORBIDDEN).send('Access denied. User deactivated'));\n\n          case 5:\n            if (!hasCustomerRole) {\n              _context2.next = 11;\n              break;\n            }\n\n            _context2.next = 8;\n            return _modules_trainees_models_trainee_model__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findOne({\n              user: req.user._id\n            });\n\n          case 8:\n            customer = _context2.sent;\n\n            if (!(!customer || !customer.invitationCode || req.user.isArchived === true)) {\n              _context2.next = 11;\n              break;\n            }\n\n            return _context2.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.FORBIDDEN).send('Access denied. User deactivated'));\n\n          case 11:\n            next();\n            _context2.next = 17;\n            break;\n\n          case 14:\n            _context2.prev = 14;\n            _context2.t0 = _context2[\"catch\"](0);\n            return _context2.abrupt(\"return\", res.status(http_status__WEBPACK_IMPORTED_MODULE_2___default.a.INTERNAL_SERVER_ERROR).send('Somenthing failed.'));\n\n          case 17:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[0, 14]]);\n  }));\n\n  return function hasUserLoginPremission(_x4, _x5, _x6) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack:///./src/services/auth.op.privileges.services.js?");

/***/ }),

/***/ "./src/services/auth.roles.service.js":
/*!********************************************!*\
  !*** ./src/services/auth.roles.service.js ***!
  \********************************************/
/*! exports provided: isCoachOrAdmin, isCoach, isAdmin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isCoachOrAdmin\", function() { return isCoachOrAdmin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isCoach\", function() { return isCoach; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isAdmin\", function() { return isAdmin; });\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http-status */ \"http-status\");\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_status__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar isCoachOrAdmin = function isCoachOrAdmin(req, res, next) {\n  var hasValidRoles = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(req.user.roles, 'COACH', 'ADMIN');\n\n  if (!hasValidRoles) {\n    return res.status(http_status__WEBPACK_IMPORTED_MODULE_0___default.a.FORBIDDEN).send('Access denied.');\n  }\n\n  next();\n};\nvar isCoach = function isCoach(req, res, next) {\n  var hasValidRoles = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(req.user.roles, 'COACH');\n\n  if (!hasValidRoles) {\n    return res.status(http_status__WEBPACK_IMPORTED_MODULE_0___default.a.FORBIDDEN).send('Access denied.');\n  }\n\n  next();\n};\nvar isAdmin = function isAdmin(req, res, next) {\n  var hasValidRoles = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(req.user.roles, 'ADMIN');\n\n  if (!hasValidRoles) {\n    return res.status(http_status__WEBPACK_IMPORTED_MODULE_0___default.a.FORBIDDEN).send('Access denied.');\n  }\n\n  next();\n};\n\n//# sourceURL=webpack:///./src/services/auth.roles.service.js?");

/***/ }),

/***/ "./src/services/auth.strategies.service.js":
/*!*************************************************!*\
  !*** ./src/services/auth.strategies.service.js ***!
  \*************************************************/
/*! exports provided: localStrategy, authLocal, authJWT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"localStrategy\", function() { return localStrategy; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"authLocal\", function() { return authLocal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"authJWT\", function() { return authJWT; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! config */ \"config\");\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! passport-local */ \"passport-local\");\n/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\n/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _modules_users_models_user_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/users/models/user.model */ \"./src/modules/users/models/user.model.js\");\n\n\n\n\n\n\n\nvar localOpts = {\n  usernameField: 'email',\n  passReqToCallback: true\n};\nvar localStrategy = new passport_local__WEBPACK_IMPORTED_MODULE_4___default.a(localOpts,\n/*#__PURE__*/\nfunction () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, email, password, done) {\n    var user;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return _modules_users_models_user_model__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findOne({\n              email: email\n            });\n\n          case 3:\n            user = _context.sent;\n\n            if (user) {\n              _context.next = 8;\n              break;\n            }\n\n            return _context.abrupt(\"return\", done(null, false));\n\n          case 8:\n            if (!(!user.authenticateUser(password) && req.body.socialLoginEnabled !== true)) {\n              _context.next = 10;\n              break;\n            }\n\n            return _context.abrupt(\"return\", done(null, false));\n\n          case 10:\n            return _context.abrupt(\"return\", done(null, user));\n\n          case 13:\n            _context.prev = 13;\n            _context.t0 = _context[\"catch\"](0);\n            return _context.abrupt(\"return\", done(null, false));\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 13]]);\n  }));\n\n  return function (_x, _x2, _x3, _x4) {\n    return _ref.apply(this, arguments);\n  };\n}());\nvar jwtOpts = {\n  jwtFromRequest: passport_jwt__WEBPACK_IMPORTED_MODULE_5__[\"ExtractJwt\"].fromAuthHeaderWithScheme('JWT'),\n  secretOrKey: config__WEBPACK_IMPORTED_MODULE_3___default.a.get('secretKey')\n};\nvar jwtStrategy = new passport_jwt__WEBPACK_IMPORTED_MODULE_5__[\"Strategy\"](jwtOpts,\n/*#__PURE__*/\nfunction () {\n  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(payload, done) {\n    var user;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.prev = 0;\n            _context2.next = 3;\n            return _modules_users_models_user_model__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findById(payload._id);\n\n          case 3:\n            user = _context2.sent;\n\n            if (user) {\n              _context2.next = 6;\n              break;\n            }\n\n            return _context2.abrupt(\"return\", done(null, false));\n\n          case 6:\n            return _context2.abrupt(\"return\", done(null, user));\n\n          case 9:\n            _context2.prev = 9;\n            _context2.t0 = _context2[\"catch\"](0);\n            return _context2.abrupt(\"return\", done(null, false));\n\n          case 12:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[0, 9]]);\n  }));\n\n  return function (_x5, _x6) {\n    return _ref2.apply(this, arguments);\n  };\n}());\npassport__WEBPACK_IMPORTED_MODULE_2___default.a.use(localStrategy);\npassport__WEBPACK_IMPORTED_MODULE_2___default.a.use(jwtStrategy);\nvar authLocal = passport__WEBPACK_IMPORTED_MODULE_2___default.a.authenticate('local', {\n  session: false\n});\nvar authJWT = passport__WEBPACK_IMPORTED_MODULE_2___default.a.authenticate('jwt', {\n  session: false\n});\n\n//# sourceURL=webpack:///./src/services/auth.strategies.service.js?");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/asyncToGenerator\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/asyncToGenerator%22?");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/defineProperty\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/defineProperty%22?");

/***/ }),

/***/ "@babel/runtime/helpers/objectSpread":
/*!******************************************************!*\
  !*** external "@babel/runtime/helpers/objectSpread" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/objectSpread\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/objectSpread%22?");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/regenerator\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/regenerator%22?");

/***/ }),

/***/ "bcrypt-nodejs":
/*!********************************!*\
  !*** external "bcrypt-nodejs" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt-nodejs\");\n\n//# sourceURL=webpack:///external_%22bcrypt-nodejs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"config\");\n\n//# sourceURL=webpack:///external_%22config%22?");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"debug\");\n\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-async-errors":
/*!***************************************!*\
  !*** external "express-async-errors" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-async-errors\");\n\n//# sourceURL=webpack:///external_%22express-async-errors%22?");

/***/ }),

/***/ "express-validation":
/*!*************************************!*\
  !*** external "express-validation" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validation\");\n\n//# sourceURL=webpack:///external_%22express-validation%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "http-status":
/*!******************************!*\
  !*** external "http-status" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-status\");\n\n//# sourceURL=webpack:///external_%22http-status%22?");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi\");\n\n//# sourceURL=webpack:///external_%22joi%22?");

/***/ }),

/***/ "joi-objectid":
/*!*******************************!*\
  !*** external "joi-objectid" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi-objectid\");\n\n//# sourceURL=webpack:///external_%22joi-objectid%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"validator\");\n\n//# sourceURL=webpack:///external_%22validator%22?");

/***/ })

/******/ });