import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineDown as Icon } from "react-icons/ai";
import { $fetch } from "ohmyfetch";

const Form = styled.form`
  display: inline-block;
`;

const FormContainer = styled.div`
  display: block;
  align-content: center;
  background: lightgrey;
  margin-left: 30%;
  margin-right: 30%;
  padding-top: 20px;
  border-radius: 30px;
  @media screen and (max-width: 375px) {
    margin-right: 10%;
    margin-left: 10%;
  }
`;

const SubmitBtnLink = styled.button`
  border-radius: 30px;
  background: #256ce1;
  padding: 10px 22px;
  margin-top: 10%;
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

const DescriptionTextarea = styled.textarea`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
`;

const DropdownIcon = styled(Icon)`
  margin-left: 10px;
  padding-top: 5px;
`;

const DropdownContainer = styled.div`
  position: static;
  width: 11em;
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

export default function BreedForm({ allTypes }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const [selectedType, setSelectedOption] = useState(null);
  var selected_type_name = null;
  if (selectedType) {
    selected_type_name = selectedType.name;
  }
  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    selected_type_name = value.name;
  };

  const registerBreed = async (item) => {
    await $fetch("/api/forms/breed", {
      method: "POST",
      body: JSON.stringify(item),
    });
    window.location.reload();
  };
  return (
    <>
      <center>
        <FormContainer>
          <Form
            onSubmit={() =>
              registerBreed({
                name: document.getElementById("description").value,
                typeId: selectedType.id,
              })
            }
          >
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
            {!isOpen && selectedType && (
              <div>
                <DescriptionTextarea
                  rows="2"
                  cols="30"
                  placeholder="Enter the breed name"
                  id="description"
                ></DescriptionTextarea>
                <SubmitBtnLink type="submit">Submit</SubmitBtnLink>
              </div>
            )}
          </Form>
        </FormContainer>
      </center>
    </>
  );
}
