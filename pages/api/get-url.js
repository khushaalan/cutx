import { createPool } from "@vercel/postgres";

const pool = createPool({
  /* config */
});

export default async function handler(req, res) {
  const client = await pool.connect();
  const result = await pool.query("SELECT * FROM URLLists where urlID = $1", [
    req.query.urlID,
  ]);
  const clients = result.rows[0]["url"];
  return res.status(200).json({
    url: clients,
  });
}
