import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Img from "next/image";
// TODO: Add validation
// TODO: Add styling

const UploadForm = () => {
  const [file, setFile] = useState([]);

  const submitForm = async (e) => {
    e.preventDefault();

    // try {
    //   const payload = {
    //     merge_fields: {
    //       FNAME: firstName,
    //       LNAME: lastName,
    //     },
    //     email_address: email,
    //     // message: message,
    //   };
    //   await axios.post("/api/mailchimpContact", payload);
    //   alert("Thank you for your message.");
    //   //return false;
    // } catch (error) {
    //   console.log(error);
    //   console.log(error.response.status);
    //   alert(error);
    // }
  };

  const handleFile = (e) => {
    setFile(e.target.value);
    //console.log(file);
  };

  return (
    <div>
      <FormContainer>
        <form onSubmit={submitForm}>
          <Row className="image-upload">
            <label htmlFor="file-input">
              <Img
                src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png"
                alt="logo"
                width={25}
                height={25}
              />
            </label>
            <InputField
              type="file"
              id="fileInput"
              name="file"
              value={file}
              onChange={handleFile}
            />
          </Row>
        </form>
      </FormContainer>
    </div>
  );
};

const FormContainer = styled.section`
  /* border: 1px solid black; */
  padding: 25px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
  min-height: max-content;
  @media only screen and (max-width: 767px) and (min-width: 375px) {
  }
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
  }
  @media only screen and (min-width: 1024px) {
    //background: yellow;
    width: 50%;
  }
`;

/*   .image-upload > input {
    display: none;
  }
  where does this go:
  
  */

const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  //border: 1px solid yellow;
  min-height: min-content;
  select {
    padding: 15px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    margin-top: 10px;
    //appearance: none;
  }
`;

const InputField = styled.input`
  //border: 2px dashed #cccccc;
  color: #242424;
  padding: 10px;
  height: 240px;
  width: 240px;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  :focus {
    outline-width: 0;
  }
  ::placeholder {
    color: #000;
  }
`;

const FormLabel = styled.label`
  text-transform: uppercase;
  font-size: 0.9rem;
  margin: 0px 0px 10px 0px;
`;

export default UploadForm;
