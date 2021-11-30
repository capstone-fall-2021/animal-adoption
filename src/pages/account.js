import Link from "next/link";
import PropTypes from "prop-types";
import { getFavoritesByUserId } from "~/repositories/favorites";
import { getSessionUser } from "~/session";

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

export default function Account({ favorites }) {
  return (
    <>
      <h1>Favorites</h1>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <Link href={`/profiles/${favorite.profile.id}`}>
              <a>{favorite.profile.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

Account.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object),
};
