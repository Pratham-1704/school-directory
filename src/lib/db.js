import mysql from "mysql2/promise";

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",   // change later when hosting DB
    user: "root",        // your MySQL username
    password: "Pass123",// your MySQL password
    database: "schooldb" // your DB name
  });
  return connection;
}