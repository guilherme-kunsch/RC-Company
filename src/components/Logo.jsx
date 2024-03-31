import React from "react";
import logo from "../assets/logo.svg";

export function Logo() {
  return (
    <div className="flex items-center">
      <img src={logo} className="h-7 mr-3 " alt="medium.ia logo" />
    </div>
  );
};

