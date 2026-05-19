import { ExternalLink, Folder, Layers3 } from "lucide-react";
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

const finderProjects = orderedNames
  .map((name) => mergedProjects.find((project) => project.name === name))
  .filter(Boolean);

function LinkButton({ href, icon: Icon, label }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={styles.linkButton}>
      <Icon size={14} strokeWidth={2} />
      <span>{label}</span>
    </a>
  );
}

export default function FinderApp() {
  return (
    <div style={styles.page}>
      <section style={styles.finderToolbar}>
        <div style={styles.finderMeta}>
          <span style={styles.sidebarDot} />
          <p style={styles.toolbarTitle}>Projects</p>
        </div>
        <div style={styles.toolbarPill}>
          <Layers3 size={15} strokeWidth={2} />
          <span>{finderProjects.length} items</span>
        </div>
      </section>

      <section style={styles.grid}>
        {finderProjects.map((project) => (
          <article key={project.id} style={styles.card}>
            <div style={styles.folderTop}>
              <div style={styles.folderBadge}>
                <Folder size={28} strokeWidth={1.8} />
              </div>
              <span style={styles.typeBadge}>{project.type}</span>
            </div>

            <h2 style={styles.cardTitle}>{project.name}</h2>
            <p style={styles.description}>{project.description}</p>

            <div style={styles.infoStack}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Role</span>
                <span style={styles.infoValue}>{project.role}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Status</span>
                <span style={styles.statusBadge}>{project.status}</span>
              </div>
            </div>

            <div style={styles.techWrap}>
              {project.techStack.slice(0, 5).map((tech) => (
                <span key={tech} style={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>

            <div style={styles.linkRow}>
              <LinkButton href={project.liveUrl || "https://example.com/project-live-link"} icon={ExternalLink} label="Open" />
              <LinkButton href={project.githubUrl || "https://github.com/your-username/project-placeholder"} icon={FaGithub} label="Source" />
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
  finderToolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    padding: "16px 18px",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(180deg, rgba(30,41,59,0.62), rgba(15,23,42,0.46))",
  },
  finderMeta: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sidebarDot: {
    width: "10px",
    height: "10px",
    borderRadius: "999px",
    background: "#60a5fa",
    boxShadow: "0 0 20px rgba(96,165,250,0.55)",
  },
  toolbarTitle: {
    margin: 0,
    color: "#f8fafc",
    fontWeight: 600,
  },
  toolbarPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    borderRadius: "999px",
    color: "#dbeafe",
    background: "rgba(59,130,246,0.14)",
    border: "1px solid rgba(96,165,250,0.14)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },
  card: {
    display: "grid",
    gap: "14px",
    padding: "18px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "linear-gradient(180deg, rgba(15,23,42,0.76), rgba(15,23,42,0.52))",
    boxShadow: "0 18px 40px rgba(2,6,23,0.16)",
  },
  folderTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },
  folderBadge: {
    display: "inline-grid",
    placeItems: "center",
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    color: "#eff6ff",
    background: "linear-gradient(135deg, #60a5fa, #2563eb)",
    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.26)",
  },
  typeBadge: {
    padding: "8px 10px",
    borderRadius: "999px",
    fontSize: "0.8rem",
    color: "#bfdbfe",
    border: "1px solid rgba(147,197,253,0.14)",
    background: "rgba(96,165,250,0.1)",
  },
  cardTitle: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "1.1rem",
  },
  description: {
    margin: 0,
    color: "rgba(226,232,240,0.88)",
    lineHeight: 1.65,
  },
  infoStack: {
    display: "grid",
    gap: "10px",
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "58px 1fr",
    gap: "10px",
    alignItems: "start",
  },
  infoLabel: {
    color: "rgba(191,219,254,0.78)",
    fontSize: "0.84rem",
  },
  infoValue: {
    color: "#e2e8f0",
    lineHeight: 1.55,
  },
  statusBadge: {
    display: "inline-flex",
    width: "fit-content",
    padding: "7px 10px",
    borderRadius: "999px",
    color: "#e2e8f0",
    background: "rgba(148,163,184,0.12)",
    border: "1px solid rgba(148,163,184,0.12)",
    fontSize: "0.84rem",
  },
  techWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  techBadge: {
    padding: "8px 10px",
    borderRadius: "999px",
    color: "#dbeafe",
    background: "rgba(59,130,246,0.12)",
    border: "1px solid rgba(96,165,250,0.14)",
    fontSize: "0.82rem",
  },
  linkRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  linkButton: {
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
