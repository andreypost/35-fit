import { useEffect, useState } from "react";
import { isBrowser } from "utils/isBrowser";

export const GetCurrentWindowScroll = (threshold: number) => {
  const [winScroll, setWinScroll] = useState(0);
  const handleScroll = () =>
    setWinScroll(document.body.scrollTop || document.documentElement.scrollTop);
  useEffect(() => {
    if (isBrowser()) {
      setWinScroll(
        document.body.scrollTop || document.documentElement.scrollTop
      );
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  return winScroll > threshold;
};
