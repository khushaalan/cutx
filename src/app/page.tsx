"use client";

import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import ShimmerButton from "@/components/magicui/shimmer-button";
import ShinyButton from "@/components/magicui/shiny-button";
import { useState } from "react";

export default function DotPatternDemo() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [message, setMessage] = useState("");

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
    setMessage(data.message);
  }

  async function copyUrl() {
    await console.log("copying");
    await navigator.clipboard.writeText(shortenedUrl);
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
                />

                <ShimmerButton className="shadow-2xl" onClick={shortenUrl}>
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Shorten
                  </span>
                </ShimmerButton>
              </div>
              {shortenedUrl && message && (
                <>
                  <p>{message}</p>
                  <div onClick={copyUrl}>
                    <ShinyButton text="Copy URL" className="shadow-2xl" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
