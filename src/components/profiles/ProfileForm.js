import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";

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
  dispositions,
  availabilities,
  onSubmit,
}) {
  const { register, handleSubmit } = useForm();

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DropdownArea>
          <DropdownContainer>
            <label>Disposition</label>
            <select {...register("dispositionIds")} multiple>
              {dispositions.map(({ id, description }) => (
                <option key={id} value={id}>
                  {description}
                </option>
              ))}
            </select>
          </DropdownContainer>
          <DropdownContainer>
            <label>Availability</label>
            <select {...register("availabilityId")}>
              {availabilities.map(({ id, description }) => (
                <option key={id} value={id}>
                  {description}
                </option>
              ))}
            </select>
          </DropdownContainer>
        </DropdownArea>
        <DropdownContainer>
          <FormInput {...register("name")} placeholder="Enter name" />
          <InputLabel>Enter DOB</InputLabel>
          <FormInput {...register("dob")} type="date" />
          <DescriptionBox
            {...register("description")}
            placeholder="Enter a description..."
            cols="50"
            rows="5"
          />
          <InputLabel>Picture</InputLabel>
          <FormInput
            {...register("image")}
            type="file"
            accept="image/png, image/jpeg"
          />
          <SubmitBtnLink type="submit">Submit</SubmitBtnLink>
        </DropdownContainer>
        <DropdownContainer />
      </Form>
    </FormContainer>
  );
}

ProfileForm.propTypes = {
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
    })
  ),
  dispositions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
    })
  ),
  onSubmit: PropTypes.func,
};
