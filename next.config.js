const moment = require('moment')

module.exports = {
    poweredByHeader: false,
    env: {
        builddate: moment().format("MM/DD/YY"),
        appversion: moment().format("YYYYMMDD-rc1"),
        NEXTAUTH_URL: process.env.VERCEL_URL || "http://localhost:3000"
    },
}