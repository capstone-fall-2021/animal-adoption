import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { BreedList } from "~/components/breeds";
import { findBreedsByTypeId } from "~/repositories/breeds";
import { getTypeByName } from "~/repositories/types";
import { withAdminSession } from "~/session";

export const getServerSideProps = withAdminSession(async (context) => {
  const type = await getTypeByName(context.query.type);

  if (!type) {
    return { notFound: true };
  }

  return {
    props: {
      type: type.name,
      breeds: await findBreedsByTypeId(type.id),
    },
  };
});

export default function Types({ type, breeds }) {
  const router = useRouter();

  function handleNewBreedClick(event) {
    event.preventDefault();
    router.push(`/admin/types/${type}/breeds/new`);
  }

  return (
    <div>
      <h1>Type: {type}</h1>
      <button onClick={handleNewBreedClick}>New Breed</button>
      <BreedList type={type} breeds={breeds} />
    </div>
  );
}

Types.propTypes = {
  type: PropTypes.string,
  breeds: PropTypes.arrayOf(PropTypes.object),
};
