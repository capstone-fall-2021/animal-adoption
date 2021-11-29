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

// eslint-disable-next-line no-unused-vars
export default function Profile({ profile }) {
  // Return profile detail component here and pass profile as props
  return null;
}

Profile.propTypes = {
  profile: PropTypes.object,
};
