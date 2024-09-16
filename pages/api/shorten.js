const urlMapsArray = [new Map()];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    let found = false;
    let shortUrlId;

    for (let map of urlMapsArray) {
      if (map.has(url)) {
        found = true;
        shortUrlId = map.get(url);
        break;
      }
    }

    if (found) {
      return res.status(200).json({
        shortUrl: `${req.headers["x-forwarded-proto"] || "http"}://${
          req.headers.host
        }/${shortUrlId}`,
        message: "We found the shortened URL in our record.",
      });
    }

    const newId = Math.random().toString(36).substring(2, 10);
    const newMap = new Map();
    newMap.set(url, newId);

    urlMapsArray.push(newMap);

    return res.status(200).json({
      shortUrl: `${req.headers["x-forwarded-proto"] || "http"}://${
        req.headers.host
      }/${newId}`,
      message: "Created a new record for the shortened URL.",
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
