import ResultSection from "@/app/components/resultSection";
import SearchGroup from "../components/searchGroup";

export default async function SearchPage() {
  return(
    <>
        <div>
            <SearchGroup/>
            <ResultSection>
            </ResultSection> 
        </div>
    </>
    )
}