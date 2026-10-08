import type { Locale } from "@/lib/i18n";
import type { ServiceKey } from "@/lib/routes";
import { frenchSpacing } from "@/lib/typography";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceContent {
  title: string;
  short: string;
  long: string;
  features: string[];
  process: { title: string; description: string }[];
  faqs: FaqItem[];
}

export type ServiceIcon = "Globe" | "Smartphone" | "Cpu" | "ShieldAlert" | "Search" | "Megaphone";

export interface Service {
  icon: ServiceIcon;
  /** Tailwind gradient classes for the icon badge. */
  theme: string;
  accent: string;
  techStack: string[];
  content: Record<Locale, ServiceContent>;
}

const serviceData: Record<ServiceKey, Service> = {
  web: {
    icon: "Globe",
    theme: "from-blue-500 via-indigo-500 to-purple-600",
    accent: "#4f46e5",
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "Vercel"],
    content: {
      en: {
        title: "Web Development",
        short: "Fast, secure and search-ready websites and web applications built with Next.js and React.",
        long: "Dacnis builds custom websites and web applications in Sousse, Tunisia, for clients in Tunisia and abroad. We use Next.js, React and TypeScript to ship sites that load fast, rank well and stay easy to maintain, from company websites and online stores to business platforms with their own back office.",
        features: [
          "Custom Next.js and React websites and web applications",
          "Headless CMS setups (Sanity, Strapi, Contentful)",
          "E-commerce and marketplaces (Shopify, WooCommerce, Next.js Commerce)",
          "Progressive Web Apps (PWA) with offline support",
          "REST and GraphQL APIs and third-party integrations",
          "Bilingual and multilingual sites (French, English, Arabic)",
        ],
        process: [
          { title: "Discovery and architecture", description: "We map your goals, users and content, then choose the right architecture." },
          { title: "UI and UX design", description: "Wireframes, then high-fidelity designs and interactive prototypes." },
          { title: "Development and testing", description: "Clean, typed code with automated tests on every critical flow." },
          { title: "Performance tuning", description: "Core Web Vitals (LCP, INP, CLS) tuned for speed and search rankings." },
          { title: "Launch and CI/CD", description: "Production deployment with continuous integration and monitoring." },
        ],
        faqs: [
          { question: "Which technologies does Dacnis use to build websites?", answer: "We mainly build with Next.js, React and TypeScript on the front end, and Node.js or serverless functions on the back end. This stack gives fast pages, strong SEO and code that is easy to maintain." },
          { question: "Do you build e-commerce websites in Tunisia?", answer: "Yes. We build online stores and marketplaces, such as Sepat Express, a marketplace for handmade Tunisian crafts, with cash on delivery and local delivery options." },
          { question: "Will my website work on mobile?", answer: "Yes. Every site is designed mobile first and tested on phones, tablets and desktops before launch." },
        ],
      },
      fr: {
        title: "Développement Web",
        short: "Sites et applications web rapides, sécurisés et optimisés pour le référencement, construits avec Next.js et React.",
        long: "Dacnis conçoit des sites et des applications web sur mesure à Sousse, en Tunisie, pour des clients en Tunisie et à l'international. Nous utilisons Next.js, React et TypeScript pour livrer des sites rapides, bien référencés et faciles à maintenir : sites vitrines, boutiques en ligne ou plateformes métier avec leur propre back-office.",
        features: [
          "Sites et applications web sur mesure avec Next.js et React",
          "Architectures headless CMS (Sanity, Strapi, Contentful)",
          "E-commerce et marketplaces (Shopify, WooCommerce, Next.js Commerce)",
          "Progressive Web Apps (PWA) avec mode hors ligne",
          "API REST et GraphQL et intégrations de services tiers",
          "Sites bilingues et multilingues (français, anglais, arabe)",
        ],
        process: [
          { title: "Cadrage et architecture", description: "Nous définissons vos objectifs, vos utilisateurs et vos contenus, puis l'architecture adaptée." },
          { title: "Design UI et UX", description: "Wireframes, maquettes haute fidélité et prototypes interactifs." },
          { title: "Développement et tests", description: "Un code propre et typé, avec des tests automatisés sur chaque parcours critique." },
          { title: "Optimisation des performances", description: "Core Web Vitals (LCP, INP, CLS) optimisés pour la vitesse et le référencement." },
          { title: "Mise en ligne et CI/CD", description: "Déploiement en production avec intégration continue et supervision." },
        ],
        faqs: [
          { question: "Quelles technologies Dacnis utilise-t-elle pour créer des sites web ?", answer: "Nous travaillons principalement avec Next.js, React et TypeScript côté front-end, et Node.js ou des fonctions serverless côté back-end. Cette stack offre des pages rapides, un bon référencement et un code facile à maintenir." },
          { question: "Créez-vous des sites e-commerce en Tunisie ?", answer: "Oui. Nous réalisons des boutiques en ligne et des marketplaces, comme Sepat Express, une marketplace d'artisanat tunisien fait main, avec paiement à la livraison et livraison locale." },
          { question: "Mon site sera-t-il adapté au mobile ?", answer: "Oui. Chaque site est conçu d'abord pour le mobile et testé sur téléphone, tablette et ordinateur avant sa mise en ligne." },
        ],
      },
    },
  },
  mobile: {
    icon: "Smartphone",
    theme: "from-purple-500 via-pink-500 to-red-500",
    accent: "#ec4899",
    techStack: ["Swift", "SwiftUI", "Kotlin", "Flutter", "React Native", "Firebase", "App Store Connect"],
    content: {
      en: {
        title: "Mobile Development",
        short: "Native and cross-platform iOS and Android apps. Creators of the FielMedina app.",
        long: "Dacnis designs and builds iOS and Android apps, native or cross-platform. We created FielMedina, an offline travel guide to Tunisia's old medinas with offline maps, audio stories and places verified by locals, live in Tunis, Sousse, Sidi Bou Saïd, Monastir and Yasmine Hammamet.",
        features: [
          "Native iOS development (Swift, SwiftUI)",
          "Native Android development (Kotlin, Jetpack Compose)",
          "Cross-platform apps (Flutter, React Native)",
          "Offline maps, geolocation and local databases",
          "Device features: camera, biometrics, Bluetooth, notifications",
          "App Store and Google Play publishing and updates",
        ],
        process: [
          { title: "Strategy and wireframes", description: "User flows, key screens and platform-specific UX guidelines." },
          { title: "Mobile UI design", description: "Interfaces that follow iOS and Android design conventions." },
          { title: "App development", description: "Core features, local storage, API connections and offline mode." },
          { title: "QA and beta testing", description: "TestFlight and Google Play beta tracks, tested on real devices." },
          { title: "Store launch", description: "Store listings, review guidelines, release and follow-up updates." },
        ],
        faqs: [
          { question: "What is the FielMedina app?", answer: "FielMedina is an offline travel guide to the old medinas of Tunisia, with offline maps, audio stories and places verified by locals. Dacnis designed, built and maintains it for iOS and Android." },
          { question: "Should I choose a native or a cross-platform app?", answer: "Native apps (Swift, Kotlin) give the best performance and deepest device access. Cross-platform apps (Flutter, React Native) ship to iOS and Android from one code base, which lowers cost and delivery time. We recommend one after reviewing your features and budget." },
          { question: "Can a mobile app work without internet?", answer: "Yes. We store data on the device with SQLite, Realm or Core Data and sync it when the connection returns, as FielMedina does for its maps." },
        ],
      },
      fr: {
        title: "Développement Mobile",
        short: "Applications iOS et Android natives et multiplateformes. Créateurs de l'application FielMedina.",
        long: "Dacnis conçoit et développe des applications iOS et Android, natives ou multiplateformes. Nous avons créé FielMedina, un guide de voyage hors ligne des médinas tunisiennes avec cartes hors ligne, histoires audio et lieux vérifiés par des habitants, disponible à Tunis, Sousse, Sidi Bou Saïd, Monastir et Yasmine Hammamet.",
        features: [
          "Développement iOS natif (Swift, SwiftUI)",
          "Développement Android natif (Kotlin, Jetpack Compose)",
          "Applications multiplateformes (Flutter, React Native)",
          "Cartes hors ligne, géolocalisation et bases de données locales",
          "Fonctions de l'appareil : caméra, biométrie, Bluetooth, notifications",
          "Publication et mises à jour sur l'App Store et Google Play",
        ],
        process: [
          { title: "Stratégie et wireframes", description: "Parcours utilisateurs, écrans clés et règles UX propres à chaque plateforme." },
          { title: "Design UI mobile", description: "Des interfaces conformes aux conventions iOS et Android." },
          { title: "Développement", description: "Fonctionnalités principales, stockage local, connexion aux API et mode hors ligne." },
          { title: "Tests et bêta", description: "Pistes bêta TestFlight et Google Play, tests sur appareils réels." },
          { title: "Publication sur les stores", description: "Fiches store, respect des règles de validation, publication et mises à jour." },
        ],
        faqs: [
          { question: "Qu'est-ce que l'application FielMedina ?", answer: "FielMedina est un guide de voyage hors ligne des médinas de Tunisie, avec cartes hors ligne, histoires audio et lieux vérifiés par des habitants. Dacnis l'a conçue, développée et la maintient sur iOS et Android." },
          { question: "Faut-il choisir une application native ou multiplateforme ?", answer: "Une application native (Swift, Kotlin) offre les meilleures performances et un accès complet à l'appareil. Une application multiplateforme (Flutter, React Native) sort sur iOS et Android avec un seul code, ce qui réduit le coût et les délais. Nous recommandons l'une ou l'autre après étude de vos fonctionnalités et de votre budget." },
          { question: "Une application mobile peut-elle fonctionner sans internet ?", answer: "Oui. Nous stockons les données sur l'appareil avec SQLite, Realm ou Core Data et les synchronisons au retour de la connexion, comme le fait FielMedina pour ses cartes." },
        ],
      },
    },
  },
  ai: {
    icon: "Cpu",
    theme: "from-cyan-400 via-teal-500 to-emerald-600",
    accent: "#14b8a6",
    techStack: ["Python", "PyTorch", "TensorFlow", "OpenAI API", "Gemini API", "Claude API", "LangChain", "Pinecone"],
    content: {
      en: {
        title: "AI Integration",
        short: "LLM integrations, RAG assistants and AI automation built into your products and workflows.",
        long: "Dacnis integrates artificial intelligence into business software: chat assistants that answer from your own documents (RAG), document and email automation, semantic search and predictive analytics. We connect models such as GPT, Gemini and Claude to your data with privacy controls, so your information is never used to train public models.",
        features: [
          "Large language model (LLM) integration: GPT, Gemini, Claude",
          "Retrieval-augmented generation (RAG) on company knowledge",
          "Chatbots and customer support assistants",
          "Workflow and document automation",
          "Predictive analytics and business intelligence",
          "Computer vision and image processing pipelines",
        ],
        process: [
          { title: "Feasibility study", description: "We find where AI saves time or money and estimate the return." },
          { title: "Data preparation", description: "Cleaning, structuring and securing the data the model will use." },
          { title: "Model and prompt design", description: "Prompts, RAG pipelines or fine-tuning, chosen for the use case." },
          { title: "API and integration", description: "Back-end endpoints that connect the model to your apps." },
          { title: "Monitoring", description: "Tracking answer quality, cost and user feedback after launch." },
        ],
        faqs: [
          { question: "Can Dacnis integrate ChatGPT, Gemini or Claude into our product?", answer: "Yes. We integrate large language models with structured outputs for support assistants, content generation, document processing and semantic search." },
          { question: "How is our data protected when we use AI?", answer: "We use enterprise API settings that exclude your data from model training, keep processing inside defined cloud regions and, when needed, deploy open models on your own servers." },
          { question: "What is RAG (retrieval-augmented generation)?", answer: "RAG lets an AI model answer from your own manuals, databases or documents instead of general knowledge. It gives precise, sourced answers and greatly reduces made-up responses." },
        ],
      },
      fr: {
        title: "Intégration IA",
        short: "Intégration de LLM, assistants RAG et automatisation par l'IA dans vos produits et vos processus.",
        long: "Dacnis intègre l'intelligence artificielle dans les logiciels d'entreprise : assistants conversationnels qui répondent à partir de vos propres documents (RAG), automatisation des documents et des e-mails, recherche sémantique et analyse prédictive. Nous connectons des modèles comme GPT, Gemini et Claude à vos données avec des garanties de confidentialité : vos informations ne servent jamais à entraîner des modèles publics.",
        features: [
          "Intégration de grands modèles de langage (LLM) : GPT, Gemini, Claude",
          "Génération augmentée par la recherche (RAG) sur vos connaissances internes",
          "Chatbots et assistants de support client",
          "Automatisation des processus et des documents",
          "Analyse prédictive et business intelligence",
          "Vision par ordinateur et traitement d'images",
        ],
        process: [
          { title: "Étude de faisabilité", description: "Nous identifions où l'IA fait gagner du temps ou de l'argent et estimons le retour." },
          { title: "Préparation des données", description: "Nettoyage, structuration et sécurisation des données utilisées par le modèle." },
          { title: "Conception du modèle et des prompts", description: "Prompts, pipelines RAG ou fine-tuning, selon le cas d'usage." },
          { title: "API et intégration", description: "Des points d'accès back-end qui relient le modèle à vos applications." },
          { title: "Suivi", description: "Contrôle de la qualité des réponses, des coûts et des retours utilisateurs après la mise en ligne." },
        ],
        faqs: [
          { question: "Dacnis peut-elle intégrer ChatGPT, Gemini ou Claude à notre produit ?", answer: "Oui. Nous intégrons des grands modèles de langage avec des sorties structurées pour des assistants de support, la génération de contenu, le traitement de documents et la recherche sémantique." },
          { question: "Comment nos données sont-elles protégées avec l'IA ?", answer: "Nous utilisons des API professionnelles qui excluent vos données de l'entraînement des modèles, gardons les traitements dans des régions cloud définies et, si nécessaire, déployons des modèles ouverts sur vos propres serveurs." },
          { question: "Qu'est-ce que le RAG (génération augmentée par la recherche) ?", answer: "Le RAG permet à un modèle d'IA de répondre à partir de vos manuels, bases de données ou documents plutôt que de connaissances générales. Les réponses sont précises, sourcées et beaucoup moins sujettes aux inventions." },
        ],
      },
    },
  },
  security: {
    icon: "ShieldAlert",
    theme: "from-emerald-500 via-green-600 to-teal-700",
    accent: "#059669",
    techStack: ["Kali Linux", "Burp Suite", "OWASP ZAP", "SonarQube", "Snyk", "AWS IAM", "Cloudflare WAF"],
    content: {
      en: {
        title: "Cyber Security",
        short: "Security audits, penetration testing and secure code reviews for web and mobile applications.",
        long: "Dacnis audits and secures web and mobile applications: penetration testing, OWASP Top 10 reviews, secure code review and hardening of cloud access. For network, server and endpoint security we work with our partner IsTech, an IT security company in Sousse, so clients get application and infrastructure security from one team.",
        features: [
          "Web and mobile penetration testing (black box and grey box)",
          "Secure source code review and static and dynamic analysis",
          "OWASP Top 10 audits with remediation guides",
          "Identity and access management (IAM) design",
          "Web application firewall (WAF) and DDoS protection setup",
          "Compliance readiness (GDPR, ISO 27001, Tunisian INPDP)",
        ],
        process: [
          { title: "Threat modelling", description: "We list your assets and the ways an attacker could reach them." },
          { title: "Penetration testing", description: "Controlled attacks on your APIs, web and mobile apps." },
          { title: "Vulnerability report", description: "Each finding rated by severity (CVSS) with its business impact." },
          { title: "Remediation support", description: "We work with your developers to fix and patch every issue." },
          { title: "Verification audit", description: "A re-test confirms that every fix holds." },
        ],
        faqs: [
          { question: "What is the OWASP Top 10?", answer: "The OWASP Top 10 is the reference list of the most critical security risks for web applications, such as broken access control, injection and security misconfiguration. Our audits test against it." },
          { question: "How often should a company run a security audit?", answer: "We recommend a full penetration test at least once a year and after every major release of your application." },
          { question: "Can you review our code for security during development?", answer: "Yes. We add security checks to your Git workflow so vulnerabilities are caught before they reach production." },
        ],
      },
      fr: {
        title: "Cybersécurité",
        short: "Audits de sécurité, tests d'intrusion et revues de code sécurisé pour applications web et mobiles.",
        long: "Dacnis audite et sécurise les applications web et mobiles : tests d'intrusion, revues OWASP Top 10, revue de code sécurisé et durcissement des accès cloud. Pour la sécurité des réseaux, des serveurs et des postes, nous travaillons avec notre partenaire IsTech, entreprise de sécurité informatique à Sousse : nos clients bénéficient ainsi de la sécurité applicative et de la sécurité de l'infrastructure avec une seule équipe.",
        features: [
          "Tests d'intrusion web et mobile (boîte noire et boîte grise)",
          "Revue de code sécurisé et analyses statiques et dynamiques",
          "Audits OWASP Top 10 avec guides de correction",
          "Conception de la gestion des identités et des accès (IAM)",
          "Mise en place de pare-feu applicatif (WAF) et de protection DDoS",
          "Préparation à la conformité (RGPD, ISO 27001, INPDP)",
        ],
        process: [
          { title: "Modélisation des menaces", description: "Nous recensons vos actifs et les chemins qu'un attaquant pourrait emprunter." },
          { title: "Tests d'intrusion", description: "Des attaques contrôlées sur vos API et vos applications web et mobiles." },
          { title: "Rapport de vulnérabilités", description: "Chaque faille notée selon sa gravité (CVSS) avec son impact métier." },
          { title: "Accompagnement à la correction", description: "Nous travaillons avec vos développeurs pour corriger chaque problème." },
          { title: "Audit de vérification", description: "Un nouveau test confirme que chaque correctif tient." },
        ],
        faqs: [
          { question: "Qu'est-ce que l'OWASP Top 10 ?", answer: "L'OWASP Top 10 est la liste de référence des risques de sécurité les plus critiques pour les applications web, comme le contrôle d'accès défaillant, les injections et les mauvaises configurations. Nos audits s'appuient sur cette liste." },
          { question: "À quelle fréquence faut-il réaliser un audit de sécurité ?", answer: "Nous recommandons un test d'intrusion complet au moins une fois par an et après chaque version majeure de votre application." },
          { question: "Pouvez-vous vérifier la sécurité de notre code pendant le développement ?", answer: "Oui. Nous ajoutons des contrôles de sécurité à votre flux Git pour détecter les vulnérabilités avant la mise en production." },
        ],
      },
    },
  },
  seo: {
    icon: "Search",
    theme: "from-orange-500 via-amber-500 to-yellow-500",
    accent: "#f59e0b",
    techStack: ["Google Search Console", "Google Analytics 4", "Bing Webmaster Tools", "Ahrefs", "Semrush", "Screaming Frog", "Schema.org"],
    content: {
      en: {
        title: "SEO & GEO Optimization",
        short: "Technical SEO and generative engine optimization (GEO) so Google and AI assistants find and cite your business.",
        long: "Dacnis optimizes websites for search engines and for AI assistants. Technical SEO makes your pages fast, indexable and well structured for Google and Bing. Generative engine optimization (GEO) makes your content easy for ChatGPT, Gemini, Claude and Perplexity to read, trust and cite when people ask them for a recommendation.",
        features: [
          "Technical SEO audits: indexing, Core Web Vitals, site structure",
          "Generative engine optimization (GEO) and AI crawler access",
          "Structured data (JSON-LD) for organizations, services, FAQs and jobs",
          "llms.txt, sitemaps, robots.txt and canonical URL setup",
          "Bilingual SEO with hreflang (French and English)",
          "Local SEO for Tunisia and Google Business Profile",
        ],
        process: [
          { title: "SEO and GEO audit", description: "Indexing, errors, Core Web Vitals, rankings and AI visibility." },
          { title: "Technical fixes", description: "Metadata, images, scripts, HTML semantics and internal links." },
          { title: "Structured data", description: "JSON-LD that describes your company, services and pages to machines." },
          { title: "Content strategy", description: "Keyword research and clear, citable answers to your clients' questions." },
          { title: "Monitoring", description: "Rankings, clicks and mentions in AI answers, reviewed every month." },
        ],
        faqs: [
          { question: "What is generative engine optimization (GEO)?", answer: "GEO is the practice of structuring a website so AI assistants such as ChatGPT, Gemini, Claude and Perplexity can read it, understand it and cite it in their answers. It relies on clear facts, structured data, crawler access and files such as llms.txt." },
          { question: "Why does structured data matter for SEO?", answer: "Structured data (JSON-LD) tells search engines and AI systems exactly what a page describes: a company, a service, a job offer or a FAQ. It makes rich results and accurate AI citations more likely." },
          { question: "How long does SEO take to show results?", answer: "Technical fixes usually show within a few weeks, once pages are crawled again. Content and authority work generally takes three to six months." },
        ],
      },
      fr: {
        title: "Référencement SEO & GEO",
        short: "SEO technique et optimisation pour les moteurs génératifs (GEO) pour que Google et les assistants IA trouvent et citent votre entreprise.",
        long: "Dacnis optimise les sites web pour les moteurs de recherche et pour les assistants IA. Le SEO technique rend vos pages rapides, indexables et bien structurées pour Google et Bing. L'optimisation pour les moteurs génératifs (GEO) rend vos contenus faciles à lire, à vérifier et à citer par ChatGPT, Gemini, Claude et Perplexity lorsqu'on leur demande une recommandation.",
        features: [
          "Audits SEO techniques : indexation, Core Web Vitals, structure du site",
          "Optimisation pour les moteurs génératifs (GEO) et accès des robots IA",
          "Données structurées (JSON-LD) pour organisations, services, FAQ et offres d'emploi",
          "Mise en place de llms.txt, sitemaps, robots.txt et URL canoniques",
          "SEO bilingue avec hreflang (français et anglais)",
          "SEO local pour la Tunisie et fiche Google Business Profile",
        ],
        process: [
          { title: "Audit SEO et GEO", description: "Indexation, erreurs, Core Web Vitals, positions et visibilité dans l'IA." },
          { title: "Corrections techniques", description: "Métadonnées, images, scripts, sémantique HTML et maillage interne." },
          { title: "Données structurées", description: "Du JSON-LD qui décrit votre entreprise, vos services et vos pages aux machines." },
          { title: "Stratégie de contenu", description: "Recherche de mots-clés et réponses claires et citables aux questions de vos clients." },
          { title: "Suivi", description: "Positions, clics et mentions dans les réponses IA, analysés chaque mois." },
        ],
        faqs: [
          { question: "Qu'est-ce que l'optimisation pour les moteurs génératifs (GEO) ?", answer: "Le GEO consiste à structurer un site pour que les assistants IA comme ChatGPT, Gemini, Claude et Perplexity puissent le lire, le comprendre et le citer dans leurs réponses. Il repose sur des faits clairs, des données structurées, l'accès des robots et des fichiers comme llms.txt." },
          { question: "Pourquoi les données structurées comptent-elles pour le SEO ?", answer: "Les données structurées (JSON-LD) indiquent aux moteurs de recherche et aux systèmes d'IA ce que décrit exactement une page : une entreprise, un service, une offre d'emploi ou une FAQ. Elles favorisent les résultats enrichis et des citations exactes par l'IA." },
          { question: "Combien de temps faut-il pour voir les résultats du SEO ?", answer: "Les corrections techniques produisent en général leurs effets en quelques semaines, après un nouveau passage des robots. Le travail de contenu et de notoriété prend le plus souvent trois à six mois." },
        ],
      },
    },
  },
  marketing: {
    icon: "Megaphone",
    theme: "from-yellow-400 via-orange-500 to-red-600",
    accent: "#ea580c",
    techStack: ["Meta Business Suite", "Google Ads", "LinkedIn Ads", "Hotjar", "Mailchimp", "Figma", "Looker Studio"],
    content: {
      en: {
        title: "Digital Marketing",
        short: "Paid campaigns, social media, branding and conversion optimization that turn traffic into clients.",
        long: "Dacnis plans and runs digital marketing for Tunisian and international brands: Google, Meta and LinkedIn ad campaigns, social media content, branding and conversion rate optimization. For video content we work with our partner Mustache Prod, a production house in Sousse, so campaigns get professional films and commercials.",
        features: [
          "Paid advertising on Google, Meta (Facebook, Instagram) and LinkedIn",
          "Social media management and content creation",
          "Conversion rate optimization (CRO) and user behaviour analysis",
          "Brand identity and pitch decks",
          "Email marketing automation and sales funnels",
          "Marketing dashboards and reporting",
        ],
        process: [
          { title: "Audience analysis", description: "Buyer personas, local habits and the right channels." },
          { title: "Creative strategy", description: "Ad creatives, copy, video with Mustache Prod and tracking setup." },
          { title: "Launch and A/B tests", description: "Campaigns with split tests on copy, visuals and formats." },
          { title: "Conversion optimization", description: "Landing pages improved where visitors drop off." },
          { title: "Reporting", description: "Weekly results, budget allocation and recommendations." },
        ],
        faqs: [
          { question: "How do you measure the results of a campaign?", answer: "We install conversion tracking, events and UTM parameters, then report clicks, leads, sales and cost per acquisition in one dashboard." },
          { question: "Which marketing channels work best in Tunisia?", answer: "Facebook and Instagram reach the most consumers in Tunisia, LinkedIn works best for B2B, and Google Ads captures people already searching for your service." },
          { question: "What is conversion rate optimization (CRO)?", answer: "CRO improves your website so a larger share of visitors take action, such as sending a contact request or buying a product, without increasing your ad budget." },
        ],
      },
      fr: {
        title: "Marketing Digital",
        short: "Campagnes payantes, réseaux sociaux, image de marque et optimisation des conversions pour transformer le trafic en clients.",
        long: "Dacnis planifie et pilote le marketing digital de marques tunisiennes et internationales : campagnes Google, Meta et LinkedIn, contenus pour les réseaux sociaux, image de marque et optimisation du taux de conversion. Pour la vidéo, nous travaillons avec notre partenaire Mustache Prod, maison de production à Sousse : vos campagnes bénéficient de films et de spots professionnels.",
        features: [
          "Publicité sur Google, Meta (Facebook, Instagram) et LinkedIn",
          "Gestion des réseaux sociaux et création de contenu",
          "Optimisation du taux de conversion (CRO) et analyse du comportement",
          "Identité de marque et présentations commerciales",
          "Automatisation de l'e-mailing et tunnels de vente",
          "Tableaux de bord et reporting marketing",
        ],
        process: [
          { title: "Analyse de l'audience", description: "Personas, habitudes locales et choix des bons canaux." },
          { title: "Stratégie créative", description: "Visuels, textes, vidéo avec Mustache Prod et mise en place du suivi." },
          { title: "Lancement et tests A/B", description: "Campagnes avec tests sur les textes, les visuels et les formats." },
          { title: "Optimisation des conversions", description: "Pages d'atterrissage améliorées là où les visiteurs décrochent." },
          { title: "Reporting", description: "Résultats hebdomadaires, répartition du budget et recommandations." },
        ],
        faqs: [
          { question: "Comment mesurez-vous les résultats d'une campagne ?", answer: "Nous installons le suivi des conversions, des événements et des paramètres UTM, puis présentons clics, prospects, ventes et coût d'acquisition dans un seul tableau de bord." },
          { question: "Quels canaux marketing fonctionnent le mieux en Tunisie ?", answer: "Facebook et Instagram touchent le plus de consommateurs en Tunisie, LinkedIn est le plus efficace en B2B et Google Ads capte les personnes qui recherchent déjà votre service." },
          { question: "Qu'est-ce que l'optimisation du taux de conversion (CRO) ?", answer: "Le CRO améliore votre site pour qu'une plus grande part des visiteurs passe à l'action, par exemple envoyer une demande de contact ou acheter un produit, sans augmenter votre budget publicitaire." },
        ],
      },
    },
  },
};

export const services = Object.fromEntries(
  Object.entries(serviceData).map(([key, service]) => [key, { ...service, content: { ...service.content, fr: frenchSpacing(service.content.fr) } }]),
) as Record<ServiceKey, Service>;
