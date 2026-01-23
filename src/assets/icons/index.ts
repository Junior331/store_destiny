import cursor from "./cursor.svg";
import youtube from "./youtube.svg";
import linkedin from "./linkedin.svg";
import instagram from "./instagram.svg";
import cart_checkout from "./cart_checkout.svg";
import fallback from "../images/placeholder.svg";

export const icons = {
  cursor,
  fallback,
  youtube,
  linkedin,
  instagram,
  cart_checkout,
};

type IIcons = keyof typeof icons;

export const getIcons = (id: IIcons) => {
  return icons[id] ?? icons.fallback;
};
