import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import Img from "next/image";

export default function Tagged() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const [tags, setTags] = useState();

  useEffect(() => {
    (async function run() {
      const data = await fetch("/api/tags").then((r) => r.json());
      setTags(data.tags);
    })();
  }, []);

  const [activeTag, setActiveTag] = useState();
  const [images, setImages] = useState();

  useEffect(() => {
    (async function run() {
      if (!activeTag) return;
      const data = await fetch("/api/images", {
        method: "POST",
        body: JSON.stringify({
          tag: activeTag,
        }),
      }).then((r) => r.json());
      setImages(data.resources);
    })();
  }, [activeTag]);

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  const [inputImage, setInputImage] = useState([]);

  useEffect(() => {
    console.log("input image", inputImage);
  }, [inputImage]);

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
    setInputImage(URL.createObjectURL(changeEvent.target.files[0]));
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  const [taggers, setTaggers] = useState([]);

  useEffect(() => {
    if (!uploadData) return;
    setTaggers(uploadData.info.categorization.google_tagging.data);
  }, [uploadData]);

  useEffect(() => {
    if (!taggers) return;
    console.log("taggers", taggers);
  }, [taggers]);

  async function handleOnSubmit(event) {
    event.preventDefault();

    const data = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        image: imageSrc,
      }),
    }).then((r) => r.json());

    setUploadData(data);
  }

  return (
    <Grid>
      <Main>
        <h1>Image Uploader</h1>

        {Array.isArray(tags) && (
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {tags.map((tag) => {
              return (
                <li key={tag} style={{ margin: ".5em" }}>
                  <button
                    onClick={() => setActiveTag(tag)}
                    style={{
                      color: "white",
                      backgroundColor:
                        tag === activeTag ? "blue" : "blueviolet",
                    }}
                  >
                    {tag}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {Array.isArray(images) && (
          <ul
            style={{
              display: "grid",
              gridGap: "1em",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {images.map((image) => {
              return (
                <li key={image.asset_id} style={{ margin: "1em" }}>
                  <Img
                    src={image.secure_url}
                    width={image.width}
                    height={image.height}
                    alt=""
                  />
                </li>
              );
            })}
          </ul>
        )}

        <p>Upload image</p>

        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>

          {imageSrc && (
            <Img src={imageSrc} width={960} height={640} alt="alternative" />
          )}

          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {taggers &&
            taggers.map((tag) => (
              <div key={tag.tag}>
                {tag.tag} - {tag.confidence}
              </div>
            ))}

          {taggers &&
            taggers.map((tag) => (
              <div key={tag.tag}>
                {tag.tag} - {tag.confidence}
              </div>
            ))}

          {uploadData && (
            <code>
              <pre>
                {JSON.stringify(
                  uploadData.info.categorization.google_tagging.data,
                  null,
                  2
                )}
              </pre>
              <br />
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}
        </form>
      </Main>
    </Grid>
  );
}

const Grid = styled.div`
  // display: grid;
  // grid-template: repeat(6, 1fr);
  // grid-column-gap: 10px;
  display: flex;
  padding: 50px;
  width: 900px;
  justify-content: flex-start;
  /* delete this? make lfex-start  */
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid green;
`;
