import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Heart, Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { VerseOfTheDay } from '@/components/quran/verse-of-the-day';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'home-hero');
  
  const quickLinks = [
    { title: 'Browse Surahs', href: '/surahs', icon: BookOpen, description: 'Explore all 114 chapters of the Quran.' },
    { title: 'Search Quran', href: '/search', icon: Search, description: 'Find verses by keyword or topic.' },
    { title: 'My Favorites', href: '/favorites', icon: Heart, description: 'Access your saved verses and bookmarks.' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-8">
      <section className="relative -mx-4 -mt-14 sm:-mx-6 sm:-mt-0 h-64 w-auto sm:rounded-lg overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl font-headline font-bold text-primary-foreground">Welcome to Quran Companion</h1>
          <p className="mt-2 text-lg text-primary-foreground/90">Your daily guide to the Holy Quran.</p>
        </div>
      </section>

      <VerseOfTheDay />

      <section>
        <h2 className="text-2xl font-headline font-semibold mb-4">Explore</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map(link => (
            <Card key={link.href} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{link.title}</CardTitle>
                <link.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <Button asChild variant="outline" size="sm">
                  <Link href={link.href}>
                    Go <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
