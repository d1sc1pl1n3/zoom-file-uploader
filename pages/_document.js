// TODO: is this overriding head? See Nextjs docs.

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCj7U8d19ldoFFW_0RHKcYqIwy-tWPp_bA&libraries=places"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
