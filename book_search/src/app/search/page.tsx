import ResultList from "@/app/components/resultList";
import SearchGroup from "../components/searchGroup";

export default async function SearchPage() {
  return(
    <>
        <div>
            <SearchGroup/>
            <h1>Results</h1>
            <ResultList>
            </ResultList> 
        </div>
    </>
    )
}