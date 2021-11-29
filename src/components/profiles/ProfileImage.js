import Image from "next/image";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function ProfileImage({ path, alt }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener("load", () => setSrc(reader.result), false);

    fetch(path)
      .then((response) => response.blob())
      .then((blob) => reader.readAsDataURL(blob));
  }, [path]);

  if (!src) {
    return null;
  }

  return <Image src={src} alt={alt} width="200" height="150" />;
}

ProfileImage.propTypes = {
  path: PropTypes.string,
  alt: PropTypes.string,
};
