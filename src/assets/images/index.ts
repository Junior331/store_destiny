import cash_10k from "./cash_10k.svg";
import login_bg from "./login_bg.webp";
import cash_100k from "./cash_100k.svg";
import cash_150k from "./cash_150k.svg";
import fallback from "./placeholder.svg";
import background_destinyShop from "./background_destinyShop.png";

type ImageObject = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export const images: Record<string, ImageObject> = {
  cash_10k,
  login_bg,
  fallback,
  cash_100k,
  cash_150k,
  background_destinyShop,
};

type IImage = keyof typeof images;

export const getImage = (id: IImage) => {
  return images[id] ?? images.fallback;
};
