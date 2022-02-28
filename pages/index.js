import { useState } from "react";
import Head from "next/head";

import PhotoGrid from "../components/PhotoGrid";
import styled from "styled-components";

export default function Home() {
  const [images, setImages] = useState([]);

  return (
    <Container>
      <Head>
        <title>Zoom Photo Uploader</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PhotoGrid />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 1440px;
  min-height: auto;
`;

// todo make sure the metadata state is coupled to a specific image
// todo add Google Maps (+ dropdown)
// todo multiple handlechecked
// todo extract plus into SVG SVGR component
// todo category is dropdown
// todo add question mark svg in public, and align right
// todo install + use SVGR (need extra packages, cli?)
// todo make png zoom.nl white
// todo add better cross based on icon
// todo add icon in form
// todo Category + Tags
// todo Add flexbox row for checkbox + text
// todo align correctly the total Grid in
// todo make responsive
// todo ADD REDUCER
