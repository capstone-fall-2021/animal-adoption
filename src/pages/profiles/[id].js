import { getSession } from "next-auth/client";
import PropTypes from "prop-types";
import { findProfileById } from "~/repositories/profiles";

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

  return {
    props: {
      profile: await findProfileById(context.query.id),
    },
  };
}

// eslint-disable-next-line no-unused-vars
export default function Profile({ profile }) {
  // Return profile detail component here and pass profile as props
  return null;
}

Profile.propTypes = {
  profile: PropTypes.object,
};
