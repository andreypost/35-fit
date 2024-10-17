"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// add this ref:  ref={useAos()} only for pages, in components only: data-aos="fade"
const useAos = (animationType = "fade", duration = 2000, once = false) => {
  const ref = useRef(null);

  useEffect(() => {
    AOS.init({ duration, once });
    if (ref.current) {
      // ref.current.style.opacity = 0;
      // ref.current.style.transition = "opacity 2s";
      // ref.current.setAttribute("data-aos", animationType);
      setTimeout(() => (ref.current.style.opacity = ""), 0);
    }
  }, [animationType, duration, once]);

  return ref;
};

export default useAos;
