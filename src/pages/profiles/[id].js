import { getSession } from "next-auth/client";
import PropTypes from "prop-types";
import ProfileImage from "~/components/profiles/ProfileImage";
import { findProfileById } from "~/repositories/profiles";
import styled from "styled-components";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { dob, breed, availability, dispositions, images, createdAt, ...rest } =
    await findProfileById(Number(context.query.id));

  return {
    props: {
      profile: {
        ...rest,
        type: breed.type.name,
        breed: breed.name,
        availability: availability.description,
        dispositions: dispositions.map((d) => d.disposition.description),
        image: images[0].name,
        dob: dob.toISOString(),
        createdAt: createdAt.toISOString(),
      },
    },
  };
}

const DetailsTable = styled.table`
  width: 100%;
  float: left;
  border-spacing: 60px 0px;
  margin-left: 5%;
`;

const ImageContainer = styled.div`
  float: left;
  margin-left: 20%;
  margin-right: 3%;
  margin-top: 1%;
`;

const DetailsArea = styled.div`
  background: lightgray;
  border-radius: 30px;
  float: left;
  margin-top: 2%;
`;

const DispoList = styled.ul`
  margin-left: -10%;
`;

const BackButt = styled.button`
  display: inline-block;
  padding: 0.8em;
  border: 0.16em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: black;
  text-align: center;
  transition: all 0.15s;
  border-radius: 30px;
  background: white;
  &:hover,
  &:focus,
  &:active {
    color: #0070f3;
    border-color: #0070f3;
  }
`;

const ButtonContainer = styled.div`
  margin-left: 15%;
  margin-bottom: -5%;
  margin-top: 3%;
`;

// eslint-disable-next-line no-unused-vars
export default function Profile({ profile }) {
  const router = useRouter();
  var today = new Date();
  var dob = new Date(profile.dob);
  var age = today.getFullYear() - dob.getFullYear();
  var m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  var creation_date = new Date(profile.createdAt).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
  // Return profile detail component here and pass profile as props
  return (
    <>
      <ButtonContainer>
        <BackButt onClick={() => router.back()}>
          <BiArrowBack size={42} />
        </BackButt>
      </ButtonContainer>
      <center>
        <ImageContainer>
          <ProfileImage
            name={profile.image}
            alt={profile.name}
            height={650}
            width={650}
          />
        </ImageContainer>
        <DetailsArea>
          <h1>{profile.name}</h1>
          <DetailsTable>
            <tr>
              <td>
                <h3>Age</h3>
              </td>
              <td>{age}</td>
            </tr>
            <tr>
              <td>
                <h3>DOB</h3>
              </td>
              <td>{dob.toLocaleDateString("en-US", { timeZone: "UTC" })}</td>
            </tr>
            <tr>
              <td>
                <h3>Type</h3>
              </td>
              <td>{profile.type}</td>
            </tr>
            <tr>
              <td>
                <h3>Breed</h3>
              </td>
              <td>{profile.breed}</td>
            </tr>
            <tr>
              <td>
                <h3>Availability</h3>
              </td>
              <td>{profile.availability}</td>
            </tr>
            <tr>
              <td>
                <h3>Profile Created</h3>
              </td>
              <td>{creation_date}</td>
            </tr>
            <tr>
              <td>
                <h3>Dispositions</h3>
              </td>
              <td>
                <DispoList>
                  {profile.dispositions.map((disposition) => (
                    <li key={disposition}>{disposition}</li>
                  ))}
                </DispoList>
              </td>
            </tr>
            <tr>
              <td>
                <h3>About</h3>
              </td>
              <td>{profile.description}</td>
            </tr>
          </DetailsTable>
        </DetailsArea>
      </center>
    </>
  );
}

Profile.propTypes = {
  profile: PropTypes.object,
};
