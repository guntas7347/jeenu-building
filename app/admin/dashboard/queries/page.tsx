import QueriesClient from "./QueriesClient";

export default async function AdminQueriesPage() {
  // const queries = await getAllQueries();
  const queries: any = [];

  return <QueriesClient initialQueries={queries} />;
}
