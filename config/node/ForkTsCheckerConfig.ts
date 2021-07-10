'use strict';

const path = require('path');

module.exports = () => {
  return {
    "tslint": true,
    "eslint": true,
    "tslintAutoFix": true,
    "tsconfig": path.resolve(__dirname, "tsconfig-frontend.json")
  };
};
