import Link from "next/link";
import PropTypes from "prop-types";
import { getFavoritesByUserId } from "~/repositories/favorites";
import { getSessionUser } from "~/session";
import styled from "styled-components";

export async function getServerSideProps(context) {
  const user = await getSessionUser(context);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      favorites: await getFavoritesByUserId(user.id),
    },
  };
}

const LinkList = styled.ul`
  margin-left: 22%;
  margin-right: 35%;
  list-style: none;
`;

const LinkListContainer = styled.div`
  background: lightgray;
  margin-right: 45%;
  margin-left: 45%;
  border-radius: 5px;
  padding-top: 1px;
  @media screen and (max-width: 1147px) {
    padding-right: 11%;
  }
  @media screen and (max-width: 812px) {
    padding-right: 32%;
    margin-right: 20%;
    margin-left: 20%;
  }
  @media screen and (max-width: 1024px) {
    margin-right: 30%;
    margin-left: 30%;
    padding-left: 1%;
  }
`;

const LinkListItem = styled.li`
  border-bottom: 1px solid black;
  margin-right: -130%;
  margin-left: -130%;
  @media screen and (max-width: 383px) {
    margin-right: -1000%;
    margin-left: -1000%;
  }
`;

const NameHeader = styled.a`
  &:hover {
    color: #0070f3;
    border-color: #0070f3;
  }
`;

export default function Account({ favorites }) {
  console.log(favorites);
  return (
    <>
      <center>
        <h1>Favorites</h1>
        <p>Click to view your favorited profiles</p>
      </center>
      <LinkListContainer>
        <LinkList>
          {favorites.map((favorite) => (
            <LinkListItem key={favorite.id}>
              <Link href={`/profiles/${favorite.profile.id}`} passHref>
                <NameHeader>
                  <h3>{favorite.profile.name}</h3>
                </NameHeader>
              </Link>
            </LinkListItem>
          ))}
        </LinkList>
      </LinkListContainer>
    </>
  );
}

Account.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object),
};
