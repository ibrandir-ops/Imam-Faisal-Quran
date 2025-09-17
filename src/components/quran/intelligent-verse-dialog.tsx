'use client';
import { useState, useEffect } from 'react';
import { intelligentVerseSuggestion, IntelligentVerseSuggestionOutput } from '@/ai/flows/intelligent-verse-suggestion';
import type { Verse } from '@/lib/quran-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verse: Verse;
  surahName: string;
};

export function IntelligentVerseDialog({ open, onOpenChange, verse, surahName }: Props) {
  const [data, setData] = useState<IntelligentVerseSuggestionOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      const getSuggestions = async () => {
        setLoading(true);
        setError(null);
        setData(null);
        try {
          const result = await intelligentVerseSuggestion({
            verseText: verse.translation,
            surahName: surahName,
            verseNumber: verse.verse_number,
          });
          setData(result);
        } catch (e) {
          setError('Failed to get suggestions. Please try again later.');
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      getSuggestions();
    }
  }, [open, verse, surahName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Insights for {surahName} {verse.verse_key}</DialogTitle>
          <DialogDescription>
            Getting deeper understanding powered by Generative AI.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto pr-2">
          {loading && <LoadingSkeleton />}
          {error && <ErrorAlert message={error} />}
          {data && (
             <Accordion type="single" collapsible defaultValue="context" className="w-full">
              <AccordionItem value="context">
                <AccordionTrigger>Context</AccordionTrigger>
                <AccordionContent>
                  {data.context}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="reflections">
                <AccordionTrigger>Reflections</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {data.reflections.map((reflection, i) => <li key={i}>{reflection}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="related-verses">
                <AccordionTrigger>Related Verses</AccordionTrigger>
                <AccordionContent>
                   <ul className="list-disc pl-6 space-y-2">
                    {data.relatedVerses.map((relatedVerse, i) => <li key={i}>{relatedVerse}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
    </div>
    <Skeleton className="h-10 w-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[90%]" />
    </div>
  </div>
);

const ErrorAlert = ({ message }: { message: string }) => (
  <Alert variant="destructive">
    <Terminal className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);
