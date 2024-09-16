export default function handler(req, res) {
  //post request
  if (req.method === "POST") {
    // const { url } = req.body;
    //random 256 character string
    const id = Math.random().toString(36).substring(2, 10);
    const shortUrl = `https://shorten-url.vercel.app/${id}`;
    res.status(200).json({ shortUrl });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
