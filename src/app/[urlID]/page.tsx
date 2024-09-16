// pages/[shortUrlId].js
"use client";
import { useState, useEffect } from "react";

export default function RedirectPage({ params }: { params: { urlID: any } }) {
  const [shortenedURL, setShortenedURL] = useState<any>(params.urlID);
  useEffect(() => {
    fetch(`/api/get-url?urlID=${shortenedURL}`)
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.url;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return <div>Redirecting...</div>;
}
