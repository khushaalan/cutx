import { createPool } from "@vercel/postgres";

const pool = createPool({
  /* config */
});

export default async function handler(req, res) {
  const client = await pool.connect();
  const result = await pool.query("SELECT * FROM URLLists where url = $1", [
    req.query.url,
  ]);
  const clients = result.rows[0];
  return res.status(200).json({
    data: clients,
  });
}
