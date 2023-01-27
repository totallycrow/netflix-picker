import React from "react";

export const Header = ({ isAuth }: { isAuth: boolean }) => {
  return (
    // NEXTJS LINK COMPONENT DOESN'T WORK?
    <div className="bg-slate-200 flex justify-end px-8">
      <div>
        {isAuth ? (
          <a href="http://localhost:3000/api/logout">Logout</a>
        ) : (
          <a href="http://localhost:3000/api/login">Login</a>
        )}
      </div>
    </div>
  );
};
