const moment = require('moment')

module.exports = {
    poweredByHeader: false,
    env: {
        builddate: moment().format("MM/DD/YY"),
        appversion: moment().format("YYYYMMDD-rc1")
    },
}