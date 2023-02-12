import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark", // 유니크
  default: false, // 기본값
});
