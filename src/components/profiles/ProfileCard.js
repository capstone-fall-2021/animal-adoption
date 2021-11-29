import PropTypes from "prop-types";
import ProfileImage from "./ProfileImage";
import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";

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
  &:hover,
  &:focus,
  &:active {
    color: #0070f3;
    border-color: #0070f3;
  }
`;

const CardHeader = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

export default function ProfileCard({
  id,
  name,
  availability,
  type,
  breed,
  dispositions,
  image,
}) {
  return (
    <>
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
        <a href={`/profiles/${id}`} as={`/profiles/${id}`} passHref>
          <center>
            <ProfileImage path={`/api/images/${image}`} alt={name} />
            <CardHeader>{name}</CardHeader>
            <p>{availability}</p>
            <p>
              {type} / {breed}
            </p>
          </center>
          <ul>
            {dispositions.map((disposition) => (
              <li key={disposition}>{disposition}</li>
            ))}
          </ul>
        </a>
      </Card>
    </>
  );
}

ProfileCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  availability: PropTypes.string,
  type: PropTypes.string,
  breed: PropTypes.string,
  dispositions: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
};
