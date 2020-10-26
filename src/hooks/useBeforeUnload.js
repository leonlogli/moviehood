import { useRef, useEffect } from "react";

const useBeforeUnload = (handler) => {
  const cb = useRef(handler);

  useEffect(() => {
    const listener = cb.current;

    window.addEventListener("beforeunload", listener);

    return () => window.removeEventListener("beforeunload", listener);
  }, [cb]);
};

export { useBeforeUnload };
export default useBeforeUnload;
