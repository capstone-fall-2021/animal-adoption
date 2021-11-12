import styles from "~/components/layout.module.css";
import { getProfiles } from "~/lib/profile";

export const getServerSideProps = async () => {
  const profileAll = await getProfiles();
  const profileDogs = await getProfiles({ type: "dog" });
  const profileCats = await getProfiles({ type: "cat" });
  const profileOther = await getProfiles({ type: "other" });
  const profileCorgi = await getProfiles({ breed: "Corgi" });
  const profileDisposition = await getProfiles({
    disposition: "Good with children",
  });
  const profileAvailability = await getProfiles({ availability: "Available" });

  const profileDogCorgiAvailabilityDisposition = await getProfiles({
    type: "dog",
    breed: "Corgi",
    disposition: "Good with children",
    availability: "Available",
  });

  const profileDogCorgiDisposition = await getProfiles({
    type: "dog",
    breed: "Corgi",
    disposition: "Good with children",
  });

  const profileDogCorgiAvailability = await getProfiles({
    type: "dog",
    breed: "Corgi",
    availability: "Available",
  });

  const profileDogDispositionAvailability = await getProfiles({
    type: "dog",
    disposition: "Good with children",
    availability: "Available",
  });

  const profileCorgiAvailabilityDisposition = await getProfiles({
    breed: "Corgi",
    disposition: "Good with children",
    availability: "Available",
  });

  const profileDogCorgi = await getProfiles({ type: "dog", breed: "Corgi" });

  const profileDogAvailability = await getProfiles({
    type: "dog",
    availability: "Available",
  });

  const profileDogDisposition = await getProfiles({
    type: "dog",
    disposition: "Good with children",
  });

  const profileCorgiAvailability = await getProfiles({
    breed: "Corgi",
    availability: "Available",
  });

  const profileCorgiDisposition = await getProfiles({
    breed: "Corgi",
    disposition: "Good with children",
  });

  const profileAvailabilityDisposition = await getProfiles({
    disposition: "Good with children",
    availability: "Available",
  });

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
