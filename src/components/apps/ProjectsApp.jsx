import { ExternalLink, Layers2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "../../data/projects.js";

const fallbackProjects = [
  {
    id: "fundhive",
    name: "FundHive",
    type: "Fintech / Donation Platform",
    description: "A crowdfunding and donation-oriented platform concept focused on organized campaigns, fundraising flows, and transparent digital support.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB"],
    role: "Full-stack developer",
    status: "Project details to be expanded",
    liveUrl: "https://example.com/fundhive-live-link",
    githubUrl: "https://github.com/your-username/fundhive",
  },
  {
    id: "breathe-now",
    name: "BreatheNow",
    type: "Health / Wellness Project",
    description: "A wellness-focused digital project concept intended to support guided experiences, calm interaction, and meaningful user support.",
    techStack: ["React", "JavaScript", "CSS"],
    role: "Frontend developer",
    status: "Project details to be expanded",
    liveUrl: "https://example.com/breathenow-live-link",
    githubUrl: "https://github.com/your-username/breathenow",
  },
  {
    id: "derefund",
    name: "DeReFund",
    type: "Blockchain / Transparency Concept",
    description: "A concept around transparent funding and accountability using digital systems and blockchain-inspired trust models.",
    techStack: ["React", "Node.js", "Blockchain Concepts"],
    role: "Concept designer and developer",
    status: "Project details to be expanded",
    liveUrl: "https://example.com/derefund-live-link",
    githubUrl: "https://github.com/your-username/derefund",
  },
  {
    id: "shopify-theme-work",
    name: "Shopify Theme Work",
    type: "Freelance / Commerce Work",
    description: "Custom Shopify theme development, storefront customization, and practical digital commerce work across client-focused builds.",
    techStack: ["Shopify Liquid", "JavaScript", "HTML", "CSS"],
    role: "Shopify Theme Developer",
    status: "Ongoing",
    liveUrl: "https://example.com/shopify-theme-work-live-link",
    githubUrl: "https://github.com/your-username/shopify-theme-work",
  },
];

const mergedProjects = [
  ...projects,
  ...fallbackProjects.filter(
    (fallbackProject) => !projects.some((project) => project.name === fallbackProject.name)
  ),
];

const orderedNames = [
  "KrishiMitra",
  "FundHive",
  "SmartGov Bot",
  "Academic MCQ Website",
  "BreatheNow",
  "DeReFund",
  "Shopify Theme Work",
  "macOS Portfolio / EvilEverest OS",
];

const projectList = orderedNames
  .map((name) => mergedProjects.find((project) => project.name === name))
  .filter(Boolean);

function ActionLink({ href, icon: Icon, label }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={styles.actionLink}>
      <Icon size={15} strokeWidth={2} />
      <span>{label}</span>
    </a>
  );
}

export default function ProjectsApp() {
  return (
    <div style={styles.page}>
      <section style={styles.headerCard}>
        <div>
          <p style={styles.kicker}>Project Archive</p>
          <h1 style={styles.title}>Selected Work</h1>
          <p style={styles.intro}>
            A curated set of academic, experimental, civic, commerce, and portfolio projects presented in a clean macOS-style workspace.
          </p>
        </div>

        <div style={styles.countPill}>
          <Layers2 size={16} strokeWidth={2} />
          <span>{projectList.length} featured projects</span>
        </div>
      </section>

      <section style={styles.cardGrid}>
        {projectList.map((project) => (
          <article key={project.id} style={styles.projectCard}>
            <div style={styles.cardHeader}>
              <div>
                <p style={styles.projectType}>{project.type}</p>
                <h2 style={styles.projectName}>{project.name}</h2>
              </div>
              <span style={styles.statusPill}>{project.status}</span>
            </div>

            <p style={styles.projectDescription}>{project.description}</p>

            <div style={styles.metaGrid}>
              <div style={styles.metaBlock}>
                <span style={styles.metaLabel}>Role</span>
                <span style={styles.metaValue}>{project.role}</span>
              </div>
              <div style={styles.metaBlock}>
                <span style={styles.metaLabel}>Stack</span>
                <div style={styles.badgeWrap}>
                  {project.techStack.map((tech) => (
                    <span key={tech} style={styles.badge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={styles.actions}>
              <ActionLink href={project.liveUrl || "https://example.com/project-live-link"} icon={ExternalLink} label="Live Link" />
              <ActionLink href={project.githubUrl || "https://github.com/your-username/project-placeholder"} icon={FaGithub} label="GitHub" />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

const styles = {
  page: {
    display: "grid",
    gap: "18px",
  },
  headerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    flexWrap: "wrap",
    padding: "22px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "linear-gradient(180deg, rgba(30,41,59,0.74), rgba(15,23,42,0.52))",
  },
  kicker: {
    margin: 0,
    color: "#93c5fd",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontSize: "0.76rem",
  },
  title: {
    margin: "10px 0 0",
    color: "#f8fafc",
    fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
  },
  intro: {
    margin: "12px 0 0",
    color: "rgba(226,232,240,0.9)",
    lineHeight: 1.7,
    maxWidth: "64ch",
  },
  countPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    borderRadius: "999px",
    color: "#dbeafe",
    background: "rgba(59,130,246,0.12)",
    border: "1px solid rgba(96,165,250,0.14)",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },
  projectCard: {
    display: "grid",
    gap: "16px",
    padding: "20px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "linear-gradient(180deg, rgba(15,23,42,0.76), rgba(15,23,42,0.5))",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
  },
  projectType: {
    margin: 0,
    color: "#93c5fd",
    fontSize: "0.78rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  projectName: {
    margin: "8px 0 0",
    color: "#f8fafc",
    fontSize: "1.14rem",
  },
  statusPill: {
    padding: "8px 10px",
    borderRadius: "999px",
    background: "rgba(148,163,184,0.12)",
    border: "1px solid rgba(148,163,184,0.12)",
    color: "#e2e8f0",
    fontSize: "0.82rem",
  },
  projectDescription: {
    margin: 0,
    color: "rgba(226,232,240,0.9)",
    lineHeight: 1.7,
  },
  metaGrid: {
    display: "grid",
    gap: "14px",
  },
  metaBlock: {
    display: "grid",
    gap: "8px",
  },
  metaLabel: {
    color: "rgba(191,219,254,0.8)",
    fontSize: "0.82rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  metaValue: {
    color: "#f8fafc",
    lineHeight: 1.6,
  },
  badgeWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  badge: {
    padding: "8px 10px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.12)",
    border: "1px solid rgba(96,165,250,0.14)",
    color: "#dbeafe",
    fontSize: "0.82rem",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  actionLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    borderRadius: "12px",
    color: "#f8fafc",
    textDecoration: "none",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
};
