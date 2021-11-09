import styles from "~/components/layout.module.css";
import { getAllProfiles, getProfilesSearch } from "~/lib/profile";

export const getServerSideProps = async () => {
  const profileAll = await getAllProfiles();
  const profileDogs = await getProfilesSearch("dog", null, null, null);
  const profileCats = await getProfilesSearch("cat", null, null, null);
  const profileOther = await getProfilesSearch("other", null, null, null);
  const profileCorgi = await getProfilesSearch(null, "Corgi", null, null);
  const profileDisposition = await getProfilesSearch(
    null,
    null,
    "Good with children",
    null
  );
  const profileAvailability = await getProfilesSearch(
    null,
    null,
    null,
    "Available"
  );

  return {
    props: {
      profileAll,
      profileDogs,
      profileCats,
      profileOther,
      profileCorgi,
      profileDisposition,
      profileAvailability,
    },
  };
};

export const getDisplay = (profile) => {
  return profile.map((item) => {
    return (
      <div key={item.id} className={styles.section}>
        <div className={styles.news_item}>
          <div className={styles.align_center}>
            <div>{item.description}</div>
            <div className={styles.section}>{item.pic}</div>
          </div>
        </div>
      </div>
    );
  });
};

export default function Profiles({
  profileAll,
  profileDogs,
  profileCats,
  profileOther,
  profileCorgi,
  profileDisposition,
  profileAvailability,
}) {
  const profileAllDisplay = getDisplay(profileAll);
  const profileDogsDisplay = getDisplay(profileDogs);
  const profileCatsDisplay = getDisplay(profileCats);
  const profileOtherDisplay = getDisplay(profileOther);
  const profileCorgiDisplay = getDisplay(profileCorgi);
  const profileDispositionDisplay = getDisplay(profileDisposition);
  const profileAvailabilityDisplay = getDisplay(profileAvailability);

  return (
    <div className={styles.section}>
      <div>
        <h1>Profiles</h1>
        <div>{profileAllDisplay}</div>
        <div>{profileDogsDisplay}</div>
        <div>{profileCatsDisplay}</div>
        <div>{profileOtherDisplay}</div>
        <div>{profileCorgiDisplay}</div>
        <div>{profileDispositionDisplay}</div>
        <div>{profileAvailabilityDisplay}</div>
      </div>
    </div>
  );
}
