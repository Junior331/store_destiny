import cursor from "./cursor.svg";
import cart_checkout from "./cart_checkout.svg";
import fallback from "../images/placeholder.svg";

export const icons = {
  cursor,
  fallback,
  cart_checkout,
};

type IIcons = keyof typeof icons;

export const getIcons = (id: IIcons) => {
  return icons[id] ?? icons.fallback;
};
