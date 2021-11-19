import React, { useState } from "react";
import styled from "styled-components";
import prisma from "~/lib/prisma";
import { AiOutlineDown as Icon } from "react-icons/ai";

export async function getStaticProps() {
  const types = await prisma.type.findMany({
    select: {
      id: true,
      name: true,
      breeds: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const dispositions = await prisma.disposition.findMany({
    select: {
      id: true,
      description: true,
    },
  });
  const availability = await prisma.availability.findMany({
    select: {
      id: true,
      description: true,
    },
  });
  return {
    props: {
      types: types,
      dispositions: dispositions,
      availability: availability,
    },
  };
}

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
`;

const DescriptionBox = styled.textarea`
  border-radius: 5px;
  border: none;
`;

function ProfileForm() {
  const example_types = [
    {
      id: 0,
      name: "dog",
      breeds: [
        { id: 10, name: "akita" },
        { id: 12, name: "corgi" },
        { id: 14, name: "pug" },
      ],
    },
    {
      id: 1,
      name: "cat",
      breeds: [
        { id: 12, name: "persian" },
        { id: 23, name: "siamese" },
        { id: 34, name: "scottish fold" },
      ],
    },
    {
      id: 2,
      name: "bird",
      breeds: [
        { id: 11, name: "cockatoo" },
        { id: 22, name: "dove" },
        { id: 33, name: "parakeet" },
      ],
    },
  ];
  const example_dispositions = [
    {
      id: 0,
      description: "Good with other animals",
    },
    {
      id: 1,
      description: "Good with kids",
    },
    {
      id: 2,
      description: "Must be leashed at all times",
    },
    {
      id: 3,
      description: "High Energy",
    },
  ];
  const example_availability = [
    {
      id: 0,
      description: "Available",
    },
    {
      id: 1,
      description: "Not Available",
    },
    {
      id: 2,
      description: "Pending",
    },
    {
      id: 3,
      description: "Adopted",
    },
  ];
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
  const [selectedDisposition, setSelectedDisposition] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  var selected_type_name = null;
  var selected_breed = null;
  var selected_dis = [];
  var selected_avail = null;
  if (selectedType) {
    selected_type_name = selectedType.name;
  }
  if (selectedBreed) {
    selected_breed = selectedBreed.name;
  }
  if (selectedDisposition) {
    selected_dis = selectedDisposition.name;
  }
  if (selectedAvailability) {
    selected_avail = selectedAvailability.description;
  }

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    selected_type_name = value.name;
    selected_breed = null;
    setSelectedBreed(false);
  };

  const onBreedClicked = (value) => () => {
    setSelectedBreed(value);
    setIsOpenB(false);
    selected_breed = value.name;
  };

  const onDispositionClicked = (value) => () => {
    setSelectedDisposition(value);
    selected_dis.push(value);
  };

  const onAvailabilityClicked = (value) => () => {
    setSelectedAvailability(value);
    selected_avail = value.name;
  };

  const registerProfile = async (item) => {
    await fetch("api/forms/profile", {
      method: "POST",
      body: JSON.stringify(item),
    });
    window.location.reload();
  };

  return (
    <>
      <FormContainer>
        <Form
          onSubmit={() =>
            registerProfile({
              description: document.getElementById("description").value,
              pic: document.getElementById("photo_url").value,
              breed: selectedBreed,
              breedId: selectedBreed.id,
              disposition: selectedDisposition,
              dispositionId: selectedDisposition.id,
              availability: selectedAvailability,
            })
          }
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
                    {example_types.map((type) => (
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
              {isOpenB && selectedType && (
                <div>
                  <DropdownList>
                    {selectedType.breeds.map((type) => (
                      <ListItem
                        onClick={onBreedClicked(type)}
                        key={type.id}
                        type="checkbox"
                      >
                        {type.name}
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
                    {example_dispositions.map((type) => (
                      <ListItem
                        onClick={onDispositionClicked(type)}
                        key={type.id}
                      >
                        <input type="checkbox" />
                        {type.description}
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
                    {example_availability.map((type) => (
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
            <FormInput placeholder="Enter photo URL" id="photo_url"></FormInput>
            <DescriptionBox
              placeholder="Enter a description..."
              id="description"
              cols="50"
              rows="5"
            ></DescriptionBox>
            <SubmitBtnLink type="submit">Submit</SubmitBtnLink>
          </DropdownContainer>
          <DropdownContainer />
        </Form>
      </FormContainer>
    </>
  );
}

export default ProfileForm;
