import { ReactNode } from "react";
import Markdown from "react-markdown";

import {
    materialLight,
    nord,
  } from "react-syntax-highlighter/dist/esm/styles/prism";
  
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useTheme } from "@/context/theme-provider";

export default function AdjustedMarkdown({children}:{children:string}){
    
  const { theme } = useTheme();
    return(
        <Markdown
        children={children}
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            const currentTheme =
              theme === "system"
                ? window.matchMedia &&
                  window.matchMedia("(prefers-color-scheme: dark)")
                    .matches
                  ? "dark"
                  : "light"
                : theme;
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={currentTheme === "dark" ? nord : materialLight}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    )
}