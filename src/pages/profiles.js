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

  const profileDogCorgiAvailabilityDisposition = await getProfilesSearch(
    "dog",
    "Corgi",
    "Good with children",
    "Available"
  );

  const profileDogCorgiDisposition = await getProfilesSearch(
    "dog",
    "Corgi",
    "Good with children",
    null
  );

  const profileDogCorgiAvailability = await getProfilesSearch(
    "dog",
    "Corgi",
    null,
    "Available"
  );

  const profileDogDispositionAvailability = await getProfilesSearch(
    "dog",
    null,
    "Good with children",
    "Available"
  );

  const profileCorgiAvailabilityDisposition = await getProfilesSearch(
    null,
    "Corgi",
    "Good with children",
    "Available"
  );

  const profileDogCorgi = await getProfilesSearch("dog", "Corgi", null, null);

  const profileDogAvailability = await getProfilesSearch(
    "dog",
    null,
    null,
    "Available"
  );

  const profileDogDisposition = await getProfilesSearch(
    "dog",
    null,
    "Good with children",
    null
  );

  const profileCorgiAvailability = await getProfilesSearch(
    null,
    "Corgi",
    null,
    "Available"
  );

  const profileCorgiDisposition = await getProfilesSearch(
    null,
    "Corgi",
    "Good with children",
    null
  );

  const profileAvailabilityDisposition = await getProfilesSearch(
    null,
    null,
    "Good with children",
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
      profileDogCorgiAvailabilityDisposition,
      profileDogCorgiDisposition,
      profileDogCorgiAvailability,
      profileDogDispositionAvailability,
      profileCorgiAvailabilityDisposition,
      profileDogCorgi,
      profileDogAvailability,
      profileDogDisposition,
      profileCorgiAvailability,
      profileCorgiDisposition,
      profileAvailabilityDisposition,
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
  profileDogCorgiAvailabilityDisposition,
  profileDogCorgiDisposition,
  profileDogCorgiAvailability,
  profileDogDispositionAvailability,
  profileCorgiAvailabilityDisposition,
  profileDogCorgi,
  profileDogAvailability,
  profileDogDisposition,
  profileCorgiAvailability,
  profileCorgiDisposition,
  profileAvailabilityDisposition,
}) {
  const profileAllDisplay = getDisplay(profileAll);
  const profileDogsDisplay = getDisplay(profileDogs);
  const profileCatsDisplay = getDisplay(profileCats);
  const profileOtherDisplay = getDisplay(profileOther);
  const profileCorgiDisplay = getDisplay(profileCorgi);
  const profileDispositionDisplay = getDisplay(profileDisposition);
  const profileAvailabilityDisplay = getDisplay(profileAvailability);
  const profileDogCorgiAvailabilityDispositionDisplay = getDisplay(
    profileDogCorgiAvailabilityDisposition
  );
  const profileDogCorgiDispositionDisplay = getDisplay(
    profileDogCorgiDisposition
  );
  const profileDogCorgiAvailabilityDisplay = getDisplay(
    profileDogCorgiAvailability
  );
  const profileDogDispositionAvailabilityDisplay = getDisplay(
    profileDogDispositionAvailability
  );
  const profileCorgiAvailabilityDispositionDisplay = getDisplay(
    profileCorgiAvailabilityDisposition
  );
  const profileDogCorgiDisplay = getDisplay(profileDogCorgi);
  const profileDogAvailabilityDisplay = getDisplay(profileDogAvailability);
  const profileDogDispositionDisplay = getDisplay(profileDogDisposition);
  const profileCorgiAvailabilityDisplay = getDisplay(profileCorgiAvailability);
  const profileCorgiDispositionDisplay = getDisplay(profileCorgiDisposition);
  const profileAvailabilityDispositionDisplay = getDisplay(
    profileAvailabilityDisposition
  );

  return (
    <div className={styles.section}>
      <div>
        <h1>Profiles</h1>
        <div className={styles.section}>
          <h1>Display All</h1>
          {profileAllDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display Dogs</h1>
          {profileDogsDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display Cats</h1>
          {profileCatsDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display Other</h1>
          {profileOtherDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display Corgis</h1>
          {profileCorgiDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display Good with children</h1>
          {profileDispositionDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display Available</h1>
          {profileAvailabilityDisplay}
        </div>
        <div className={styles.section}>
          <h1>
            Display dogs, that are Corgis, that are good with children, and are
            Available
          </h1>
          {profileDogCorgiAvailabilityDispositionDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display dogs, that are Corgis, and are good with children</h1>
          {profileDogCorgiDispositionDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display dogs, that are Corgis, and are Available</h1>
          {profileDogCorgiAvailabilityDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display dogs, that are good with children, and Available</h1>
          {profileDogDispositionAvailabilityDisplay}
        </div>
        <div className={styles.section}>
          <h1>
            Display Corgis, that are good with children, and are Available
          </h1>
          {profileCorgiAvailabilityDispositionDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display dogs and are Corgis</h1>
          {profileDogCorgiDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display dogs and are Available</h1>
          {profileDogAvailabilityDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display dogs and are good with children</h1>
          {profileDogDispositionDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display Corgis and are Available</h1>
          {profileCorgiAvailabilityDisplay}
        </div>
        <div className={styles.section}>
          <h1>Display Corgis and are good with children</h1>
          {profileCorgiDispositionDisplay}
        </div>
        <div className={styles.section}>
          <h1>
            Display dogs animals that are good with children and are Available
          </h1>
          {profileAvailabilityDispositionDisplay}
        </div>
      </div>
    </div>
  );
}
