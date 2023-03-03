import { useEffect, useRef } from "react";

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // return previous value before it updates in above useEffect
  return ref.current;
};
