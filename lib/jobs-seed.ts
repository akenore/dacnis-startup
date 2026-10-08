import type { Job } from "@/lib/jobs";

/**
 * Offers written into the careers store the first time it is created (empty DATA_DIR).
 * After that, offers are managed from /dashboard and this file is never read again.
 */
export const seedJobs: Job[] = [
  {
    id: "fullstack-intern-2027",
    slug: { en: "full-stack-web-developer-intern", fr: "stage-developpeur-web-full-stack" },
    employmentType: "INTERN",
    workplace: "hybrid",
    datePosted: "2026-10-08",
    validThrough: "2027-01-31",
    content: {
      en: {
        title: "Full-Stack Web Developer Intern (Next.js)",
        summary:
          "Join the Dacnis engineering team in Sousse for your end-of-studies internship and ship production features on client websites built with Next.js, React and TypeScript.",
        duration: "4 to 6 months, end-of-studies project (PFE), starting February 2027",
        responsibilities: [
          "Build pages and components with Next.js (App Router), React and Tailwind CSS",
          "Write API routes and connect forms, databases and third-party services",
          "Apply technical SEO: metadata, structured data, Core Web Vitals",
          "Take part in code reviews and weekly planning with senior developers",
        ],
        requirements: [
          "Final-year student in software engineering, computer science or a related degree",
          "Solid JavaScript or TypeScript and good knowledge of React",
          "Comfortable with Git and the command line",
          "Able to read technical documentation in English and to work in French",
        ],
        niceToHave: ["A personal project or GitHub profile to show", "Experience with Node.js, PostgreSQL or Docker"],
        offer: [
          "Real projects for real clients, deployed to production",
          "Mentoring by a senior developer and a supervised PFE report",
          "Hybrid work from our Sousse office",
          "Possibility of a job offer at the end of the internship",
        ],
      },
      fr: {
        title: "Stagiaire Développeur Web Full-Stack (Next.js)",
        summary:
          "Rejoignez l'équipe technique de Dacnis à Sousse pour votre stage de fin d'études et livrez des fonctionnalités en production sur des sites clients construits avec Next.js, React et TypeScript.",
        duration: "4 à 6 mois, projet de fin d'études (PFE), à partir de février 2027",
        responsibilities: [
          "Développer des pages et des composants avec Next.js (App Router), React et Tailwind CSS",
          "Écrire des routes d'API et connecter formulaires, bases de données et services tiers",
          "Appliquer le SEO technique : métadonnées, données structurées, Core Web Vitals",
          "Participer aux revues de code et à la planification hebdomadaire avec les développeurs seniors",
        ],
        requirements: [
          "Étudiant(e) en dernière année d'ingénierie logicielle, d'informatique ou d'un diplôme équivalent",
          "Bonne maîtrise de JavaScript ou TypeScript et bonne connaissance de React",
          "À l'aise avec Git et la ligne de commande",
          "Capable de lire une documentation technique en anglais et de travailler en français",
        ],
        niceToHave: ["Un projet personnel ou un profil GitHub à présenter", "Une expérience avec Node.js, PostgreSQL ou Docker"],
        offer: [
          "De vrais projets pour de vrais clients, mis en production",
          "Un encadrement par un développeur senior et un rapport de PFE suivi",
          "Travail hybride depuis nos bureaux de Sousse",
          "Possibilité d'embauche à la fin du stage",
        ],
      },
    },
  },
  {
    id: "mobile-intern-2027",
    slug: { en: "mobile-app-developer-intern", fr: "stage-developpeur-mobile" },
    employmentType: "INTERN",
    workplace: "hybrid",
    datePosted: "2026-10-08",
    validThrough: "2027-01-31",
    content: {
      en: {
        title: "Mobile App Developer Intern (Flutter / React Native)",
        summary:
          "Work on FielMedina, our offline travel guide to Tunisia's old medinas, and on client mobile apps for iOS and Android.",
        duration: "4 to 6 months, end-of-studies project (PFE), starting February 2027",
        responsibilities: [
          "Develop screens and features for iOS and Android apps",
          "Work with offline storage, maps and location features",
          "Connect apps to REST APIs and handle authentication",
          "Test builds on real devices and prepare store releases",
        ],
        requirements: [
          "Final-year student in software engineering, computer science or a related degree",
          "A first experience with Flutter, React Native, Swift or Kotlin",
          "Understanding of REST APIs and JSON",
          "Curious, autonomous and careful with details",
        ],
        niceToHave: ["An app published on the App Store or Google Play", "Experience with Firebase or SQLite"],
        offer: [
          "Contribute to an app used by travellers across Tunisia",
          "Mentoring by a senior developer and a supervised PFE report",
          "Hybrid work from our Sousse office",
          "Possibility of a job offer at the end of the internship",
        ],
      },
      fr: {
        title: "Stagiaire Développeur Mobile (Flutter / React Native)",
        summary:
          "Travaillez sur FielMedina, notre guide de voyage hors ligne des médinas tunisiennes, et sur les applications mobiles iOS et Android de nos clients.",
        duration: "4 à 6 mois, projet de fin d'études (PFE), à partir de février 2027",
        responsibilities: [
          "Développer des écrans et des fonctionnalités pour des applications iOS et Android",
          "Travailler sur le stockage hors ligne, les cartes et la géolocalisation",
          "Connecter les applications à des API REST et gérer l'authentification",
          "Tester les versions sur de vrais appareils et préparer les publications sur les stores",
        ],
        requirements: [
          "Étudiant(e) en dernière année d'ingénierie logicielle, d'informatique ou d'un diplôme équivalent",
          "Une première expérience avec Flutter, React Native, Swift ou Kotlin",
          "Compréhension des API REST et du format JSON",
          "Curieux(se), autonome et attentif(ve) aux détails",
        ],
        niceToHave: ["Une application publiée sur l'App Store ou Google Play", "Une expérience avec Firebase ou SQLite"],
        offer: [
          "Contribuer à une application utilisée par des voyageurs dans toute la Tunisie",
          "Un encadrement par un développeur senior et un rapport de PFE suivi",
          "Travail hybride depuis nos bureaux de Sousse",
          "Possibilité d'embauche à la fin du stage",
        ],
      },
    },
  },
];
