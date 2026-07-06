import { Code2, Globe2, Layers3, MapPin, ShoppingBag, UserRound } from "lucide-react";
import { personalInfo } from "../../data/personalInfo.js";
import { projects } from "../../data/projects.js";

const services = [
  "Portfolio websites and landing pages",
  "MERN stack applications with React, Node.js, Express, and MongoDB",
  "Shopify theme customization and storefront improvements",
  "Frontend interfaces, dashboards, and responsive web experiences",
  "AI-assisted software prototypes and project documentation",
];

const keywords = [
  "MERN Stack Developer in Nepal",
  "React Developer Nepal",
  "Full Stack Developer Nepal",
  "Shopify Developer Nepal",
  "Freelance Web Developer Nepal",
  "Portfolio Website Developer Nepal",
];

const featuredProjects = projects.slice(0, 4);

function InfoBlock({ icon: Icon, title, children }) {
  return (
    <section style={styles.block}>
      <div style={styles.blockHeader}>
        <span style={styles.blockIcon}>
          <Icon size={16} strokeWidth={2} />
        </span>
        <h2 style={styles.blockTitle}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function DeveloperProfileApp() {
  return (
    <article style={styles.page} aria-labelledby="developer-profile-title">
      <section style={styles.hero}>
        <div style={styles.heroCopy}>
          <p style={styles.eyebrow}>Developer Profile</p>
          <h1 id="developer-profile-title" style={styles.title}>
            Bidur Siwakoti | MERN Stack Developer in Nepal
          </h1>
          <p style={styles.lead}>
            I am Bidur Siwakoti, a Nepal-based computing student and web developer building React,
            Node.js, MongoDB, Shopify, full-stack, and AI-assisted software projects.
          </p>
        </div>

        <div style={styles.identityCard}>
          <div style={styles.identityRow}>
            <UserRound size={16} strokeWidth={2} />
            <span>{personalInfo.currentRole}</span>
          </div>
          <div style={styles.identityRow}>
            <MapPin size={16} strokeWidth={2} />
            <span>{personalInfo.location}</span>
          </div>
          <div style={styles.identityRow}>
            <Globe2 size={16} strokeWidth={2} />
            <span>Available for internships, freelance work, and collaboration</span>
          </div>
        </div>
      </section>

      <div style={styles.grid}>
        <InfoBlock icon={Code2} title="About Bidur Siwakoti">
          <p style={styles.text}>
            {personalInfo.professionalIdentity} I focus on practical software for education,
            agriculture, public services, local businesses, and social impact.
          </p>
        </InfoBlock>

        <InfoBlock icon={ShoppingBag} title="Web Development Services in Nepal">
          <ul style={styles.list}>
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </InfoBlock>

        <InfoBlock icon={Layers3} title="Projects by Bidur Siwakoti">
          <div style={styles.projectList}>
            {featuredProjects.map((project) => (
              <article key={project.id} style={styles.projectItem}>
                <h3 style={styles.projectTitle}>{project.name}</h3>
                <p style={styles.projectText}>{project.description}</p>
              </article>
            ))}
          </div>
        </InfoBlock>

        <InfoBlock icon={Globe2} title="Developer Skills & Services">
          <div style={styles.keywordList}>
            {keywords.map((keyword) => (
              <span key={keyword} style={styles.keyword}>
                {keyword}
              </span>
            ))}
          </div>
        </InfoBlock>
      </div>
    </article>
  );
}

const styles = {
  page: {
    display: "grid",
    gap: "18px",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.35fr) minmax(240px, 0.65fr)",
    gap: "18px",
    alignItems: "stretch",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "22px",
    padding: "22px",
    background: "linear-gradient(160deg, rgba(14,165,233,0.18), rgba(15,23,42,0.72) 48%, rgba(20,184,166,0.14))",
    boxShadow: "0 24px 58px rgba(2,6,23,0.24)",
  },
  heroCopy: {
    display: "grid",
    alignContent: "center",
    gap: "12px",
  },
  eyebrow: {
    margin: 0,
    color: "#67e8f9",
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
    lineHeight: 1.05,
  },
  lead: {
    margin: 0,
    maxWidth: "68ch",
    color: "rgba(226,232,240,0.92)",
    fontSize: "1rem",
    lineHeight: 1.72,
  },
  identityCard: {
    display: "grid",
    alignContent: "center",
    gap: "12px",
    padding: "18px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(15,23,42,0.5)",
  },
  identityRow: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    color: "#e0f2fe",
    lineHeight: 1.5,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },
  block: {
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "18px",
    background: "linear-gradient(180deg, rgba(15,23,42,0.74), rgba(15,23,42,0.5))",
  },
  blockHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "13px",
  },
  blockIcon: {
    display: "inline-grid",
    placeItems: "center",
    width: "30px",
    height: "30px",
    borderRadius: "10px",
    color: "#cffafe",
    background: "rgba(14,165,233,0.18)",
  },
  blockTitle: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "1rem",
  },
  text: {
    margin: 0,
    color: "rgba(226,232,240,0.9)",
    lineHeight: 1.72,
  },
  list: {
    margin: 0,
    paddingLeft: "18px",
    color: "rgba(226,232,240,0.9)",
    lineHeight: 1.7,
  },
  projectList: {
    display: "grid",
    gap: "12px",
  },
  projectItem: {
    display: "grid",
    gap: "5px",
    paddingBottom: "11px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  projectTitle: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "0.96rem",
  },
  projectText: {
    margin: 0,
    color: "rgba(203,213,225,0.88)",
    fontSize: "0.86rem",
    lineHeight: 1.55,
  },
  keywordList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "9px",
  },
  keyword: {
    padding: "8px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(125,211,252,0.22)",
    background: "rgba(14,165,233,0.12)",
    color: "#dff6ff",
    fontSize: "0.82rem",
  },
};
