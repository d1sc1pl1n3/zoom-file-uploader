import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Img from "next/image";

// how to log one file in the array. We have an array of arrays...? or array of array of objects?? flatten first?

const DropField = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log(files, "are currently in the files array");
  }, [files]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("acceptedfiles", acceptedFiles);
    setFiles((oldArray) => [...oldArray, acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: true,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await fetch("/api/postImage", {
      method: "POST",
      body: JSON.stringify({
        test: true,
        files,
      }),
    }).then((r) => r.json());
    console.log("data", data);
  }

  return (
    <Grid>
      <Container>
        <DropZone
          {...getRootProps()}
          className={`${isDragActive ? "active" : null}`}
        >
          <div className="cross">
            <div className="shape">+</div>
          </div>
          <input {...getInputProps()} />
        </DropZone>
        {/* {files !== "" &&
          files.map((photo) => {
            <Photo name={photo.name} />;
          })} */}
      </Container>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </Grid>
  );
};

// const Photo = ({ name, src }) => {
//   return <Img src={src} alt="logo" width={125} height={30} />;
// };

export default DropField;

const Grid = styled.div`
  // display: grid;
  // grid-template: repeat(6, 1fr);
  // grid-column-gap: 10px;
  background: #252525;
  display: flex;
  padding: 50px;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-height: auto;
  .active {
    border: 2px solid orange;
    background: darkgrey;
  }
  .active:hover {
    border: 2px solid green;
  }
`;

const DropZone = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed grey;
  border-radius: 5px;

  .cross {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ff0000;
    border-radius: 100%;
    width: 40px;
    height: 40px;
  }
  .shape {
    margin: 0 auto;
    color: #ffffff;
    width: 16px;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
  }
  margin: 20px;
  padding: 20px;
  color: white;
  font-weight: 700;
  width: 240px;
  height: 240px;
`;
