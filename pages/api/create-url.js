import { createPool } from "@vercel/postgres";
import axios from "axios";

const pool = createPool({
  /* config */
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "This endpoint only supports POST method",
    });
  }

  const client = await pool.connect();
  console.log(req.query.urlID, req.query.url, req.query.shortUrl);
  if (
    req.query.urlID == null ||
    req.query.url == null ||
    req.query.shortUrl == null
  ) {
    return res.status(400).json({
      error: "Bad Request",
      message: "URL ID, URL, and Short URL are required",
    });
  }

  // before we insert the record, we grab all the records from the database
  // and check if the URL already exists
  const result2 = await pool.query("SELECT * FROM URLLists where url = $1", [
    req.query.url,
  ]);
  const clients2 = result2.rows[0];
  if (clients2) {
    return res.status(200).json({
      message: "URL already exists",
      user_exists: true,
    });
  }

  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS URLLists (urlID VARCHAR(255) PRIMARY KEY, url VARCHAR(255), shortUrl VARCHAR(255))"
    );
    await client.query(
      "INSERT INTO URLLIsts (urlID, url, shortUrl) VALUES ($1, $2, $3) ON CONFLICT (urlID) DO NOTHING",
      [req.query.urlID, req.query.url, req.query.shortUrl]
    );

    return res.status(200).json({ message: "URL record created successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  } finally {
    client.release();
  }
}
