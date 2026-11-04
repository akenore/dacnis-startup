import type { Job } from "@/lib/jobs";

/**
 * Offers shipped with the code. Each one is added to the careers store once, on the first start
 * after it appears here (lib/server/careers.ts tracks which ids were already added). After that
 * it is managed in /dashboard like any other offer: deleting it there does not bring it back.
 * The usual way to post an offer stays the dashboard; use this file only to ship one with a deploy.
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
  {
    id: "ai-trainer-2026",
    slug: { en: "ai-engineer-corporate-trainer", fr: "ingenieur-ia-formateur-entreprise" },
    employmentType: "FULL_TIME",
    workplace: "hybrid",
    datePosted: "2026-11-04",
    validThrough: "2026-12-31",
    content: {
      en: {
        title: "AI Engineer and Corporate Trainer",
        summary:
          "Design and deliver hands-on artificial intelligence training for our client companies, from executive workshops to technical bootcamps on generative AI, large language models and automation.",
        responsibilities: [
          "Design training programmes on generative AI, LLMs, prompt engineering, RAG and AI automation, adapted to each company's sector and level",
          "Run workshops and courses at client sites, at our Sousse office and online, in French and English",
          "Build practical exercises and demos on real business cases: document processing, customer support, reporting",
          "Assess participants and measure what each training changes in their work",
          "Keep course material current with new models and tools (OpenAI, Gemini, Claude, open-source models)",
          "Bring your engineering skills to Dacnis AI integration projects between trainings",
        ],
        requirements: [
          "Engineering or master's degree in computer science, data science or artificial intelligence",
          "At least 2 years of hands-on experience building machine learning or LLM-based applications (Python, APIs, RAG)",
          "Proven experience teaching, training or presenting to professional audiences",
          "Fluent French and good English, with the ability to explain technical topics to non-technical people",
          "Willing to travel to client sites across Tunisia",
        ],
        niceToHave: [
          "A trainer certification or previous work with a training centre",
          "Experience with Microsoft Copilot, Power Automate, n8n or Make",
          "Arabic, for some client sessions",
        ],
        offer: [
          "A full-time role in a growing software and AI team",
          "Varied training missions with companies from many sectors",
          "Time and budget to learn new AI tools and earn certifications",
          "Hybrid work from our Sousse office",
        ],
      },
      fr: {
        title: "Ingénieur IA et Formateur en Entreprise",
        summary:
          "Concevez et animez des formations pratiques en intelligence artificielle pour nos entreprises clientes, des ateliers pour dirigeants aux bootcamps techniques sur l'IA générative, les grands modèles de langage et l'automatisation.",
        responsibilities: [
          "Concevoir des programmes de formation sur l'IA générative, les LLM, le prompt engineering, le RAG et l'automatisation, adaptés au secteur et au niveau de chaque entreprise",
          "Animer des ateliers et des formations chez nos clients, dans nos bureaux de Sousse et en ligne, en français et en anglais",
          "Créer des exercices et des démonstrations sur des cas métier réels : traitement de documents, support client, reporting",
          "Évaluer les participants et mesurer ce que chaque formation change dans leur travail",
          "Tenir les supports à jour avec les nouveaux modèles et outils (OpenAI, Gemini, Claude, modèles open source)",
          "Mettre vos compétences d'ingénieur au service des projets d'intégration IA de Dacnis entre deux formations",
        ],
        requirements: [
          "Diplôme d'ingénieur ou master en informatique, data science ou intelligence artificielle",
          "Au moins 2 ans d'expérience pratique dans le développement d'applications de machine learning ou à base de LLM (Python, API, RAG)",
          "Une expérience avérée d'enseignement, de formation ou de présentation devant un public professionnel",
          "Français courant et bon anglais, avec la capacité d'expliquer des sujets techniques à des non-spécialistes",
          "Disponible pour des déplacements chez nos clients dans toute la Tunisie",
        ],
        niceToHave: [
          "Une certification de formateur ou une expérience avec un centre de formation",
          "Une expérience avec Microsoft Copilot, Power Automate, n8n ou Make",
          "L'arabe, pour certaines sessions clients",
        ],
        offer: [
          "Un poste à temps plein dans une équipe logicielle et IA en pleine croissance",
          "Des missions de formation variées auprès d'entreprises de nombreux secteurs",
          "Du temps et un budget pour apprendre de nouveaux outils d'IA et passer des certifications",
          "Travail hybride depuis nos bureaux de Sousse",
        ],
      },
    },
  },
];
