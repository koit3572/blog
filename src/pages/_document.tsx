import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="ko"
      className="overflow-x-hidden text-[8px] text-blog-black 2xl:text-[12px]"
    >
      <Head />
      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
