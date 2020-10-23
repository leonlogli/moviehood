import React, { useState, useEffect } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useResizeObserver } from "../../hooks";
import { scrollRight, scrollLeft } from "./ScrollView.aniations";

import "./ScrollView.scss";

const ScrollView = (props) => {
  const { children, spacing = 16, scrollDuration = 600, ...other } = props;
  const scrollBoxRef = React.useRef();

  const [scrolling, setScrolling] = useState(false);
  const [showRightIcon, setShowRightIcon] = useState(false);
  const [showLeftIcon, setShowLeftIcon] = useState(false);
  const { width = 1 } = useResizeObserver({ ref: scrollBoxRef });

  const onDesktop = width > 576;
  const [scrollByValue, setScrollByValue] = useState(onDesktop ? 330 : 275);

  const updateMargin = (spacing) => {
    if (scrollBoxRef.current) {
      const scrollItems = scrollBoxRef.current.querySelectorAll(
        ":scope > *:not(:last-child)"
      );

      scrollItems.forEach((item) => {
        item.style.marginRight = `${String(spacing).replace("px", "")}px`;
      });
    }
  };

  updateMargin(spacing);

  useEffect(() => {
    updateMargin(spacing);
  }, [spacing]);

  useEffect(() => {
    if (scrollBoxRef.current) {
      setScrollByValue(Math.round(scrollBoxRef.current.offsetWidth / 1.8));
    }
  }, [onDesktop, scrollBoxRef]);

  useEffect(() => {
    const scrollBox = scrollBoxRef.current;

    if (scrollBox) {
      const margin = parseInt(scrollBox.style.marginLeft, 10) || 0;
      const remainingMargin = scrollBox.scrollWidth - scrollBox.offsetWidth;

      setShowRightIcon(remainingMargin !== 0);
      setShowLeftIcon(margin !== 0);
    }
  }, [scrollBoxRef, scrolling, width]);

  const onLeftClick = () => {
    if (scrolling === false) {
      setScrolling(true);
      const scrollBox = scrollBoxRef.current;

      if (scrollBox) {
        scrollRight(scrollBox, scrollByValue);
        setTimeout(() => setScrolling(false), scrollDuration);
      }
    }
  };

  const onRightClick = () => {
    if (scrolling === false) {
      setScrolling(true);
      const scrollBox = scrollBoxRef.current;

      if (scrollBox) {
        scrollLeft(scrollBox, scrollByValue);
        setTimeout(() => setScrolling(false), scrollDuration);
      }
    }
  };

  return (
    <div className="ScrollView" {...other}>
      <div className="InnerBox">
        <span
          className={
            "ActionIcon LeftIcon " +
            (showLeftIcon && "show ") +
            (scrolling && "disabled")
          }
          onClick={onLeftClick}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span
          className={
            "ActionIcon RightIcon " +
            (showRightIcon && "show ") +
            (scrolling && "disabled")
          }
          onClick={onRightClick}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <div
          className="ScrollBox"
          ref={scrollBoxRef}
          style={{ transition: `margin ${scrollDuration}ms` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { ScrollView };
export default ScrollView;
