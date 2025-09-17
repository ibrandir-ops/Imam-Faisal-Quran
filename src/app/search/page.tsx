import { QuranSearch } from "@/components/quran/quran-search";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <div className="pb-8">
      <h1 className="text-3xl font-headline font-bold mb-6">Search Quran</h1>
      <Suspense>
        <QuranSearch />
      </Suspense>
    </div>
  );
}
