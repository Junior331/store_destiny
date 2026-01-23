import cash_10k from "./cash_10.webp";
import cash_16k from "./cash_16.webp";
import cash_24k from "./cash_24.webp";
import cash_30k from "./cash_30.webp";
import cash_65k from "./cash_65.webp";
import cash_80k from "./cash_80.webp";
import cash_100k from "./cash_100.webp";
import cash_150k from "./cash_150.webp";
import cash_250k from "./cash_250.webp";
import cash_390k from "./cash_390.webp";
import cash_550k from "./cash_550.webp";
import login_bg from "./login_bg.webp";
import fallback from "./placeholder.svg";
import gtabattlegrounds_logo from "./gtabattlegrounds_logo.png";
import logo_destiny_originals from "./logo_destiny_originals.svg";
import background_destinyShop from "./background_destinyShop.png";

type ImageObject = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export const images: Record<string, ImageObject> = {
  cash_10k,
  cash_16k,
  cash_24k,
  cash_30k,
  cash_65k,
  cash_80k,
  cash_100k,
  cash_150k,
  cash_250k,
  cash_390k,
  cash_550k,
  
  login_bg,
  fallback,
  gtabattlegrounds_logo,
  background_destinyShop,
  logo_destiny_originals,
};

type IImage = keyof typeof images;

export const getImage = (id: IImage) => {
  return images[id] ?? images.fallback;
};
