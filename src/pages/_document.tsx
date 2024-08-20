import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="ko"
      className="overflow-x-hidden text-[6px] text-blog-black lg:text-[8px] xl:text-[10px] 2xl:text-[12px]"
    >
      <Head />
      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
