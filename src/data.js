import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export const value_converter = (value) => {
  const num = Number(value);

  if (isNaN(num)) {
    return value;
  }

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return Math.floor(num / 1000) + "K";
  } else {
    return num;
  }
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
