import React, { Component, useState, useEffect } from "react";
import { init } from "ityped";

const ITyped = () => {
  useEffect(() => {
    const iTyped: any = document.querySelector("#iTyped");
    init(iTyped, {
      showCursor: false,
      strings: ["Welcome to TyPro.", "Yeah!"],
    });
  }, []);

  return <div id="iTyped" className="text-6xl font-mono"></div>;
};

export default ITyped;
