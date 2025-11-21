import app from "./backend/src/app.js";
import connectDB from "./backend/src/db/db.js";

let dbConnected = false;
async function ensureDB() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
}

export default async function handler(req, res) {
  try {
    await ensureDB();
    return app(req, res);
  } catch (err) {
    console.error("Serverless handler error:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}
