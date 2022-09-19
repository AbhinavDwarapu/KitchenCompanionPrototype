import type { GetStaticProps, NextPage } from "next";
import DatabasePage from "../../components/pages/debug/database";

const Database: NextPage = () => {
  return <DatabasePage />;
};

export default Database;

// export const getStaticProps: GetStaticProps = async () => {
//   if (process.env.NODE_ENV === "production") {
//     return { notFound: true };
//   }
//   return { props: {} };
// };
