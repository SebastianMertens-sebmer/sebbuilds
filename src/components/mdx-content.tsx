import type { ComponentPropsWithoutRef } from "react";

type AnchorProps = ComponentPropsWithoutRef<"a">;
type CodeProps = ComponentPropsWithoutRef<"code">;
type HeadingProps = ComponentPropsWithoutRef<"h2">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;

export const mdxComponents = {
  a: ({ children, ...props }: AnchorProps) => (
    <a {...props} rel="noreferrer" target={props.href?.startsWith("http") ? "_blank" : undefined}>
      {children}
    </a>
  ),
  code: ({ children, ...props }: CodeProps) => <code {...props}>{children}</code>,
  h2: ({ children, ...props }: HeadingProps) => <h2 {...props}>{children}</h2>,
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 {...props}>{children}</h3>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li {...props}>{children}</li>
  ),
  p: ({ children, ...props }: ParagraphProps) => <p {...props}>{children}</p>,
  ul: ({ children, ...props }: ListProps) => <ul {...props}>{children}</ul>,
};
