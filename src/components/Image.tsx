import { useEffect, useRef } from "react";
import { ImageSizes, getImageById } from "api/dog";

import "./Image.css";

interface ImageProps {
  id: string;
  alt?: string;
  size?: ImageSizes;
}

const Image = ({ id = "", alt = "", size }: ImageProps) => {
  const mainImageRef = useRef<HTMLImageElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function loaded() {
      spinnerRef.current?.classList.remove("show");
      mainImageRef.current?.classList.add("show");
    }

    getImageById({ id, size }).then((response) => {
      if (mainImageRef.current && spinnerRef.current) {
        mainImageRef.current.src = response?.data?.url;
        if (mainImageRef.current.complete) {
          loaded();
        } else {
          spinnerRef.current.classList.add("show");
          mainImageRef.current.classList.remove("show");
          mainImageRef.current.addEventListener("load", loaded);
        }
      }
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const cleanupRef = mainImageRef?.current;
      if (cleanupRef) cleanupRef?.removeEventListener("load", loaded);
    };
  }, [id, spinnerRef, mainImageRef, size]);

  return (
    <div className="img-container">
      <div ref={spinnerRef} className="spinner">
        🐶
      </div>
      <img
        ref={mainImageRef}
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        className="rounded main-img show"
        alt={alt}
      />
    </div>
  );
};

export default Image;
