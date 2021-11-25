import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineDown as Icon } from "react-icons/ai";
import { $fetch } from "ohmyfetch";

const DropdownIcon = styled(Icon)`
  margin-left: 10px;
  padding-top: 5px;
`;

const DropdownArea = styled.div`
  display: flex;
  @media screen and (max-width: 1575px) {
    display: inline-block;
  }
`;

const DropdownContainer = styled.div`
  position: static;
  width: 11em;
  margin-left: 100px;
  @media screen and (max-width: 812px) {
    margin-left: -30%;
  }
`;

const DropdownHeader = styled.div`
  margin-bottom: 0.8rem;
  padding: 0.4em 2em 0.4em 2em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  font-size: 1.3rem;
  border-radius: 10px;
  color: #3faffa;
  background: #ffffff;
  @media screen and (max-width: 812px) {
    margin-left: 50%;
    margin-right: -50%;
  }
`;

const DropdownList = styled.ul`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 10px;
  &:first-child {
    padding-top: 0.8em;
  }
  @media screen and (max-width: 812px) {
    margin-left: 50%;
  }
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8rem;
`;

const FormContainer = styled.div`
  display: block;
  align-content: center;
  background: lightgrey;
  margin-left: 10%;
  margin-right: 20%;
  padding-top: 20px;
  border-radius: 30px;
`;

const Form = styled.form`
  display: inline-block;
`;

const FormInput = styled.input`
  margin: auto;
  padding: 5px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: none;
  @media screen and (max-width: 812px) {
    margin-left: 50%;
  }
`;

const SubmitBtnLink = styled.button`
  border-radius: 30px;
  background: #256ce1;
  padding: 10px 22px;
  margin-left: 650%;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
  @media screen and (max-width: 1575px) {
    margin-left: 0%;
  }
  @media screen and (max-width: 812px) {
    margin-left: 80%;
  }
`;

const DescriptionBox = styled.textarea`
  border-radius: 5px;
  border: none;
  @media screen and (max-width: 812px) {
    margin-left: 50%;
    width: 200px;
  }
`;

const InputLabel = styled.label`
  @media screen and (max-width: 812px) {
    margin-left: 34%;
  }
`;

export default function ProfileForm({
  allTypes,
  allBreeds,
  allDispositions,
  allAvailabilities,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);
  const [isOpenD, setIsOpenD] = useState(false);
  const [isOpenA, setIsOpenA] = useState(false);

  const toggling = () => setIsOpen(!isOpen);
  const togglinga = () => setIsOpenA(!isOpenA);
  const togglingb = () => setIsOpenB(!isOpenB);
  const togglingd = () => setIsOpenD(!isOpenD);

  const [selectedType, setSelectedOption] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(allDispositions.length).fill(false)
  );
  const [pictures, setPictures] = useState({
    files: [],
  });
  var selected_type_name = null;
  var selected_breed = null;
  var selected_avail = null;
  if (selectedType) {
    selected_type_name = selectedType.name;
  }
  if (selectedBreed) {
    selected_breed = selectedBreed.name;
  }
  if (selectedAvailability) {
    selected_avail = selectedAvailability.description;
  }

  async function filterBreeds(id) {
    const filtered_list = await allBreeds.filter((breed) => breed.typeId == id);
    console.log(filtered_list);
    return filtered_list;
  }

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    selected_type_name = value.name;
    selected_breed = null;
    setSelectedBreed(false);
    setFilteredBreeds(filterBreeds(value.id));
  };

  const onBreedClicked = (value) => () => {
    setSelectedBreed(value);
    setIsOpenB(false);
    selected_breed = value.name;
  };

  const onAvailabilityClicked = (value) => () => {
    setSelectedAvailability(value);
    selected_avail = value.name;
  };

  const registerProfile = async (item) => {
    await $fetch("/api/forms/profile", {
      method: "POST",
      body: JSON.stringify(item),
    });
    window.location.reload();
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const fileSelectedHandler = (e) => {
    const files = [...pictures.files];
    files.push(...e.target.files);
    setPictures({ files });
  };

  return (
    <>
      <FormContainer>
        <Form
          onSubmit={() => {
            const birthday = new Date(document.getElementById("age").value);
            const dispos_list = [];
            for (var i = 0; i < checkedState.length; i++) {
              if (checkedState[i] == true) {
                dispos_list.push(allDispositions[i - 1]);
              }
            }
            registerProfile({
              name: document.getElementById("name").value,
              age: birthday,
              description: document.getElementById("description").value,
              breedId: selectedBreed.id,
              availabilityId: selectedAvailability.id,
              profileDispositions: dispos_list,
              pictures: pictures,
            });
          }}
        >
          <DropdownArea>
            <DropdownContainer>
              <DropdownHeader onClick={toggling}>
                {selected_type_name || "Type"}
                <DropdownIcon />
              </DropdownHeader>
              {isOpen && (
                <div>
                  <DropdownList>
                    {allTypes.map((type) => (
                      <ListItem onClick={onOptionClicked(type)} key={type.id}>
                        {type.name}
                      </ListItem>
                    ))}
                  </DropdownList>
                </div>
              )}
            </DropdownContainer>
            <DropdownContainer>
              <DropdownHeader onClick={togglingb}>
                {selected_breed || "Breed"}
                <DropdownIcon />
              </DropdownHeader>
              {isOpenB && selectedType && filteredBreeds && (
                <div>
                  <DropdownList>
                    {allBreeds.map((breed) => (
                      <ListItem onClick={onBreedClicked(breed)} key={breed.id}>
                        {breed.name}
                      </ListItem>
                    ))}
                  </DropdownList>
                </div>
              )}
            </DropdownContainer>
            <DropdownContainer>
              <DropdownHeader onClick={togglingd}>
                Disposition
                <DropdownIcon />
              </DropdownHeader>
              {isOpenD && (
                <div>
                  <DropdownList>
                    {allDispositions.map((type) => (
                      <ListItem key={type.id}>
                        <input
                          type="checkbox"
                          id="dispositions"
                          value={type}
                          checked={checkedState[type.id]}
                          onChange={() => handleOnChange(type.id)}
                        />
                        <label htmlFor="dispositions">{type.description}</label>
                      </ListItem>
                    ))}
                  </DropdownList>
                </div>
              )}
            </DropdownContainer>
            <DropdownContainer>
              <DropdownHeader onClick={togglinga}>
                {selected_avail || "Availability"}
                <DropdownIcon />
              </DropdownHeader>
              {isOpenA && (
                <div>
                  <DropdownList>
                    {allAvailabilities.map((type) => (
                      <ListItem
                        onClick={onAvailabilityClicked(type)}
                        key={type.id}
                      >
                        {type.description}
                      </ListItem>
                    ))}
                  </DropdownList>
                </div>
              )}
            </DropdownContainer>
          </DropdownArea>
          <DropdownContainer>
            <FormInput placeholder="Enter name" id="name"></FormInput>
            <InputLabel>Enter DOB</InputLabel>
            <FormInput id="age" type="date"></FormInput>
            <DescriptionBox
              placeholder="Enter a description..."
              id="description"
              cols="50"
              rows="5"
            ></DescriptionBox>
            <InputLabel>Upload image(s)</InputLabel>
            <FormInput
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              onChange={fileSelectedHandler}
              multiple
            ></FormInput>
            <SubmitBtnLink type="submit">Submit</SubmitBtnLink>
          </DropdownContainer>
          <DropdownContainer />
        </Form>
      </FormContainer>
    </>
  );
}
