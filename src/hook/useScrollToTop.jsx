import { useEffect } from "react";

export const useScrollToTop = (deps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, deps);
};
