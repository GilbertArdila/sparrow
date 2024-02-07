import { atom } from "recoil";

const modal = atom({
    key: 'open', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });

  const postUser = atom({
    key: 'postUser', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
  });

  const postId = atom({
    key: 'postId', // unique ID (with respect to other atoms/selectors)
    default: "id", // default value (aka initial value)
  });

  export {modal,postUser,postId};