import { useEffect, useState } from "react";

export function useProgressVersion() {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    function onChange() {
      setVersion((current) => current + 1);
    }

    window.addEventListener("learningrust:progress", onChange);
    window.addEventListener("storage", onChange);

    return () => {
      window.removeEventListener("learningrust:progress", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return version;
}
