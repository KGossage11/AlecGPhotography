// Portfolio component with paginated photo grid for performance
// Film entries remain fully rendered

import { useState, useMemo, useEffect } from "react";

type Category =
  | "all"
  | "wildlife"
  | "graduations"
  // | "portraits"
  // | "events"
  | "film";

interface Photo {
  id: string;
  src: string;
  category: Category;
}

interface Film {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

const PAGE_SIZE = 12;

const films: Film[] = [
  {
    id: "film-1",
    title: "Canned Peaches (2024) – Assistant Director / Cinematographer 2",
    description:
      "After developing an infatuation with a young Alexandria, grocery store clerk Sam decides to take his obsession to the next level.",
    link: "https://www.youtube.com/watch?v=Ppkrx4wch7k",
    image: "/src/film/canned_peaches.png",
  },
  {
    id: "film-2",
    title: "Recital Roses (2024) – Cinematographer",
    description:
      "After not making the cut for the school softball team, Ellie must train to throw a bouquet of roses on stage at her boyfriend’s recital.",
    link: "https://youtu.be/paOtzsLRa-s",
    image: "/src/film/recital_roses.png",
  },
  {
    id: "film-3",
    title: "We're Toast! (2023) – Cinematographer",
    description:
      "Two high school students turn a classroom toaster into an undercover business.",
    link: "https://youtu.be/UKOSHzntKSM",
    image: "/src/film/were_toast.png",
  },
];

const categories = [
  { id: "all" as Category, label: "All" },
  { id: "wildlife" as Category, label: "Wildlife" },
  { id: "graduations" as Category, label: "Graduations" },
  // { id: "portraits" as Category, label: "Portraits" },
  // { id: "events" as Category, label: "Events" },
  { id: "film" as Category, label: "Film" },
];

function FadeInImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      className={`w-full h-full object-cover contain-content transition-opacity duration-500 ${
        loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
      }`}
    />
  );
}

function loadPhotos(): Photo[] {
  const modules = import.meta.glob(
    "/src/assets/photos/{wildlife,graduations,portraits,events}/*.{jpg,jpeg,png,webp}",
    { eager: true }
  );

  return Object.entries(modules).map(([path, module]) => {
    const parts = path.split("/");
    const category = parts[parts.length - 2] as Category;

    return {
      id: path,
      src: (module as { default: string }).default,
      category,
    };
  });
}

const photos = loadPhotos();

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("all");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [selectedCategory]);

  const filteredPhotos = useMemo(() => {
    return selectedCategory === "all"
      ? photos
      : photos.filter(photo => photo.category === selectedCategory);
  }, [selectedCategory]);

  const pagedPhotos = useMemo(() => {
    const start = page * PAGE_SIZE;
    return filteredPhotos.slice(start, start + PAGE_SIZE);
  }, [filteredPhotos, page]);

  useEffect(() => {
    pagedPhotos.forEach(photo => {
      const img = new Image();
      img.src = photo.src;
    });
  }, [pagedPhotos]);

  const totalPages = Math.ceil(filteredPhotos.length / PAGE_SIZE);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">Portfolio</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore my collection of work across various photography styles
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory === "film" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {films.map(film => (
              <a
                key={film.id}
                href={film.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={film.image}
                    alt={film.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold mb-2">
                    {film.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {film.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pagedPhotos.map(photo => (
                <div
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <FadeInImage src={photo.src} alt="" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {page + 1} of {totalPages}
                </span>

                <button
                  disabled={page + 1 >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
