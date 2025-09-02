import mysql from 'mysql2/promise';

export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
       // ca: fs.readFileSync(path.join(__dirname, 'path-to-ca-cert.pem'))
      }
    });

    console.log("Connected to DB!");
    return connection;
  } catch (error) {
    console.error("DB connection failed:", error);
    throw error;
  }
}
