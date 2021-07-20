import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/scrollToTop.scss";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isShowScrollButton, setIsShowScrollButton] = useState(false);

  const buttonClass = () => {
    return isShowScrollButton
      ? "is-show scroll-to-top__button icon-chevron-up"
      : "scroll-to-top__button icon-chevron-up";
  };

  const handleScroll = () => {
    const position = document.documentElement;
    const scrolledThroughLimit = position.scrollTop > 400;
    setIsShowScrollButton(!!scrolledThroughLimit);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-to-top__container">
      <button className={buttonClass()} onClick={scrollToTop} />
    </div>
  );
};

export default ScrollToTop;
