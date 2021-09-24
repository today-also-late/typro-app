import React, { Component, useState, useEffect } from "react";
import { init } from "ityped";

type PROPS = {
  strings: string[];
};

const ITyped = (props: PROPS) => {
  useEffect(() => {
    const iTyped: any = document.querySelector("#iTyped");
    init(iTyped, {
      showCursor: false,
      strings: props.strings,
    });
  }, []);

  return <div id="iTyped" className="text-6xl font-mono"></div>;
};

export default ITyped;
