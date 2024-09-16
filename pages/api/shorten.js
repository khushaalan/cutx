export default function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    const newId = Math.random().toString(36).substring(2, 10);
    const newMap = new Map();
    newMap.set(url, newId);

    return res.status(200).json({
      url_id: newId,
      url: url,
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
