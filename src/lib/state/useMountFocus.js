import { useEffect, useRef } from "react";

const useMountFocus = () => {
  const inputRef = useRef(null);
  const setFocus = () => {
    inputRef.current &&
      inputRef.current.focus({
        preventScroll: true,
      });
  };

  useEffect(() => {
    setFocus();
    console.log(inputRef.current, "포커싱 하는중");
  }, [inputRef]);

  return [inputRef, setFocus];
};

export default useMountFocus;
