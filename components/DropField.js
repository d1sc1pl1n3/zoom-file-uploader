import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
//import { Image, CloudinaryContext, Transformation } from "cloudinary-react";

import Image from "next/image";

import MetaData from "../components/Metadata";
import Logo from "../components/Logo";

const DropField = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [docs, setDocs] = useState([]);
  // const [imageUrl, setImageUrl] = useState([]);

  // const [uploadedFiles, setUploadedFiles] = useState([
  //   {
  //     asset_id: "30391a192c9860e63a4dfe5bd21853c9",
  //     public_id: "nro86gimrgfdzpzuzbde",
  //     version: 1645828309,
  //     version_id: "0027c06261af1bce9c4b05ef6ccc9a7f",
  //     signature: "339e5c85928f75d3c629ce2ddcb6c71eefd90fa7",
  //     width: 371,
  //     height: 418,
  //     format: "png",
  //     resource_type: "image",
  //     created_at: "2022-02-25T22:31:49Z",
  //     tags: [],
  //     bytes: 40714,
  //     type: "upload",
  //     etag: "71377d1bcc7acec3074ce97d54ea8251",
  //     placeholder: false,
  //     url: "http://res.cloudinary.com/adding-noise/image/upload/v1645828309/nro86gimrgfdzpzuzbde.png",
  //     secure_url:
  //       "https://res.cloudinary.com/adding-noise/image/upload/v1645828309/nro86gimrgfdzpzuzbde.png",
  //     original_filename: "airbnb-logo-266x300@2x",
  //     api_key: "363422969771531",
  //   },
  // ]);

  const onDrop = useCallback((acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    acceptedFiles.forEach(async (acceptedFile) => {
      const { signature, timestamp } = await getSignature();
      setSelectedImage(acceptedFile);
      const formData = new FormData();
      formData.append("file", acceptedFile);
      // comment out upload_preset for using signed upload.
      // formData.append(
      //   "upload_preset",
      //   process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      // );
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

      const response = await fetch(url, {
        method: "post",
        body: formData,
      });

      const data = await response.json();

      console.log("data", data);

      // setUploadedFiles((old) => [...old, data]);
    });

    setDocs(
      acceptedFiles.map((doc) =>
        Object.assign(doc, {
          preview: URL.createObjectURL(doc),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accepts: "image/*",
    onDrop,
    multiple: true,
  });

  async function uploadImageOnSubmit() {
    // Within this function we also make a call to a Mock API to send formData from <MetaData /> component to a backend.
    // By passing a callback function down as a prop to <MetaData />

    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const { signature, timestamp } = await getSignature();

    const formData = new FormData();
    formData.append("file", selectedImage);
    // formData.append(
    //   "upload_preset",
    //   process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    // );
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log("data", data);
  }

  useEffect(() => {
    if (selectedImage !== "") console.log("selected image", selectedImage);
  }, [selectedImage]);

  return (
    <>
      <Container>
        <Left>
          <Logo />
          <Wrap>
            <DropZone
              {...getRootProps()}
              className={`${isDragActive ? "active" : null}`}
            >
              <div className="cross">
                <div className="shape">+</div>
              </div>
              <input {...getInputProps()} />
            </DropZone>
            <ul>
              {docs &&
                docs.map((image) => (
                  <ImgCont key={image.key}>
                    <Image
                      src={image.preview}
                      alt="Picture"
                      width={650}
                      height={480}
                    />
                  </ImgCont>
                ))}
            </ul>
          </Wrap>
        </Left>
        <Right>
          <MetaData imageId={selectedImage} />
        </Right>
        <BottomContainer>
          <Buttons>
            <Upload onClick={uploadImageOnSubmit}>Upload</Upload>
            <Cancel>Annuleren</Cancel>
          </Buttons>
        </BottomContainer>
      </Container>
    </>
  );
};

async function getSignature() {
  const response = await fetch("/api/sign");
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
}

export default DropField;

const Container = styled.div`
  background: #191919;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  min-height: max-content;
  .active {
    border: 2px dashed lightgrey;
    background: #252525;
  }
  ul {
    list-style-type: none;
  }
`;

const Left = styled.div`
  width: 800px;
  min-height: auto;
  height: 810px;
`;

const Wrap = styled.div`
  display: flex;
  height: auto;
`;

const Right = styled.div`
  background: #fff;
  width: 480px;
  height: auto;
`;

const DropZone = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .cross {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ff0000;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    padding-bottom: 4px;
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
  color: white;
  font-weight: 700;
  width: 240px;
  height: 240px;
  border: 2px dashed grey;
  border-radius: 5px;
`;

const ImgCont = styled.div`
  width: 364px;
  height: 240px;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: auto;
  }
  margin-bottom: 20px;
  transition: all 0.5s ease;
  :hover {
    border: 1px solid #fb001c;
  }
`;

const BottomContainer = styled.div`
  height: 10vh;
  width: 100%;
  background: #fff;
`;

const Buttons = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Upload = styled.button`
  font-family: Raleway;
  color: #fff;
  border: none;
  border-radius: 6px;
  width: 105px;
  height: 40px;
  background-color: #fb001c;
`;

const Cancel = styled.button`
  font-family: Raleway;
  border: 1px solid #9e9e9e;
  border-radius: 6px;
  width: 95px;
  height: 40px;
  line-height: 17px;
  background-color: transparent;
`;
