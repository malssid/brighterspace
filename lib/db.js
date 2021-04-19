import mysql from "serverless-mysql";

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    dateStrings: true,
  },
});

export async function query(q, values) {
  try {
    const results = await db.query(q, values)
    await db.end()

    if(!results){
      return null;
    }else{
      if(results.affectedRows ?? false){
        return true;
      }else{
        return results.map(entry => Object.assign({}, entry));
      }
    }

  } catch (e) {
    throw Error(e.message)
  }
}
