import type { Locale } from "@/lib/i18n";

export type Loc = Record<Locale, string>;
export type LocList = Record<Locale, string[]>;

export type ProjectSection = {
  heading: Loc;
  body: Loc;
  points?: LocList;
};

export type Project = {
  slug: string;
  /** glow / accent color */
  accent: string;
  /** card + hero cover */
  cover: string;
  /** render the gallery as phone frames */
  phoneGallery?: boolean;
  gallery: string[];
  year: string;
  title: string;
  tag: Loc;
  role: Loc;
  client: Loc;
  /** short blurb used on the home card */
  summary: Loc;
  /** long intro paragraph on the detail page */
  intro: Loc;
  tech: string[];
  link: { href: string; label: Loc };
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "alverniaplanet",
    accent: "#1C61D6",
    cover: "/projects/alverniaplanet-kino360.jpg",
    gallery: ["/projects/alverniaplanet-kino360.jpg", "/projects/alverniaplanet-mars.jpg"],
    year: "2025 — teraz",
    title: "alverniaplanet.com",
    tag: { pl: "Strona WWW", en: "Website" },
    role: { pl: "Administracja, rozwój i optymalizacja", en: "Administration, growth & optimization" },
    client: { pl: "Alvernia Planet", en: "Alvernia Planet" },
    summary: {
      pl: "Oficjalna strona parku rozrywki filmowej — atrakcje, bilety, wydarzenia. Stała opieka i rozwój serwisu.",
      en: "Official website of the film entertainment park — attractions, tickets, events. Ongoing care and growth.",
    },
    intro: {
      pl: "Alvernia Planet to jeden z największych parków rozrywki filmowej w Europie. Odpowiadam za rozwój i utrzymanie jego strony internetowej — od wyglądu i wydajności, przez treści, po przygotowanie pod sprzedaż biletów i obsługę ruchu w sezonie.",
      en: "Alvernia Planet is one of the largest film entertainment parks in Europe. I'm responsible for the growth and maintenance of its website — from look and performance, through content, to ticket sales readiness and handling seasonal traffic.",
    },
    tech: ["Next.js", "TypeScript", "SEO", "Hosting", "CMS"],
    link: { href: "https://alverniaplanet.com", label: { pl: "Otwórz stronę", en: "Open website" } },
    sections: [
      {
        heading: { pl: "Wyzwanie", en: "The challenge" },
        body: {
          pl: "Park potrzebuje strony, która sprzedaje wrażenia: szybko się ładuje, dobrze wygląda na telefonie i prowadzi gościa od atrakcji prosto do zakupu biletu. Do tego treści zmieniają się sezonowo, więc edycja musi być wygodna.",
          en: "The park needs a site that sells experiences: loads fast, looks great on mobile and guides the visitor from attractions straight to a ticket purchase. Content also changes seasonally, so editing has to be effortless.",
        },
      },
      {
        heading: { pl: "Co zrobiłem", en: "What I did" },
        body: {
          pl: "Pracuję nad frontendem, wydajnością i strukturą serwisu, dbam o spójność wizualną i przygotowanie pod SEO oraz wygodną administrację treści.",
          en: "I work on the frontend, performance and structure of the site, keep the visuals consistent and prepare it for SEO and convenient content administration.",
        },
        points: {
          pl: [
            "Responsywny interfejs dopasowany do desktopu i telefonu",
            "Optymalizacja szybkości ładowania kluczowych podstron",
            "Przygotowanie struktury pod pozycjonowanie w Google",
            "Wygodna edycja treści i obsługa sezonowych zmian",
          ],
          en: [
            "Responsive interface tuned for desktop and mobile",
            "Speed optimization of key landing pages",
            "Structure prepared for Google ranking",
            "Convenient content editing and seasonal updates",
          ],
        },
      },
      {
        heading: { pl: "Efekt", en: "The result" },
        body: {
          pl: "Nowoczesny wizerunek online i stabilna baza, która rośnie razem z parkiem — gotowa na nowe atrakcje, wydarzenia i ruch w szczycie sezonu.",
          en: "A modern online image and a stable base that grows with the park — ready for new attractions, events and peak-season traffic.",
        },
      },
    ],
  },
  {
    slug: "marsapp",
    accent: "#C44B2A",
    cover: "/projects/marsapp-icon-2.png",
    phoneGallery: true,
    gallery: ["/projects/marsapp-start.jpg", "/projects/marsapp-stacje.jpg", "/projects/marsapp-film.jpg"],
    year: "2026",
    title: "MarsApp",
    tag: { pl: "Aplikacja iOS", en: "iOS app" },
    role: { pl: "Aplikacja mobilna i montaż wideo", en: "Mobile app & video editing" },
    client: { pl: "Alvernia Planet", en: "Alvernia Planet" },
    summary: {
      pl: "Aplikacja, która zamienia nagrania gości w gotowy film z misji na Marsie — od green screenu po finalny montaż w telefonie.",
      en: "An app that turns visitors' recordings into a finished Mars mission movie — from green screen to final edit on the phone.",
    },
    intro: {
      pl: "MarsApp (Mars Video) zamienia każdego gościa Alvernia Planet w marsjańskiego odkrywcę. Nagrania i zdjęcia z parku trafiają na stacje misji, a aplikacja składa z nich epicki film — z intrem, muzyką i podmianą zielonego tła na marsjańską scenerię. Cały montaż dzieje się na telefonie.",
      en: "MarsApp (Mars Video) turns every Alvernia Planet visitor into a Mars explorer. Recordings and photos from the park land on mission stations, and the app assembles them into an epic movie — with an intro, music and green-screen replacement with a Martian scenery. The whole edit happens on the phone.",
    },
    tech: ["iOS", "Wideo na urządzeniu", "Chroma key", "App Store"],
    link: {
      href: "https://apps.apple.com/pl/app/marsapp/id6775477060",
      label: { pl: "Zobacz w App Store", en: "View on App Store" },
    },
    sections: [
      {
        heading: { pl: "Wyzwanie", en: "The challenge" },
        body: {
          pl: "Z surowych nagrań na zielonym tle zrobić gotowy, kinowy film — szybko, bezpiecznie i tak prosto, żeby poradziło sobie dziecko. Wszystko musi działać offline, na telefonie gościa.",
          en: "Turn raw green-screen footage into a finished, cinematic movie — fast, safe and simple enough for a child to handle. Everything has to work offline, on the visitor's phone.",
        },
      },
      {
        heading: { pl: "Jak to działa", en: "How it works" },
        body: {
          pl: "Gość wybiera stacje misji i dodaje do nich własne klipy. Aplikacja podmienia zielone tło na marsjańską scenerię, pozwala skadrować najlepsze 2,5 sekundy każdego ujęcia i składa całość z intrem oraz muzyką.",
          en: "The guest picks mission stations and adds their own clips. The app replaces the green background with a Martian scenery, lets them trim the best 2.5 seconds of each shot and assembles everything with an intro and music.",
        },
        points: {
          pl: [
            "Stacje misji: Siła, Woda, Łazik, Baza, Kosmos i więcej",
            "Automatyczna podmiana zielonego tła (chroma key)",
            "Kadrowanie klipów suwakiem — najlepsze 2,5 sekundy",
            "Intro, muzyka i profesjonalne złożenie filmu",
            "Cały montaż na urządzeniu — szybko i bezpiecznie",
          ],
          en: [
            "Mission stations: Strength, Water, Rover, Base, Space and more",
            "Automatic green-screen replacement (chroma key)",
            "Clip trimming with a slider — the best 2.5 seconds",
            "Intro, music and professional movie assembly",
            "Entire edit on the device — fast and safe",
          ],
        },
      },
      {
        heading: { pl: "Efekt", en: "The result" },
        body: {
          pl: "Aplikacja jest w App Store. Goście wychodzą z parku z gotowym filmem z własnej misji na Marsie — niezapomnianą pamiątką, którą od razu mogą pokazać znajomym.",
          en: "The app is on the App Store. Guests leave the park with a finished movie of their own Mars mission — an unforgettable souvenir they can share right away.",
        },
      },
    ],
  },
  {
    slug: "tadzik28",
    accent: "#6364C7",
    cover: "/projects/tadzik28.jpg",
    gallery: ["/projects/tadzik28.jpg"],
    year: "2025",
    title: "tadzik28.pl",
    tag: { pl: "Gra 2D", en: "2D game" },
    role: { pl: "Projekt i kod gry", en: "Game design & code" },
    client: { pl: "Projekt personalny", en: "Personal project" },
    summary: {
      pl: "Przeglądarkowa gra 2D w stylu pixel art z personalizowanymi bohaterami — dowód, że gra może być świetnym prezentem.",
      en: "A pixel-art 2D browser game with personalized characters — proof that a game can make a great gift.",
    },
    intro: {
      pl: "tadzik28.pl to przeglądarkowa gra 2D w klimacie pixel art, w której bohaterami są konkretne, prawdziwe osoby. Powstała jako spersonalizowany prezent — i najlepiej pokazuje, że gra nie musi być wielkim produktem, żeby robić wrażenie.",
      en: "tadzik28.pl is a pixel-art 2D browser game where the heroes are specific, real people. It was made as a personalized gift — and it best shows that a game doesn't have to be a huge product to make an impression.",
    },
    tech: ["Gra 2D", "Pixel art", "Web / przeglądarka", "Gameplay"],
    link: { href: "https://tadzik28.pl", label: { pl: "Zagraj online", en: "Play online" } },
    sections: [
      {
        heading: { pl: "Pomysł", en: "The idea" },
        body: {
          pl: "Zrobić grę, w której gracz i jego znajomi są postaciami — z własnym klimatem, humorem i fabułą. Wszystko działa w przeglądarce, bez instalacji, więc wystarczy wysłać link.",
          en: "Make a game where the player and their friends are the characters — with their own vibe, humor and story. It all runs in the browser, no install, so you just send a link.",
        },
      },
      {
        heading: { pl: "Co zrobiłem", en: "What I did" },
        body: {
          pl: "Zaprojektowałem rozgrywkę, grafikę w stylu pixel art i całą logikę gry. Bohaterowie i świat są w pełni spersonalizowani pod konkretną historię.",
          en: "I designed the gameplay, the pixel-art graphics and all the game logic. The characters and the world are fully personalized to a specific story.",
        },
        points: {
          pl: [
            "Spersonalizowani bohaterowie i świat gry",
            "Grafika i animacje w stylu pixel art",
            "Logika rozgrywki i interakcje",
            "Działa prosto z przeglądarki — bez instalacji",
          ],
          en: [
            "Personalized characters and game world",
            "Pixel-art graphics and animations",
            "Gameplay logic and interactions",
            "Runs straight from the browser — no install",
          ],
        },
      },
      {
        heading: { pl: "Efekt", en: "The result" },
        body: {
          pl: "Grywalna gra dostępna online — i konkretny dowód, że spersonalizowana gra 2D to nietypowy, zapadający w pamięć prezent.",
          en: "A playable game available online — and concrete proof that a personalized 2D game is an unusual, memorable gift.",
        },
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
