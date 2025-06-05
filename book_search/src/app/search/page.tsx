import ResultTable from "@/app/components/resultTable";
import SearchGroup from "../components/searchGroup";

export default async function SearchPage() {
  return(
    <>
        <div>
            <SearchGroup/>
            <ResultTable>
            </ResultTable> 
        </div>
    </>
    )
}