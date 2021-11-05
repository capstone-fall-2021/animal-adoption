import React, { useState } from "react";
import Router from "next/router";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PrismaClient } from ".prisma/client";
import { AiOutlineDown as Icon } from "react-icons/ai";

export async function getStaticProps() {
  const prisma = new PrismaClient();
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
  return {
    props: {
      types: types,
      dispositions: dispositions,
    },
  };
}

const DropdownIcon = styled(Icon)`
  padding-left: 5px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
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
  display: flex;
`;

const FormInput = styled.input`
  display: inline-flex;
  margin: auto;
  align-content: center;
`;

const FormInputContainer = styled.div`
  display: inline-flex;
`;

const CheckboxHeader = styled.h5`
  text-align: left;
  align-content: left;
  margin-right: 15px;
  margin-left: -35px;
`;

const SubmitBtnLink = styled.a`
  border-radius: 30px;
  background: #256ce1;
  padding: 10px 22px;
  margin-left: 90%;
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
`;

function ProfileForm({ types, dispositions }) {
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
  // get types and dispositions from db
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);
  const [isOpenD, setIsOpenD] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const togglingb = () => setIsOpenB(!isOpenB);
  const togglingd = () => setIsOpenD(!isOpenD);

  const [selectedType, setSelectedOption] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedDisposition, setSelectedDisposition] = useState(null);
  var breeds = [];
  var selected_type_name = null;
  var selected_breed = null;
  var selected_dis = null;
  if (selectedType) {
    selected_type_name = selectedType.name;
  }
  if (selectedBreed) {
    selected_breed = selectedBreed.name;
  }
  if (selectedDisposition) {
    selected_dis = selectedDisposition.name;
  }

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    selected_type_name = value.name;
    selected_breed = null;
    setSelectedBreed(false);
    if (value.name == "other") {
      breeds = ["n/a"];
    } else {
      breeds = value.breeds;
      console.log(selectedType);
    }
  };

  const onBreedClicked = (value) => () => {
    setSelectedBreed(value);
    setIsOpenB(false);
    selected_breed = value.name;
    console.log(selectedBreed);
  };

  const onDispositionClicked = (value) => () => {
    setSelectedDisposition(value);
    selected_dis = value.name;
    console.log(selectedDisposition);
  };

  const registerProfile = async (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={registerProfile}>
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
              {selected_dis || "Disposition"}
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
          <br />
          <FormInput placeholder="Enter photo URL"></FormInput>
          <br />
          <FormInput placeholder="description"></FormInput>
          <input type="checkbox"></input>
          <CheckboxHeader>Available?</CheckboxHeader>
        </Form>
        <SubmitBtnLink>Submit</SubmitBtnLink>
      </FormContainer>
    </>
  );
}

export default ProfileForm;
