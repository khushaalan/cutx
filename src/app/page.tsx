"use client";

import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import ShimmerButton from "@/components/magicui/shimmer-button";
import ShinyButton from "@/components/magicui/shiny-button";
import { useState } from "react";
import axios from "axios";

export default function DotPatternDemo() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urlID, setUrlID] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function shortenUrl() {
    setMessage("");
    setShortUrl("");
    setUrlID("");
    setLoading(true);
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data) {
          await createUrl(
            data.url_id,
            data.url,
            `${window.location.origin}/${data.url_id}`
          );

          // setMessage(data.message);
        }
      } else {
        console.error("Error: Unable to shorten URL");
      }
    } catch (error) {
      console.error("Error during URL shortening:", error);
    }
  }

  async function createUrl(urlID, url, shortUrl) {
    try {
      await axios
        .post(`/api/create-url?shortUrl=${shortUrl}&url=${url}&urlID=${urlID}`)
        .then(async (response) => {
          const data = await response.data;
          if (data) {
            setMessage(data.message);
            if (data.user_exists) {
              await getCurrentUrl(url);
            } else {
              setShortUrl(shortUrl);
              setUrlID(urlID);
              setLoading(false);
            }
          }
        })
        .catch((error) => {
          console.error("Error in createUrl:", error);
        });
    } catch (error) {
      console.error("Error in createUrl:", error);
    }
  }

  async function getCurrentUrl(url) {
    try {
      await axios
        .get(`/api/get-current-url?url=${url}`)
        .then(async (response) => {
          const data = await response.data;
          if (data) {
            setShortUrl(data.data.shorturl);
            setUrlID(data.data.urlid);
            setUrl(data.data.url);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error in getCurrentUrl:", error);
        });
    } catch (error) {
      console.error("Error in getCurrentUrl:", error);
    }
  }

  function copyUrl() {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setMessage("URL copied to clipboard!");
    }
  }

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <DotPattern
        className={cn(
          "absolute inset-0 w-full h-full [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
            CutX - URL Shortener
          </p>

          <div className="flex flex-col items-center justify-center py-2">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md text-black"
                  placeholder="Enter URL"
                />

                <ShimmerButton className="shadow-2xl" onClick={shortenUrl}>
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Shorten
                  </span>
                </ShimmerButton>
              </div>

              {message && loading === false && (
                <>
                  <p className="text-center text-lg font-medium tracking-tighter text-green-600 dark:text-white">
                    {message}
                  </p>
                </>
              )}
              {shortUrl && loading === false && (
                <>
                  <div onClick={copyUrl}>
                    <ShinyButton text="Copy URL" className="shadow-2xl" />
                  </div>
                </>
              )}
              {loading && (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin w-6 h-6 border-t-2 border-b-2 border-gray-900 rounded-full"></div>
                  <p className="text-center text-lg font-medium tracking-tighter text-black dark:text-white"></p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
