import { FavoritesList } from "@/components/quran/favorites-list";

export default function FavoritesPage() {
    return (
        <div className="pb-8">
            <h1 className="text-3xl font-headline font-bold mb-6">Favorites</h1>
            <FavoritesList />
        </div>
    );
}
