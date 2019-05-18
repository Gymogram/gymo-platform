module.exports = {
  "env": {
    "mocha": true
  },
  "extends": "equimper",
  "rules": {
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "should|expect"
      }
    ],
    "max-len": "off"
  }
}

