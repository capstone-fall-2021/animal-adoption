import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { AdminNavbar } from "~/components/admin";
import { ProfileTable } from "~/components/profiles";
import { getBreedByName } from "~/repositories/breeds";
import { getTypeByName } from "~/repositories/types";
import { findProfilesByBreedId } from "~/repositories/profiles";
import { withAdminSession } from "~/session";

export const getServerSideProps = withAdminSession(async (context) => {
  const [type, breed] = await Promise.all([
    getTypeByName(context.query.type),
    getBreedByName(context.query.breed),
  ]);

  if (!type || !breed) {
    return { notFound: true };
  }

  return {
    props: {
      type: type.name,
      breed: breed.name,
      profiles: await findProfilesByBreedId(breed.id),
    },
  };
});

export default function Breeds({ type, breed, profiles }) {
  const router = useRouter();

  function handleNewProfileClick(event) {
    event.preventDefault();
    router.push(`/admin/types/${type}/breeds/${breed}/profiles/new`);
  }

  return (
    <div>
      <AdminNavbar />
      <h1>Breed: {breed}</h1>
      <button onClick={handleNewProfileClick}>New Profile</button>
      <ProfileTable profiles={profiles} />
    </div>
  );
}

Breeds.propTypes = {
  type: PropTypes.string,
  breed: PropTypes.string,
  profiles: PropTypes.arrayOf(PropTypes.object),
};
