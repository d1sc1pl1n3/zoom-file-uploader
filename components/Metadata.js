import React, { useDebugValue, useEffect, useState } from "react";
import styled from "styled-components";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const MetaData = (props) => {
  // Note: Ideally we would use useReducer or Redux to manage more voluble or complex state
  const [imageFromParent, setImageFromParent] = useState(props.imageId);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [feedback, setFeedback] = useState(false);
  const [tips, setTips] = useState(false);
  const [usage, setUsage] = useState(false);
  const [downloads, setDownloads] = useState(false);
  // const [formState, setFormState] = useState({ title: "", userName: "" });

  // TODO: for each displayed image add imageId to dataList, to an object within the array.
  // Then onClick, select, or re-select that idea.
  // THINK: Where did you see similar functionality

  useEffect(() => {
    setImageFromParent(props.imageId);
  }, [props.imageId]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = (e) => {
    if (e.target.value.length < 1) {
      setTitleError("Vul het veld in");
    } else if (e.target.value.length < 3) {
      setTitleError("Vul het veld volledig in");
    } else {
      setTitleError(" ");
    }
  };

  const handleDesc = (e) => {
    setUsername(e.target.value);
  };

  const handleDescBlur = (e) => {
    if (!e.target.value) {
      setDescError("Vul het veld in");
    }
    if (e.target.value.length < 3) {
      setDescError("Vul het veld volledig in");
    }
    if (e.target.value >= 3) {
      setDescError("");
    }
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  // TODO: checked is component is generic, in final app each checkbox should have separate state, mutates all checkboxes, make state isolated/controlled, sometimes false, sometimes true.

  const handleFeedback = (e) => {
    setFeedback(!feedback);
  };

  const handleTips = (e) => {
    setTips(!tips);
  };
  const handleUsage = (e) => {
    setUsage(!usage);
  };
  const handleDownloads = (e) => {
    setDownloads(!downloads);
  };

  // Location state and handler

  const [address, setAddress] = useState("");

  const handleLocator = async (value) => {
    //const results = await geocodeByAddress(value);
    setAddress(value);
    //console.log(results[0].formatted_address);
  };

  const [tags, setTags] = useState([]);
  const [visibleTags, setVisibleTags] = useState([]);

  const handleTags = (e) => {
    setTags(e.target.value);
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      //setVisibleTags([...visibleTags, ...tags]);
      setVisibleTags(tags);
    }
  };

  return (
    <Meta>
      <Row>
        <LabelRow>
          <FormLabel htmlFor="titel">Titel</FormLabel>
        </LabelRow>

        <InputField
          type="text"
          id="titel"
          name="titel"
          placeholder="Vul een passende titel in voor deze foto"
          autoComplete="off"
          value={title}
          onChange={handleTitle}
          onBlur={handleTitleBlur}
        />
        {titleError !== "" && <p className="error">{titleError}</p>}
      </Row>
      <Row>
        <LabelRow>
          <FormLabel htmlFor="titel">Beschrijving</FormLabel>
        </LabelRow>

        <Text
          type="textarea"
          id="titel"
          name="titel"
          placeholder="Geef je foto een korte beschrijving"
          autoComplete="off"
          value={username}
          onChange={handleDesc}
          onBlur={handleDescBlur}
        />
        <p>{descError}</p>
      </Row>
      <Row>
        <LabelRow>
          <FormLabel htmlFor="titel">Locatie</FormLabel>
        </LabelRow>

        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleLocator}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <InputField
                {...getInputProps({
                  placeholder: "Vul in waar de foto genomen is",
                })}
              />
              <div>{loading ? <div>laden van gegevens...</div> : null}</div>
              {/* {address && <div>geselecteerd adres: {address}</div>} */}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#c9c9c9" : "white",
                };
                return (
                  <div
                    key={Math.random()}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          )}
        </PlacesAutocomplete>
      </Row>
      <Separator />
      <Row>
        <LabelRow>
          <FormLabel htmlFor="titel">Tags</FormLabel>
        </LabelRow>
        <TagInput
          type="text"
          id="tags"
          name="tags"
          placeholder="Voeg tags toe"
          value={tags}
          onKeyPress={handleKey}
          onChange={handleTags}
        />
        <TagField>
          {visibleTags.length > 0 && (
            <>
              <TagTitle>
                <h3>Toegevoegde tags</h3>
              </TagTitle>
              <TagCont>
                <Tag>{visibleTags}</Tag>
              </TagCont>
              {/* {visibleTags.map((name) => {
                return (
                  <>
                    <TagCont>
                      <Tag>{name}</Tag>
                    </TagCont>
                  </>
                );
              })} */}
            </>
          )}

          <TagTitle>
            <h3>Aanbevolen tags</h3>
          </TagTitle>
          <TagCont>
            <Tag>Landschap</Tag>
            <Tag>Stad</Tag>
            <Tag>Auto</Tag>
            <Tag>Mensen</Tag>
          </TagCont>
        </TagField>
      </Row>
      <Row>
        <LabelRow>
          <FormLabel htmlFor="category">Categorie</FormLabel>
        </LabelRow>

        <InputField
          type="text"
          id="category"
          name="category"
          placeholder="Vul een passende titel in voor deze foto"
          autoComplete="off"
          value={category}
          onChange={handleCategory}
        />
      </Row>
      <Separator />
      <Row>
        <LabelRow>
          <FormLabel htmlFor="titel">Feedback</FormLabel>
        </LabelRow>
        <CheckRow>
          <Check type="checkbox" checked={feedback} onChange={handleFeedback} />
          Ik wil feedback vragen op basis van mijn foto
        </CheckRow>
      </Row>
      <Row>
        <LabelRow>
          <FormLabel htmlFor="titel">Tips</FormLabel>
        </LabelRow>
        <CheckRow>
          <Check type="checkbox" checked={tips} onChange={handleTips} />
          Ik wil tips geven op basis van mijn foto
        </CheckRow>
      </Row>
      <Separator />
      <Row>
        <LabelRow>
          <FormLabel htmlFor="titel">Gebruik</FormLabel>
        </LabelRow>
        <CheckRow>
          <Check type="checkbox" checked={usage} onChange={handleUsage} />
          Deze foto mag gebruikt worden in cursussen, events of in
          magazine&apos;s
        </CheckRow>
        <CheckRow>
          <Check
            type="checkbox"
            checked={downloads}
            onChange={handleDownloads}
          />
          Downloads toestaan
        </CheckRow>
      </Row>
    </Meta>
  );
};

const Meta = styled.section`
  font-family: Raleway;
  margin: 0 auto;
  display: flex;
  padding: 20px;
  flex-direction: column;
  height: 100%;
  min-height: min-content;
  min-width: 420px;
  max-width: auto;
  font-size: 14px;
  color: #616161;
  background: #fafafa;
  .error {
    color: #fb001c;
  }
`;

const LabelRow = styled.div`
  display: flex;
  height: 4vh;
  justify-content: space-between;
  width: 420px;
`;

const Separator = styled.div`
  border-bottom: 1px solid #9e9e9e;
  width: 420px;
  margin: 24px 0px 24px 0px;
`;

const CheckRow = styled.div`
  display: flex;
  align-items: center;
  min-height: 4vh;
  height: auto;
  //border: 1px solid lightblue;
  justify-content: flex-start;
  width: 420px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  min-height: min-content;
  select {
    padding: 15px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    margin-top: 10px;
  }
`;

const InputField = styled.input`
  color: #9e9e9e;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  border: 1px solid #9e9e9e;
  border-radius: 6px;
  padding: 10px;
  width: 420px;
  height: 48px;
  font-family: Raleway;
  font-size: 14px;
  letter-spacing: -0.1px;
  line-height: 17px;
  :focus {
    outline-width: 0;
  }
  ::placeholder {
    color: #9e9e9e;
  }
`;

const Text = styled.textarea`
  color: #9e9e9e;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  border: 1px solid #9e9e9e;
  border-radius: 6px;
  padding: 10px;
  width: 420px;
  height: 96px;
  font-family: Raleway;
  font-size: 14px;
  letter-spacing: -0.1px;
  line-height: 17px;
  :focus {
    outline-width: 0;
  }
  ::placeholder {
    color: #9e9e9e;
  }
  resize: none; /*remove the resize handle on the bottom right*/
`;

const TagInput = styled.input`
  color: #9e9e9e;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  border: 1px solid #9e9e9e;
  border-radius: 6px 6px 0px 0px;
  padding: 10px;
  width: 420px;
  height: 48px;
  font-family: Raleway;
  font-size: 14px;
  letter-spacing: -0.1px;
  line-height: 17px;
  :focus {
    outline-width: 0;
  }
  ::placeholder {
    color: #9e9e9e;
  }
`;

const TagField = styled.div`
  border: 1px solid #9e9e9e;
  height: auto;
  width: 420px;
  border-top: none;
  border-radius: 0px 0px 4px 4px;
  padding: 5px;
  padding-left: 15px;
  color: #9e9e9e;
`;

const TagCont = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagTitle = styled.div`
  h3 {
    color: #191919;
    font-family: Raleway;
    font-size: 14px;
    letter-spacing: -0.1px;
    line-height: 17px;
    text-align: left;
    padding-left: 15px;
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  color: #fb001c;
  font-family: Raleway;
  font-size: 14px;
  letter-spacing: -0.1px;
  line-height: 17px;
  height: 32px;
  border: 2px solid #fb001c;
`;

const FormLabel = styled.label`
  color: #191919;
  font-family: Raleway;
  font-size: 14px;
  letter-spacing: -0.1px;
  line-height: 17px;
  text-align: left;
  font-weight: 700;
`;

const Check = styled.input`
  border: 1px solid #ccc;
  background-color: #eee;
  margin: 15px;
`;

export default MetaData;
