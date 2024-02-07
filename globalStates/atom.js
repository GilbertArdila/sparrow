import { atom } from "recoil";

const modal = atom({
    key: 'open', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });

  export {modal};