import { brandUrl, clients, partners, type Brand } from "@/lib/brands";
import { getDictionary } from "@/lib/dictionaries";
import { openJobs } from "@/lib/server/careers";
import { href, jobRoute, serviceKeys } from "@/lib/routes";
import { services } from "@/lib/services";
import { fielmedina, site } from "@/lib/site";

/*
 * llms.txt (https://llmstxt.org) and llms-full.txt, generated from the same data as the pages,
 * so facts, services, clients, partners and open jobs never drift from the site.
 */

const url = (path: string) => new URL(path, site.url).toString();
const brandLine = (b: Brand) => `- [${b.name}](${brandUrl(b, "en")})${b.activity ? `: ${b.activity.en}` : ""}`;

function facts() {
  const a = site.address;
  return [
    `Founded: September 2025 in Sousse, Tunisia, by ${site.founder}.`,
    `Address: ${a.street}, ${a.locality} ${a.postalCode}, ${a.country}.`,
    `Contact: ${site.email}, ${site.phone.display}.`,
    "Languages: the site is in English (/en) and French (/fr); the team works in French, English and Arabic.",
    "Area served: Tunisia, Europe, North America and the Middle East.",
  ].join("\n");
}

export async function llmsTxt() {
  const en = getDictionary("en");
  const jobs = await openJobs();
  return `# ${site.name}

> ${en.meta.description}

${facts()}

## Services (English)

${serviceKeys.map((k) => `- [${services[k].content.en.title}](${url(href("en", `service:${k}`))}): ${services[k].content.en.short}`).join("\n")}
- [All services](${url(href("en", "services"))})

## Services (français)

${serviceKeys.map((k) => `- [${services[k].content.fr.title}](${url(href("fr", `service:${k}`))})`).join("\n")}
- [Tous les services](${url(href("fr", "services"))})

## Product

- [${fielmedina.name}](${fielmedina.url}): ${en.home.fielmedinaBody}

## Clients

Companies Dacnis builds websites, apps and campaigns for:

${clients.map(brandLine).join("\n")}

## Partners

Partners are not clients: Dacnis and its partners refer projects to each other and deliver joint work.

${partners.map(brandLine).join("\n")}

## Careers

- [Careers and internships](${url(href("en", "careers"))}) / [Carrières et stages](${url(href("fr", "careers"))}). Applications: ${site.hrEmail}
${jobs.map((j) => `- [${j.content.en.title}](${url(href("en", jobRoute(j)))}): ${j.content.en.summary} Apply before ${j.validThrough}.`).join("\n")}

## Company

- [About Dacnis](${url(href("en", "about"))}) / [À propos](${url(href("fr", "about"))})
- [Start a project](${url(href("en", "hire"))}) / [Démarrer un projet](${url(href("fr", "hire"))})

## Optional

- [Full content for language models](${url("/llms-full.txt")})
- [Privacy policy](${url(href("en", "privacy"))})
- [Terms of service](${url(href("en", "terms"))})
`;
}

export async function llmsFullTxt() {
  const en = getDictionary("en");
  const jobs = await openJobs();
  const section = (title: string, body: string) => `## ${title}\n\n${body.trim()}\n`;
  const qa = (items: { question: string; answer: string }[]) => items.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");

  return [
    `# ${site.name}: full site content\n\n> ${en.meta.description}\n\n${facts()}\n\nSource: ${url(href("en", "home"))} (French: ${url(href("fr", "home"))})\n`,
    section("In brief", en.home.summary.join(" ")),
    section("About", `${en.about.intro}\n\n${en.about.mission}\n\n${en.about.culture}\n\n${en.about.milestones.map((m) => `- ${m.date}: ${m.description}`).join("\n")}`),
    ...serviceKeys.map((k) => {
      const c = services[k].content.en;
      return section(
        `Service: ${c.title}`,
        `URL: ${url(href("en", `service:${k}`))}\n\n${c.long}\n\nWhat Dacnis delivers:\n${c.features.map((f) => `- ${f}`).join("\n")}\n\nTechnologies: ${services[k].techStack.join(", ")}.\n\nProcess:\n${c.process.map((p, i) => `${i + 1}. ${p.title}: ${p.description}`).join("\n")}\n\n${qa(c.faqs)}`,
      );
    }),
    section("FielMedina", `${en.home.fielmedinaBody}\n\nWebsite: ${fielmedina.url}`),
    section("Clients", clients.map(brandLine).join("\n")),
    section("Partners", `${en.home.partnersIntro}\n\n${partners.map(brandLine).join("\n")}`),
    section(
      "Careers",
      `${en.careers.intro}\n\n${
        jobs.length
          ? jobs
              .map((j) => {
                const c = j.content.en;
                return `### ${c.title}\n\nURL: ${url(href("en", jobRoute(j)))}\nType: ${en.careers.types[j.employmentType]}, ${en.careers.workplaces[j.workplace]}, ${en.careers.location}. Apply before ${j.validThrough}.\n\n${c.summary}\n\nResponsibilities:\n${c.responsibilities.map((r) => `- ${r}`).join("\n")}\n\nRequirements:\n${c.requirements.map((r) => `- ${r}`).join("\n")}`;
              })
              .join("\n\n")
          : en.careers.empty
      }`,
    ),
    section("Frequently asked questions", qa(en.home.faqs)),
  ].join("\n");
}
