import pgPromise from "pg-promise";
// import 'dotenv/config';
// const connection = process.env.DATABASE_URL;

const connection = 'postgres://riyaexeb:suKEcusgKymTLXU-hs6VxwbBHharUChY@dumbo.db.elephantsql.com/riyaexeb'
const db = pgPromise()(connection);
db.connect();

export default db ;