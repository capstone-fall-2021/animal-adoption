import { $fetch } from "ohmyfetch";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SelectBreed = styled.select`
  margin-right: 10px;
  height: 30px;
  border-radius: 5px;
  @media screen and (max-width: 812px) {
    margin-bottom: 5px;
  }
`;

export default function BreedSelect({ type, onChange, ...props }) {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    if (type) {
      $fetch(`/api/types/${type}/breeds`).then(setBreeds);
    } else {
      setBreeds([]);
    }
  }, [type]);

  return (
    <SelectBreed
      {...props}
      disabled={!breeds.length}
      onChange={onChange}
      defaultValue=""
    >
      <option disabled value="">
        Filter by breed
      </option>
      {breeds.map((breed) => (
        <option key={breed.id} value={breed.name}>
          {breed.name}
        </option>
      ))}
    </SelectBreed>
  );
}

BreedSelect.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
};
