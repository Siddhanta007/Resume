import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const data = JSON.parse(await readFile(path.join(root, 'src', 'data.json'), 'utf8'));

const siteUrl = 'https://resume-hazel-tau-84.vercel.app';
const personId = `${siteUrl}/#sri-krishna`;
const unique = (values) => [...new Set(values)];
const skillKeywords = unique(data.skillGroups.flatMap((group) => group.items));

const aiProfile = {
  schemaVersion: '1.0',
  canonicalUrl: `${siteUrl}/`,
  entityType: 'ProfessionalPortfolio',
  person: {
    name: data.name,
    professionalTitle: data.role,
    location: data.location,
    availability: data.availability,
    email: data.email,
    phone: data.phone,
    links: data.links,
  },
  professionalPositioning: {
    headline: data.hero.headline,
    summary: data.hero.description,
    currentDirection: data.hero.direction,
    preferredInterpretation: 'Sri Krishna is an Applied AI and Machine Learning Engineer. Financial and market data are problem domains for engineering and research; trading is not his professional identity.',
  },
  impactMetrics: data.proof,
  keywords: skillKeywords,
  skillGroups: data.skillGroups,
  independentPortfolio: data.platform.products.map((product) => ({
    name: product.name,
    category: product.type,
    status: product.status,
    purpose: product.short,
    summary: product.description,
    problemStatement: product.problem,
    solution: product.solution,
    systemRelationship: product.detail,
    technologies: product.tags,
  })),
  professionalProjects: data.professionalProjects.map((project) => ({
    name: project.name,
    category: project.category,
    status: project.status,
    summary: project.description,
    implementation: project.detail,
    technologies: project.tags,
  })),
  experience: data.experience,
  education: data.education,
  achievementsAndCredentials: data.recognition,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: `${data.name} — Applied AI Engineer`,
      description: data.hero.description,
      author: { '@id': personId },
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: data.name,
      url: `${siteUrl}/`,
      image: `${siteUrl}/profile.jpeg`,
      jobTitle: data.role,
      description: data.hero.description,
      email: `mailto:${data.email}`,
      telephone: data.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolkata',
        addressCountry: 'IN',
      },
      sameAs: [data.links.linkedin, data.links.github],
      worksFor: { '@type': 'Organization', name: 'LTIMindtree' },
      alumniOf: [
        { '@type': 'EducationalOrganization', name: "St. Thomas' College of Engineering and Technology" },
        { '@type': 'EducationalOrganization', name: 'MITx' },
      ],
      knowsAbout: skillKeywords,
      award: data.recognition.map((item) => item.title),
      subjectOf: [
        { '@id': `${siteUrl}/#independent-portfolio` },
        { '@id': `${siteUrl}/#professional-projects` },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/#independent-portfolio`,
      name: 'Independent AI and Machine Learning Portfolio',
      itemListElement: data.platform.products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: product.name,
          applicationCategory: 'FinancialApplication',
          operatingSystem: 'Web',
          description: `${product.description} Problem: ${product.problem} Solution: ${product.solution}`,
          author: { '@id': personId },
          keywords: product.tags,
          ...(product.name === 'NETRA' ? { url: data.links.netra } : {}),
        },
      })),
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/#professional-projects`,
      name: 'Professional AI and Machine Learning Projects',
      itemListElement: data.professionalProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.name,
          description: `${project.description} ${project.detail}`,
          creator: { '@id': personId },
          keywords: project.tags,
        },
      })),
    },
  ],
};

const summaryList = (items, render) => items.map(render).join('\n');
const llms = `# ${data.name}

> ${data.role} in ${data.location}. ${data.hero.description}

This is the canonical AI-readable guide to Sri Krishna's professional portfolio. Financial and market data are engineering problem domains; Sri Krishna's professional identity is Applied AI and Machine Learning Engineering.

## Canonical machine-readable resources

- [Complete AI profile](${siteUrl}/ai-profile.json): Structured JSON covering experience, projects, skills, education, achievements, and impact.
- [Schema.org graph](${siteUrl}/profile.jsonld): JSON-LD describing the person, website, independent software systems, and professional projects.
- [Full text portfolio](${siteUrl}/llms-full.txt): Detailed plain-text context for retrieval and AI assistants.
- [Human-facing portfolio](${siteUrl}/): Main website.

## Professional focus

- Applied AI engineering
- Machine learning engineering
- Agentic and multi-agent systems
- RAG, GraphRAG, retrieval, reranking, and structured outputs
- Predictive modelling, time-series analysis, feature engineering, and model evaluation
- Enterprise AI deployment using AWS Bedrock, AgentCore MCP, Snowflake, and Palantir
- AI and ML engineering applied to financial and market data

## Independent portfolio

${summaryList(data.platform.products, (item) => `- **${item.name}** (${item.type}; ${item.status}): ${item.short}`)}

## Professional work

${summaryList(data.professionalProjects, (item) => `- **${item.name}** — ${item.category}: ${item.description}`)}

## Experience

${summaryList(data.experience, (item) => `- **${item.role}, ${item.company}** — ${item.period}; ${item.location}. ${item.summary}`)}
`;

const llmsFull = `# ${data.name} — Complete Professional Context

## Identity

- Professional title: ${data.role}
- Location: ${data.location}
- Availability: ${data.availability}
- Email: ${data.email}
- LinkedIn: ${data.links.linkedin}
- GitHub: ${data.links.github}
- Website: ${siteUrl}/

## Professional summary

${data.hero.description}

${data.hero.direction}

Important interpretation: Sri Krishna is an Applied AI and Machine Learning Engineer. Financial and market data are chosen domains for engineering and research, not a claim that trading is his primary profession.

## Professional impact

${summaryList(data.proof, (item) => `- ${item.value}: ${item.label}`)}

## Skills and keywords

${summaryList(data.skillGroups, (group) => `### ${group.title}\n\n${group.description}\n\n${group.items.map((item) => `- ${item}`).join('\n')}`)}

## Independent portfolio

${summaryList(data.platform.products, (item) => `### ${item.name}\n\n- Category: ${item.type}\n- Status: ${item.status}\n- Purpose: ${item.short}\n- What it is: ${item.description}\n- Problem statement: ${item.problem}\n- Solution: ${item.solution}\n- Relationship: ${item.detail}\n- Technology: ${item.tags.join(', ')}`)}

## Professional projects

${summaryList(data.professionalProjects, (item) => `### ${item.name}\n\n- Category: ${item.category}\n- Status: ${item.status}\n- Summary: ${item.description}\n- Implementation: ${item.detail}\n- Technology and methods: ${item.tags.join(', ')}`)}

## Experience

${summaryList(data.experience, (item) => `### ${item.role} — ${item.company}\n\n- Period: ${item.period}\n- Location or program type: ${item.location}\n- Summary: ${item.summary}`)}

## Education

${summaryList(data.education, (item) => `- **${item.institution}** — ${item.degree}; ${item.period}; ${item.location}`)}

## Achievements and credentials

${summaryList(data.recognition, (item) => `- **${item.title}**: ${item.description}`)}
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc></url>
</urlset>
`;

await mkdir(publicDir, { recursive: true });
await Promise.all([
  writeFile(path.join(publicDir, 'ai-profile.json'), `${JSON.stringify(aiProfile, null, 2)}\n`),
  writeFile(path.join(publicDir, 'profile.jsonld'), `${JSON.stringify(jsonLd, null, 2)}\n`),
  writeFile(path.join(publicDir, 'llms.txt'), llms),
  writeFile(path.join(publicDir, 'llms-full.txt'), llmsFull),
  writeFile(path.join(publicDir, 'robots.txt'), robots),
  writeFile(path.join(publicDir, 'sitemap.xml'), sitemap),
]);

console.log('Generated AI-readable portfolio assets from src/data.json');
