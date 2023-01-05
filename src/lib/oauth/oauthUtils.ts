import { Ref } from "react";

const OAUTH_STATE_KEY = "react-use-oauth2-state-key";
const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;

export const generateOAuthState = () => {
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";

  for (let i = 0; i < 40; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  console.log(text);
  return text;
};

export const saveState = (state: string) => {
  console.log("state saved");
  sessionStorage.setItem("test", state);
};

export const removeState = () => {
  sessionStorage.removeItem(OAUTH_STATE_KEY);
};

export const openPopup = (url: string) => {
  // To fix issues with window.screen in multi-monitor setups, the easier option is to
  // center the pop-up over the parent window.
  const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
  const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
  return window.open(
    url,
    "OAuth2 Popup",
    `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
  );
};

export const closePopup = (popupRef: HTMLElement) => {
  popupRef.current?.close();
};
