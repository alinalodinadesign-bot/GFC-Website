/* Shared content + photography URLs for GFC site. */

const U = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const PH = {
  hero:           "1490481651871-ab68de25d43d",
  fds:            "1539109136881-3be0616acf4b",
  futureIdols:    "1485217988980-11786ced9454",
  showcase:       "1483721310020-03333e577078",
  beauty:         "1492707892479-7bc8d5a4ee93",
  leaders:        "1503342217505-b0a15ec3261c",
  event:          "1469334031218-e382a71b716b",
  g_runway1:      "1539109136881-3be0616acf4b",
  g_backstage1:   "1492707892479-7bc8d5a4ee93",
  g_casting1:     "1503342217505-b0a15ec3261c",
  g_awards1:      "1496440737103-cd596325d314",
  g_atmosphere1:  "1483985988355-763728e1935b",
  g_interview1:   "1485217988980-11786ced9454",
  g_runway2:      "1469334031218-e382a71b716b",
  g_backstage2:   "1490481651871-ab68de25d43d",
  g_atmosphere2:  "1483721310020-03333e577078",
};

export const GFC_DATA = {
  hero: {
    poster: U(PH.hero, 2000),
  },

  projects: [
    {
      id: "fashion-discovery-stage",
      number: "01",
      name: "Fashion Discovery Stage",
      subtitle: "The launching ground for emerging talent.",
      tagline: "A flagship platform — new faces, new designers, new direction.",
      forWho: "Models · Designers · Stylists · Agencies",
      location: "Batumi · Tbilisi · Istanbul",
      year: "2024 — present",
      hero: U(PH.fds, 2000),
      thumb: U(PH.fds, 1200),
      receive: [
        { n: "01", t: "International castings", d: "Direct presentation to scouting agents from Paris, Milan, Tokyo, Seoul and New York." },
        { n: "02", t: "Industry placement", d: "Selected participants signed to partner agencies on the closing night." },
        { n: "03", t: "Editorial coverage", d: "Full editorial photo and video portfolio shot during the show week." },
        { n: "04", t: "Workshops", d: "Three days of intensive training with international tutors and creative directors." },
      ],
    },
    {
      id: "future-idols",
      number: "02",
      name: "Future Idols",
      subtitle: "A casting platform for the next generation.",
      tagline: "Talent under twenty-five — print, runway, campaign, screen.",
      forWho: "Models 16–25 · Performers · Faces",
      location: "International tour",
      year: "2025 season",
      hero: U(PH.futureIdols, 2000),
      thumb: U(PH.futureIdols, 1200),
      receive: [
        { n: "01", t: "Open castings", d: "Live castings in eight cities across Europe and the Caucasus." },
        { n: "02", t: "Mentorship", d: "Six-week mentorship by working directors and casting agents." },
        { n: "03", t: "Portfolio", d: "Studio test, video reel and runway tape — produced in-house." },
        { n: "04", t: "Career placement", d: "Top fifteen presented to industry decision-makers at season finale." },
      ],
    },
    {
      id: "global-fashion-showcase",
      number: "03",
      name: "Global Fashion Showcase",
      subtitle: "Where international fashion meets local industries.",
      tagline: "A bi-annual showcase pairing established houses with emerging studios.",
      forWho: "Designers · Houses · Press · Buyers",
      location: "Annual — rotating capitals",
      year: "Since 2022",
      hero: U(PH.showcase, 2000),
      thumb: U(PH.showcase, 1200),
      receive: [
        { n: "01", t: "Runway slot", d: "Curated runway slot at the showcase main stage with full production." },
        { n: "02", t: "Press exposure", d: "International press list — print, digital, broadcast." },
        { n: "03", t: "Trade buyer access", d: "Pre-showcase trade room with vetted boutique and department buyers." },
      ],
    },
    {
      id: "beauty-idols",
      number: "04",
      name: "Beauty Idols",
      subtitle: "A beauty-led casting and conference programme.",
      tagline: "For the artists, faces and brands defining contemporary beauty.",
      forWho: "Makeup Artists · Faces · Beauty Editors",
      location: "Tbilisi · Paris",
      year: "Annual",
      hero: U(PH.beauty, 2000),
      thumb: U(PH.beauty, 1200),
      receive: [
        { n: "01", t: "Editorial shoot", d: "Two-day editorial shoot with rotating creative directors and stylists." },
        { n: "02", t: "Conference", d: "Talks and panels with senior beauty editors and house representatives." },
        { n: "03", t: "Pro contacts", d: "Direct introductions to beauty desks at international magazines." },
      ],
    },
    {
      id: "leaders-intensive",
      number: "05",
      name: "Leaders Intensive",
      subtitle: "An executive programme for the next industry leaders.",
      tagline: "Brand, business and creative direction — taught by people who run it.",
      forWho: "Founders · Directors · Senior creatives",
      location: "Closed cohort",
      year: "Twice yearly",
      hero: U(PH.leaders, 2000),
      thumb: U(PH.leaders, 1200),
      receive: [
        { n: "01", t: "Eight-week cohort", d: "Closed cohort of twenty-five, eight intensive weeks." },
        { n: "02", t: "Founder sessions", d: "Working sessions with founders of agencies, houses and platforms." },
        { n: "03", t: "Business clinic", d: "One-on-one operational and creative clinics with industry advisers." },
      ],
    },
  ],

  event: {
    title: "Fashion Discovery Stage",
    place: "Batumi · Georgia",
    date: "7 — 9 May 2026",
    poster: "/images/event/event-poster.jpg",
    categories: [
      { n: "01", l: "Runway Shows" },
      { n: "02", l: "International Castings" },
      { n: "03", l: "Fashion Conference" },
      { n: "04", l: "Workshops" },
      { n: "05", l: "Awards" },
    ],
  },

  gallery: [
    { cat: "Runway",    src: U(PH.g_runway1, 1200), title: "Closing walk", year: "Fall 24", mono: true },
    { cat: "Backstage", src: U(PH.g_backstage1, 1200), title: "Backstage", year: "Fall 24", mono: true },
    { cat: "Castings",  src: U(PH.g_casting1, 1200), title: "Casting 04", year: "May 25", mono: false },
    { cat: "Awards",    src: U(PH.g_awards1, 1200), title: "Awards stage", year: "Spring 25", mono: true },
    { cat: "Atmosphere",src: U(PH.g_atmosphere1, 1600), title: "Atmosphere", year: "May 25", mono: true, video: true },
    { cat: "Interviews",src: U(PH.g_interview1, 1200), title: "Conference talk", year: "May 25", mono: false, video: true },
    { cat: "Runway",    src: U(PH.g_runway2, 1200), title: "Show 02", year: "Fall 24", mono: true },
    { cat: "Backstage", src: U(PH.g_backstage2, 1200), title: "Final fittings", year: "Spring 25", mono: false },
    { cat: "Atmosphere",src: U(PH.g_atmosphere2, 1200), title: "Front row", year: "Fall 24", mono: true },
  ],

  partners: [
    { title: "Agencies", n: "01", names: ["MAJOR ATELIER", "VIVIENNE / KIM", "FORM BUREAU", "STUDIO NORTH", "MAISON ARRO", "OST AGENCY"] },
    { title: "Media",    n: "02", names: ["MODE", "L'OBSERVÉ", "ORBIT", "CONTRA", "FROM PARIS", "QUARTERLY"] },
    { title: "Beauty Partners", n: "03", names: ["ÉCLAT", "MAISON 7", "BÉL—", "ROUGE EDIT", "NU LAB", "GRAY HOUSE"] },
    { title: "Sponsors", n: "04", names: ["MŪN", "ALTITUDE", "ZONE 5", "PALAIS GROUP", "AMARO", "BLANCO"] },
  ],

  roles: [
    { id: "model", label: "Model" },
    { id: "agency", label: "Agency" },
    { id: "designer", label: "Designer" },
    { id: "photographer", label: "Photographer" },
    { id: "makeup", label: "Makeup Artist" },
    { id: "stylist", label: "Stylist" },
    { id: "sponsor", label: "Sponsor / Partner" },
    { id: "media", label: "Media" },
  ],
};
