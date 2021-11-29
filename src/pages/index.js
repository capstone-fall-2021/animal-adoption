import { getSession } from "next-auth/client";
import PropTypes from "prop-types";
import { ProfileSearch } from "~/components/profiles";
import { NewUserLanding } from "~/components/users";
import { findDispositions } from "~/repositories/dispositions";
import { findTypes } from "~/repositories/types";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const isLoggedIn = session !== null;

  if (!isLoggedIn) {
    return {
      props: {
        isLoggedIn,
      },
    };
  }

  const [types, dispositions] = await Promise.all([
    findTypes(),
    findDispositions(),
  ]);

  return {
    props: {
      isLoggedIn,
      types,
      dispositions,
    },
  };
}

export default function Home({ isLoggedIn, types, dispositions }) {
  if (!isLoggedIn) {
    return <NewUserLanding />;
  }

  return <ProfileSearch types={types} dispositions={dispositions} />;
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  types: PropTypes.arrayOf(PropTypes.object),
  dispositions: PropTypes.arrayOf(PropTypes.object),
};
