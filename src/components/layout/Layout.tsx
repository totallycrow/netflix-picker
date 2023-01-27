import React from "react";
import { Header } from "../header/Header";
import { MainMenu } from "../MainMenu";

export default function Layout({
  isAuth,
  children,
}: {
  isAuth: boolean;
  children: JSX.Element;
}) {
  return (
    <>
      <Header isAuth={isAuth} />
      <MainMenu></MainMenu>
      <main>{children}</main>
    </>
  );
}
