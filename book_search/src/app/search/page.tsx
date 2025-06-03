import ResultList from "@/app/components/resultList";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const results = await searchParams;

  console.log(JSON.stringify(results));
  return(
    <>
        <h1>Results</h1>
        <ResultList params={searchParams}>
        </ResultList> 
    </>
    )
}