import { AdminNavbar } from "~/components/admin";
import { withAdminSession } from "~/session";

export const getServerSideProps = withAdminSession();

export default function Index() {
  return <AdminNavbar />;
}
