"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  async function shortenUrl() {
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    console.log(data);
    setShortenedUrl(data.shortUrl);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-black"
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={shortenUrl}
          >
            Shorten URL
          </button>
        </div>

        <h1>Shortened URL :{shortenedUrl}</h1>
      </div>
    </div>
  );
}
