import React from "react";
import styled from "styled-components";
import DropField from "./DropField";
import Tagged from "../components/taggedUploads";

const PhotoGrid = () => {
  return (
    <Grid>
      <DropField />
      <Tagged />
    </Grid>
  );
};

const Grid = styled.div`
  // display: grid;
  // grid-template: repeat(6, 1fr);
  // grid-column-gap: 10px;
  display: flex;
  width: 1440px;
  flex-wrap: wrap;
  min-height: auto;
`;

export default PhotoGrid;
