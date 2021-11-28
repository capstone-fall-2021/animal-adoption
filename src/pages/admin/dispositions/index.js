import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { DispositionList } from "~/components/dispositions";
import { findDispositions } from "~/repositories/dispositions";
import { withAdminSession } from "~/session";

export const getServerSideProps = withAdminSession(async () => {
  return {
    props: {
      dispositions: await findDispositions(),
    },
  };
});

export default function Dispositions({ dispositions }) {
  const router = useRouter();

  function handleNewDispositionClick(event) {
    event.preventDefault();
    router.push("/admin/dispositions/new");
  }

  return (
    <div>
      <h1>Dispositions</h1>
      <button onClick={handleNewDispositionClick}>New Disposition</button>
      <DispositionList dispositions={dispositions} />
    </div>
  );
}

Dispositions.propTypes = {
  dispositions: PropTypes.arrayOf(PropTypes.object),
};
