import PropTypes from "prop-types";
import { ProfileSearch } from "~/components/profiles";
import { findDispositions } from "~/repositories/dispositions";
import { findTypes } from "~/repositories/types";

export async function getServerSideProps() {
  const [types, dispositions] = await Promise.all([
    findTypes(),
    findDispositions(),
  ]);

  return {
    props: {
      types,
      dispositions,
    },
  };
}

export default function Home({ types, dispositions }) {
  return <ProfileSearch types={types} dispositions={dispositions} />;
}

Home.propTypes = {
  types: PropTypes.arrayOf(PropTypes.object),
  dispositions: PropTypes.arrayOf(PropTypes.object),
};
