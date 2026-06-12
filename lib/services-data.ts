export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Service {
  title: string;
  slug: string;
  iconName: "Globe" | "Smartphone" | "Megaphone" | "Search" | "Cpu" | "ShieldAlert";
  shortDescription: string;
  longDescription: string;
  themeColor: string; // Tailwind gradient classes
  accentColor: string; // HEX color or tailwind color name
  features: string[];
  techStack: string[];
  process: ProcessStep[];
  faqs: FAQItem[];
}

export const servicesData: Service[] = [
  {
    title: "Web Development",
    slug: "web-development",
    iconName: "Globe",
    shortDescription: "Sleek, ultra-fast, and highly interactive custom web applications engineered with modern technologies.",
    longDescription: "We craft state-of-the-art web experiences that are not only visually spectacular but also engineered for maximum speed, security, and scalability. From interactive enterprise platforms to rich Jamstack architectures, we build web solutions that drive business transformation.",
    themeColor: "from-blue-500 via-indigo-500 to-purple-600",
    accentColor: "#4f46e5",
    features: [
      "Custom React & Next.js Single Page Applications (SPAs) and Multi-Page Sites",
      "Headless CMS Architectures (Sanity, Strapi, Contentful)",
      "High-Performance E-commerce Solutions (Shopify Custom, Next.js Commerce)",
      "Progressive Web Apps (PWAs) with offline capabilities",
      "API Integrations & Custom REST/GraphQL Backend Services",
      "Responsive Layouts and Tailwind CSS Styling"
    ],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "TailwindCSS", "PostgreSQL", "Vercel"],
    process: [
      { title: "Discovery & Architecture", description: "Analyzing your requirements, mapping user journeys, and setting up the system architecture." },
      { title: "UI/UX High-Fidelity Design", description: "Creating premium layouts, typography systems, and interactive prototypes." },
      { title: "Development & Testing", description: "Writing semantic, clean code with integrated unit, integration, and E2E testing." },
      { title: "Performance Optimization", description: "Optimizing Core Web Vitals (LCP, FID, CLS) for stellar speed and SEO ranking." },
      { title: "Launch & CI/CD Setup", description: "Deploying to production grade infrastructure with continuous integration and deployment pipelines." }
    ],
    faqs: [
      { question: "What is your main web development stack?", answer: "We primarily build with Next.js, React, and TypeScript on the frontend, and Node.js or Serverless backends, ensuring maximum speed, SEO, and maintainability." },
      { question: "Do you build custom e-commerce websites?", answer: "Yes, we build bespoke, headless e-commerce solutions that load instantly and convert better than standard template setups." },
      { question: "Will my website be mobile-friendly?", answer: "Absolutely. We follow a mobile-first responsive design strategy, ensuring a flawless user experience across all devices and screens." }
    ]
  },
  {
    title: "Mobile Development",
    slug: "mobile-development",
    iconName: "Smartphone",
    shortDescription: "Top-tier native and cross-platform mobile apps. Creators of the flagship Fielmedina App.",
    longDescription: "Dacnis is the proud creator of Fielmedina, the iOS and Android application that has set benchmarks for performance and local engagement. We design and build smooth, robust native and cross-platform apps with beautiful micro-animations and offline capabilities.",
    themeColor: "from-purple-500 via-pink-500 to-red-500",
    accentColor: "#ec4899",
    features: [
      "Native iOS Development (Swift, SwiftUI)",
      "Native Android Development (Kotlin, Jetpack Compose)",
      "Cross-Platform App Development (Flutter & React Native)",
      "Offline Map Systems and Geo-tracking Integration",
      "Hardware Integrations (Camera, Biometrics, Bluetooth)",
      "App Store & Google Play Store Submission & Lifecycle Management"
    ],
    techStack: ["Swift", "SwiftUI", "Kotlin", "React Native", "Flutter", "Firebase", "App Store Connect"],
    process: [
      { title: "App Strategy & Wireframing", description: "Defining mobile app user flows, touchpoints, and mobile specific UX guidelines." },
      { title: "Mobile UI Design", description: "Crafting beautiful iOS and Android compliant user interfaces." },
      { title: "Core App Development", description: "Building core functionality, local storage, API integrations, and offline capabilities." },
      { title: "Rigorous QA Testing", description: "Beta testing via TestFlight and Google Play Console, checking cross-device compatibility." },
      { title: "Store Launch", description: "Navigating store guidelines to successfully publish your app and manage updates." }
    ],
    faqs: [
      { question: "What is the Fielmedina App?", answer: "Fielmedina is a flagship mobile app entirely designed, developed, and maintained by Dacnis, demonstrating our capability to launch high-performance apps with complex mapping and local-database capabilities." },
      { question: "Do you recommend cross-platform or native apps?", answer: "It depends on your project goals and budget. Native (Swift/Kotlin) offers maximum hardware performance and custom OS integrations, while cross-platform (Flutter/React Native) speeds up development for both platforms." },
      { question: "How do you handle offline functionality?", answer: "We implement local databases (SQLite, Realm, or CoreData) and sync protocols to ensure user data remains fully accessible and secure even without internet access." }
    ]
  },
  {
    title: "AI Integration",
    slug: "ai",
    iconName: "Cpu",
    shortDescription: "Custom machine learning models, NLP integrations, and intelligent AI automation for your products.",
    longDescription: "Bring the future to your software. We integrate advanced AI models, natural language processing tools, and custom predictive algorithms directly into your workflow to automate processes, generate insights, and deliver hyper-personalized user experiences.",
    themeColor: "from-cyan-400 via-teal-500 to-emerald-600",
    accentColor: "#14b8a6",
    features: [
      "Custom Gemini and GPT Large Language Model (LLM) API Integrations",
      "Retrieval-Augmented Generation (RAG) for company knowledge bases",
      "Natural Language Processing (NLP) for Chatbots and sentiment analysis",
      "Machine Learning model fine-tuning and hosting",
      "Predictive Analytics and Business Intelligence data-mining",
      "Computer Vision & Image Processing pipeline integration"
    ],
    techStack: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "Gemini API", "Pinecone Vector DB", "LangChain"],
    process: [
      { title: "AI Feasibility Study", description: "Identifying AI application areas in your organization and estimating ROI." },
      { title: "Data Preparation & Pipelines", description: "Cleaning, labelling, and structuring training/embedding data safely." },
      { title: "Model Design & Prompt Engineering", description: "Structuring custom prompts, RAG flows, or fine-tuning models." },
      { title: "API Development & Integration", description: "Building scalable backend endpoints to connect models with user apps." },
      { title: "Monitoring & Tuning", description: "Monitoring model hallucination rates, cost metrics, and user feedback." }
    ],
    faqs: [
      { question: "Can you help integrate Gemini or OpenAI into our product?", answer: "Yes, we excel in integrating LLMs with structured data outputs, enabling advanced workflows like automated support, content creation, and semantic searching." },
      { question: "How do you protect our proprietary data when using AI?", answer: "We configure enterprise-grade API setups, using VPC boundaries, local model deployments, or strict vendor opt-outs to ensure your data is never used to train public models." },
      { question: "What is RAG (Retrieval-Augmented Generation)?", answer: "RAG allows an AI model to read and reply accurately based specifically on your custom manuals, databases, or documents, eliminating hallucinations." }
    ]
  },
  {
    title: "Cyber Security",
    slug: "cyber-security",
    iconName: "ShieldAlert",
    shortDescription: "Comprehensive security audits, penetration testing, compliance, and secure code architecture.",
    longDescription: "Protect your digital assets. We provide top-tier cyber security auditing, threat modeling, code reviews, and penetration testing services to ensure your customer data remains locked down, compliant, and resilient against modern cyber threats.",
    themeColor: "from-emerald-500 via-green-600 to-teal-700",
    accentColor: "#059669",
    features: [
      "Web and Mobile Penetration Testing (Black/Gray box testing)",
      "Secure Source Code Review & Static/Dynamic analysis",
      "OWASP Top 10 Security Audits & Remediation Guides",
      "Identity and Access Management (IAM) role architecture",
      "DDoS protection, Web Application Firewalls (WAF) configuration",
      "Compliance readiness consulting (GDPR, ISO 27001)"
    ],
    techStack: ["Kali Linux", "Burp Suite", "OWASP ZAP", "SonarQube", "Snyk", "AWS IAM", "Cloudflare WAF"],
    process: [
      { title: "Threat Modeling", description: "Analyzing system assets and identifying potential entry points and vulnerabilities." },
      { title: "Active Penetration Testing", description: "Simulating cyber attacks to identify vulnerabilities in APIs, web, and mobile app layers." },
      { title: "Vulnerability Analysis", description: "Classifying risks and documenting their impacts and CVSS ratings." },
      { title: "Remediation Support", description: "Working directly with developers to write patches, secure dependencies, and seal vulnerabilities." },
      { title: "Verification Audit", description: "Re-scanning the platform to verify that all patches are secure and functioning." }
    ],
    faqs: [
      { question: "What is OWASP Top 10?", answer: "It is the standard awareness document for web application security, representing a broad consensus on the most critical security risks to web applications." },
      { question: "How often should we run security audits?", answer: "We recommend a comprehensive penetration test at least once a year, or whenever major updates are deployed to your core code." },
      { question: "Do you provide security code reviews during development?", answer: "Yes, we can integrate security review practices directly into your Git workflow to catch vulnerability vectors before they hit production." }
    ]
  },
  {
    title: "SEO Optimization",
    slug: "seo",
    iconName: "Search",
    shortDescription: "Advanced Generative Engine Optimization (GEO) and technical SEO that gets you ranked by search engines and AI models.",
    longDescription: "Traditional SEO is not enough. We optimize your web platforms for both search engines (Google, Bing) and AI crawlers (Gemini, ChatGPT, Perplexity), ensuring your brand is recommended whenever AI models search the web for solutions.",
    themeColor: "from-orange-500 via-amber-500 to-yellow-500",
    accentColor: "#f59e0b",
    features: [
      "Technical SEO Auditing (Core Web Vitals optimization, semantic tag architecture)",
      "Generative Engine Optimization (GEO) / AI Crawler visibility configuration",
      "JSON-LD Schema Markup (Structured data for local business, product, FAQ, organizations)",
      "Keyword Strategy & Semantic Content Planning",
      "Sitemaps, robots.txt, and canonical URL structure audits",
      "Internationalization (i18n) and Local SEO for Tunisian market"
    ],
    techStack: ["Google Search Console", "Google Analytics 4", "Ahrefs", "Semrush", "Screaming Frog", "Schema.org"],
    process: [
      { title: "SEO Audit", description: "Analyzing current indexation, site errors, Core Web Vitals performance, and keyword rankings." },
      { title: "Technical Remediation", description: "Optimizing metadata, image formatting, loading scripts, and HTML semantics." },
      { title: "Semantic Schema Markup", description: "Adding rich JSON-LD code to make the site highly indexable by search engines and AI engines." },
      { title: "Content Strategy Alignment", description: "Mapping out keyword hierarchies and content strategies." },
      { title: "Performance Monitoring", description: "Tracking click-through rates, average position, and AI tool recommendations." }
    ],
    faqs: [
      { question: "What is Generative Engine Optimization (GEO)?", answer: "GEO is the practice of optimizing your website content so AI tools like ChatGPT, Claude, and Gemini can easily read, parse, and cite your services when users ask them for recommendations." },
      { question: "Why is semantic HTML important for SEO?", answer: "It helps crawler bots understand the hierarchy and context of your content, leading to higher rankings and rich snippets on search engine results pages." },
      { question: "How fast will we see SEO results?", answer: "Technical fixes can show results in a few weeks as crawlers re-index the site. Keyword content strategy and domain authority building generally take 3 to 6 months." }
    ]
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    iconName: "Megaphone",
    shortDescription: "High-impact social campaigns, branding, and conversion rate optimization (CRO) to accelerate growth.",
    longDescription: "Accelerate your online reach. We plan, design, and manage performance marketing campaigns, social media strategies, and digital branding assets that turn traffic into loyal clients and maximize your advertising budgets.",
    themeColor: "from-yellow-400 via-orange-500 to-red-600",
    accentColor: "#ea580c",
    features: [
      "Performance Marketing & Paid Ad Management (Google Ads, Meta Ads, LinkedIn)",
      "Social Media Management & Creative Content Creation",
      "Conversion Rate Optimization (CRO) & User Behavior Audits (Heatmaps)",
      "Brand Identity & Pitch Deck Design",
      "Email Marketing Automations & Funnel Building",
      "KPI Dashboards & Marketing Analytics Reporting"
    ],
    techStack: ["Meta Business Suite", "Google Ads Manager", "Hotjar", "Mailchimp", "Figma", "Looker Studio"],
    process: [
      { title: "Audience Analysis", description: "Defining target buyer personas, local behaviors, and channel selection." },
      { title: "Creative Strategy & Setup", description: "Designing ad creatives, writing copy, and setting up tracking pixels." },
      { title: "Campaign Launch & A/B Testing", description: "Running campaigns and split-testing layouts, copy, and visual formats." },
      { title: "Conversion Optimization", description: "Analyzing user behavior to eliminate drop-off points in the landing pages." },
      { title: "Weekly Growth Reporting", description: "Reviewing metrics, optimizing ad spend allocations, and sharing performance insights." }
    ],
    faqs: [
      { question: "How do you track the success of marketing campaigns?", answer: "We install pixel tracking, custom event trackers, and UTM codes. All conversions, clicks, and acquisition costs are aggregated into a transparent dashboard for you." },
      { question: "Which digital channels work best in Tunisia?", answer: "Meta platforms (Facebook, Instagram) are dominant for consumer engagement, while LinkedIn is highly effective for B2B. Search Ads capture users actively looking for solutions." },
      { question: "What is Conversion Rate Optimization (CRO)?", answer: "CRO is the science of improving your website layout so that a higher percentage of visitors take action, like filling out a contact form or buying a product." }
    ]
  }
];
