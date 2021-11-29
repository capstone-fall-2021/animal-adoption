import PropTypes from "prop-types";
import useSWR from "swr";
import ProfileCard from "./ProfileCard";
import styled from "styled-components";

function createQueryString(params) {
  const qs = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      qs.append(key, value);
    }
  }

  return qs.toString();
}

const Grid = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;
  list-style: none;
  padding-left: 0;
`;

export default function SearchResults({ type, breed, disposition, createdAt }) {
  const { data, error } = useSWR(
    `/api/profiles?${createQueryString({
      type,
      breed,
      disposition,
      createdAt,
    })}`
  );

  if (error) {
    return <div>Error: ${error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>No profiles match the current criteria.</div>;
  }

  return (
    <center>
      <div>
        <Grid>
          {data.map(
            ({ id, name, availability, breed, dispositions, images }) => (
              <ProfileCard
                key={id}
                id={id}
                name={name}
                availability={availability.description}
                type={breed.type.name}
                breed={breed.name}
                dispositions={dispositions.map(
                  (d) => d.disposition.description
                )}
                image={images[0]?.name}
              />
            )
          )}
        </Grid>
      </div>
    </center>
  );
}

SearchResults.propTypes = {
  type: PropTypes.string,
  breed: PropTypes.string,
  disposition: PropTypes.string,
  createdAt: PropTypes.string,
};
