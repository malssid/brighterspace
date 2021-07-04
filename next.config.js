const moment = require("moment");
const metadata = require("./package.json");

module.exports = {
  poweredByHeader: false,
  env: {
    builddate: moment().format("MM/DD/YY"),
    version: metadata.version,
  },
};
