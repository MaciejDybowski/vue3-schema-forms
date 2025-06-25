import React from 'react';
import { CodeOrSourceMdx } from "@storybook/addon-docs";
import { Mermaid } from "mdx-mermaid/Mermaid";

export const MermaidWrapper = (props) => {
  if (props.className?.includes("mermaid")) {
    return React.createElement(Mermaid, { chart: props.children });
  }
  return React.createElement(CodeOrSourceMdx, props);
};
