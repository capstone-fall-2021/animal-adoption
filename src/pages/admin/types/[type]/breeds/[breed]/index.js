import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { AdminNavbar } from "~/components/admin";
import { ProfileTable } from "~/components/profiles";
import { findAvailabilities } from "~/repositories/availabilities";
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

  const [availabilities, profiles] = await Promise.all([
    findAvailabilities(),
    findProfilesByBreedId(breed.id),
  ]);

  return {
    props: {
      type: type.name,
      breed: breed.name,
      availabilities,
      profiles,
    },
  };
});

export default function Breeds({ type, breed, availabilities, profiles }) {
  const router = useRouter();

  function handleNewProfileClick(event) {
    event.preventDefault();
    router.push(`/admin/types/${type}/breeds/${breed}/profiles/new`);
  }

  return (
    <div>
      <center>
        <AdminNavbar />
        <h1>Breed: {breed}</h1>
        <h2>Profiles</h2>
        <button onClick={handleNewProfileClick}>New Profile</button>
        <ProfileTable
          type={type}
          breed={breed}
          availabilities={availabilities}
          profiles={profiles}
        />
      </center>
    </div>
  );
}

Breeds.propTypes = {
  type: PropTypes.string,
  breed: PropTypes.string,
  profiles: PropTypes.arrayOf(PropTypes.object),
  availabilities: PropTypes.arrayOf(PropTypes.object),
};
