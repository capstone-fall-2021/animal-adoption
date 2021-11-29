import PropTypes from "prop-types";
import ProfileImage from "./ProfileImage";
import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";

const Grid = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`;

const Card = styled(motion.li)`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
`;

export default function ProfileCard({
  // id,
  name,
  availability,
  type,
  breed,
  dispositions,
  image,
}) {
  return (
    <>
      <Grid>
        <Card
          whileHover={{
            position: "relative",
            zIndex: 1,
            background: "white",
            scale: [1, 1.4, 1.2],
            transition: {
              duration: 0.2,
            },
          }}
        >
          <Link href="/animal/[name]" as={`/animal/${name}`} passHref>
            <a>
              <ProfileImage path={`/api/images/${image}`} alt={name} />
              <h3>{name}</h3>
              <p>{availability}</p>
              <p>
                {type} / {breed}
              </p>
              <ul>
                {dispositions.map((disposition) => (
                  <li key={disposition}>{disposition}</li>
                ))}
              </ul>
            </a>
          </Link>
        </Card>
        );
      </Grid>
      {/* <div>
        <ProfileImage path={`/api/images/${image}`} alt={name} />
        <div>{name}</div>
        <div>{availability}</div>
        <div>
          {type} / {breed}
        </div>
        <ul>
          {dispositions.map((disposition) => (
            <li key={disposition}>{disposition}</li>
          ))}
        </ul>
      </div> */}
    </>
  );
}

ProfileCard.propTypes = {
  // id: PropTypes.number,
  name: PropTypes.string,
  availability: PropTypes.string,
  type: PropTypes.string,
  breed: PropTypes.string,
  dispositions: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
};
