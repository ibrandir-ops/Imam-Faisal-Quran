import { getSurahById } from '@/lib/quran-data';
import { SurahView } from '@/components/quran/surah-view';
import { notFound } from 'next/navigation';

type SurahPageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: SurahPageProps) {
  const surahId = parseInt(params.id, 10);
  const surah = getSurahById(surahId);

  if (!surah) {
    return {
      title: 'Not Found'
    }
  }

  return {
    title: `Surah ${surah.name_simple} - Quran Companion`,
    description: `Read and listen to Surah ${surah.name_simple}, chapter ${surah.id} of the Holy Quran.`,
  }
}

export default function SurahPage({ params }: SurahPageProps) {
  const surahId = parseInt(params.id, 10);
  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    notFound();
  }
  const surah = getSurahById(surahId);

  if (!surah) {
    notFound();
  }

  return <SurahView surah={surah} />;
}
