import { getAllSurahInfos } from '@/lib/quran-data';
import { SurahListClient } from '@/components/quran/surah-list-client';

export default function SurahsPage() {
  const surahs = getAllSurahInfos();

  return (
    <div className="pb-8">
      <h1 className="text-3xl font-headline font-bold mb-6">Surahs</h1>
      <SurahListClient surahs={surahs} />
    </div>
  );
}
