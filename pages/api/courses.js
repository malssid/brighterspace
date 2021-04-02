import database from '../../lib/database'

// Sends all courses to the client
// TODO: Only show user enrolled courses to logged in users
export default (req, res) => {
    return new Promise((resolve, reject) => {
        database.query("SELECT * From courses").then((data) => {
            res.send(data)
            resolve();
        })
    })
}