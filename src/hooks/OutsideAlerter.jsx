import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, onClickOutside) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter({ onClickOutside, ...props }) {
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, onClickOutside);

  return <div ref={wrapperRef}>{props?.children}</div>;
}
