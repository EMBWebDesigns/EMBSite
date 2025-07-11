"use client";

import { useEffect } from "react";

export const Tawk = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("tawk-script")) return; // Prevent duplicate
    const s1 = document.createElement("script");
    s1.id = "tawk-script";
    s1.async = true;
    s1.src = "https://embed.tawk.to/6870beeebaa3a2190a75d10f/1ivs6jlqf";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);
    return () => {
      s1.remove();
    };
  }, []);
  return null;
};
