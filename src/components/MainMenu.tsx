import Link from "next/link";
import router from "next/router";
import React from "react";

export const MainMenu = () => {
  return (
    <div className="bg-slate-400 flex justify-center">
      <div className="p-2">
        <Link href="http://localhost:3000">Home</Link>
      </div>
      <div className="p-2">
        <Link href="http://localhost:3000/favourites">Favourites</Link>
      </div>
      <div className="p-2">
        {/* <Link href="http://localhost:3000/#test">hash test</Link> */}
        <button onClick={(url) => router.replace(router.pathname + "/#test-1")}>
          Hash Test
        </button>
      </div>
    </div>
  );
};
