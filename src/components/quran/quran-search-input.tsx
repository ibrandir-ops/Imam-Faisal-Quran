'use client';

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export function QuranSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuery = formData.get('q') as string;
    if (newQuery) {
      router.push(`/search?q=${encodeURIComponent(newQuery)}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          name="q"
          placeholder="Search Quran..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  )
}
