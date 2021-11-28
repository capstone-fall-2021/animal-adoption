import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { TypeList } from "~/components/types";
import { findTypes } from "~/repositories/types";
import { withAdminSession } from "~/session";

export const getServerSideProps = withAdminSession(async () => {
  return {
    props: {
      types: await findTypes(),
    },
  };
});

export default function Types({ types }) {
  const router = useRouter();

  function handleNewTypeClick(event) {
    event.preventDefault();
    router.push("/admin/types/new");
  }

  return (
    <div>
      <h1>Types</h1>
      <button onClick={handleNewTypeClick}>New Type</button>
      <TypeList types={types} />
    </div>
  );
}

Types.propTypes = {
  types: PropTypes.arrayOf(PropTypes.object),
};
