import mysql from 'serverless-mysql'

const db = mysql({
  config: {
    host: 'bdahrooge.vps.cs.uri.edu',
    database: 'bdahroog_brighterspace',
    user: 'bdahroog_bdahroo',
    password: process.env.MYSQL_PASSWORD
  },
})

export default db;