"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import LeijonaPNG from "@/assets/Logos/leijona_musta.png";

type Props = {
  alt: string;
  src: string | StaticImageData;
  className?: string;
  height?: number;
  onClick?: () => void;
  width?: number;
};

const MyImage = ({
  alt,
  src,
  className = "",
  height = 50,
  onClick = () => null,
  width = 50,
}: Props) => {
  const [imageSrc, setImageSrc] = useState(src);

  const errorHandler = () => {
    setImageSrc(LeijonaPNG);
  };

  return (
    <Image
      alt={alt}
      src={imageSrc}
      height={height}
      width={width}
      className={className}
      onClick={onClick}
      onError={errorHandler}
    />
  );
};

export default MyImage;
