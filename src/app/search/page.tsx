import { getEvents } from "@/lib/data-service";
import SearchResultsPage from "./search";
export default async function SearchPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Events</h1>
        {/* You can integrate your SearchResultsPage component here */}
        <SearchResultsPage events={events} />
      </main>
    </div>
  );
}