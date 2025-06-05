import ResultList from "@/app/components/resultList";
import SearchGroup from "../components/searchGroup";

export default async function SearchPage() {
  return(
    <>
        <div>
            <SearchGroup/>
            <ResultList>
            </ResultList> 
        </div>
    </>
    )
}