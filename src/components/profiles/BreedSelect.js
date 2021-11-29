import { $fetch } from "ohmyfetch";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

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
    <select
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
    </select>
  );
}

BreedSelect.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
};
