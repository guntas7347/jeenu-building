import QueriesClient from "./QueriesClient";
import { getAllQueries } from "@/lib/firebase/services";

export default async function AdminQueriesPage() {
  const queries = await getAllQueries();

  return <QueriesClient initialQueries={queries} />;
}
