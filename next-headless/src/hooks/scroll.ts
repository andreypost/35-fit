import { useEffect, useState } from "react";

export const GetCurrentWindowScroll = () => {
  const [winScroll, getWinScroll] = useState(0);
  const setState = () => {
    getWinScroll(document.body.scrollTop || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", setState);
    return () => window.removeEventListener("scroll", setState);
  }, []);
  return winScroll;
};
