import { Download, ExternalLink, GraduationCap, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { education } from "../../data/education.js";
import { links } from "../../data/links.js";
import { personalInfo } from "../../data/personalInfo.js";
import { projects } from "../../data/projects.js";
import { skills } from "../../data/skills.js";
import { desktopAssets } from "../../assets/appAssets.js";

const experience = [
  {
    title: "Shopify Theme Developer",
    organization: "Independent and client-focused work",
    description:
      "Developed Shopify themes from scratch, handled storefront customization, and explored Shopify app-related workflows to deepen ecosystem knowledge.",
  },
  {
    title: "Shopify Theme Developer / Web Developer",
    organization: "Gold Tree Group of Business",
    description:
      "Worked on Shopify theme development and practical digital business web tasks.",
  },
  {
    title: "Freelance Web Developer",
    organization: "Onest Real Estate",
    description:
      "Contributed to real estate-related web development work and helped build a digital presence for the business.",
  },
];

const skillSummary = [
  ...skills.frontend.slice(0, 4),
  ...skills.backend.slice(0, 3),
  ...skills.databases.slice(0, 2),
  ...skills.shopify.slice(0, 2),
];

const majorProjects = projects.slice(0, 4);

function Section({ title, children }) {
  return (
    <section style={styles.sectionCard}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export default function ResumeApp() {
  return (
    <div style={styles.page}>
      <section style={styles.heroCard}>
        <div>
          <p style={styles.kicker}>Resume</p>
          <h1 style={styles.heroTitle}>{personalInfo.fullName}</h1>
          <p style={styles.heroRole}>{personalInfo.currentRole}</p>
          <p style={styles.heroText}>{personalInfo.professionalIdentity}</p>
        </div>

        <a href={desktopAssets.resumePdf} download style={styles.downloadButton}>
          <Download size={16} strokeWidth={2} />
          <span>Download CV</span>
        </a>
      </section>

      <div style={styles.grid}>
        <Section title="Education">
          <div style={styles.stack}>
            {education.map((item) => (
              <article key={item.id} style={styles.timelineCard}>
                <div style={styles.timelineTop}>
                  <div style={styles.iconWrap}>
                    <GraduationCap size={16} strokeWidth={2} />
                  </div>
                  <span style={styles.period}>{item.period}</span>
                </div>
                <h3 style={styles.itemTitle}>{item.degree}</h3>
                <p style={styles.itemMeta}>{item.institution}</p>
                {item.affiliation ? <p style={styles.itemMeta}>{item.affiliation}</p> : null}
                {item.status ? <p style={styles.itemText}>{item.status}</p> : null}
                {item.grade ? <p style={styles.itemText}>{item.grade}</p> : null}
              </article>
            ))}
          </div>
        </Section>

        <Section title="Experience">
          <div style={styles.stack}>
            {experience.map((item) => (
              <article key={item.title} style={styles.timelineCard}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemMeta}>{item.organization}</p>
                <p style={styles.itemText}>{item.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Skills Summary">
          <div style={styles.badgeWrap}>
            {skillSummary.map((item) => (
              <span key={item} style={styles.badge}>
                {item}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Major Projects">
          <div style={styles.stack}>
            {majorProjects.map((project) => (
              <article key={project.id} style={styles.projectCard}>
                <div style={styles.projectTop}>
                  <div>
                    <h3 style={styles.itemTitle}>{project.name}</h3>
                    <p style={styles.itemMeta}>{project.type}</p>
                  </div>
                  <span style={styles.statusBadge}>{project.status}</span>
                </div>
                <p style={styles.itemText}>{project.description}</p>
                <p style={styles.projectRole}><strong>Role:</strong> {project.role}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Contact Info">
          <div style={styles.contactStack}>
            <a href={links.email.personal} style={styles.contactRow}>
              <Mail size={16} strokeWidth={2} />
              <span>{links.email.personal.replace("mailto:", "")}</span>
            </a>
            <a href={links.phone} style={styles.contactRow}>
              <Phone size={16} strokeWidth={2} />
              <span>{links.phone.replace("tel:", "")}</span>
            </a>
            <div style={styles.contactRow}>
              <MapPin size={16} strokeWidth={2} />
              <span>{personalInfo.location}</span>
            </div>
            <a href={links.github} target="_blank" rel="noreferrer" style={styles.contactRow}>
              <ExternalLink size={16} strokeWidth={2} />
              <span>GitHub</span>
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" style={styles.contactRow}>
              <Sparkles size={16} strokeWidth={2} />
              <span>LinkedIn</span>
            </a>
          </div>
        </Section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "grid",
    gap: "18px",
  },
  heroCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    flexWrap: "wrap",
    padding: "24px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "linear-gradient(180deg, rgba(30,41,59,0.74), rgba(15,23,42,0.52))",
    minWidth: 0,
  },
  kicker: {
    margin: 0,
    color: "#93c5fd",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontSize: "0.76rem",
  },
  heroTitle: {
    margin: "10px 0 0",
    color: "#f8fafc",
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
  },
  heroRole: {
    margin: "10px 0 0",
    color: "#bfdbfe",
    lineHeight: 1.6,
  },
  heroText: {
    margin: "12px 0 0",
    color: "rgba(226,232,240,0.9)",
    lineHeight: 1.7,
    maxWidth: "62ch",
  },
  downloadButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "14px",
    color: "#f8fafc",
    textDecoration: "none",
    background: "rgba(59,130,246,0.14)",
    border: "1px solid rgba(96,165,250,0.16)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },
  sectionCard: {
    display: "grid",
    gap: "16px",
    padding: "20px",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "linear-gradient(180deg, rgba(15,23,42,0.76), rgba(15,23,42,0.5))",
  },
  sectionTitle: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "1rem",
  },
  stack: {
    display: "grid",
    gap: "14px",
  },
  timelineCard: {
    padding: "16px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  timelineTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  iconWrap: {
    display: "inline-grid",
    placeItems: "center",
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    background: "rgba(96,165,250,0.14)",
    color: "#bfdbfe",
  },
  period: {
    color: "rgba(191,219,254,0.82)",
    fontSize: "0.84rem",
  },
  itemTitle: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "1rem",
  },
  itemMeta: {
    margin: "8px 0 0",
    color: "#bfdbfe",
    lineHeight: 1.5,
  },
  itemText: {
    margin: "10px 0 0",
    color: "rgba(226,232,240,0.88)",
    lineHeight: 1.7,
  },
  badgeWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  badge: {
    padding: "9px 12px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.12)",
    border: "1px solid rgba(96,165,250,0.14)",
    color: "#dbeafe",
    fontSize: "0.84rem",
  },
  projectCard: {
    padding: "16px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  projectTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
  },
  statusBadge: {
    padding: "8px 10px",
    borderRadius: "999px",
    background: "rgba(148,163,184,0.12)",
    border: "1px solid rgba(148,163,184,0.12)",
    color: "#e2e8f0",
    fontSize: "0.8rem",
  },
  projectRole: {
    margin: "10px 0 0",
    color: "#e2e8f0",
    lineHeight: 1.6,
  },
  contactStack: {
    display: "grid",
    gap: "12px",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#e2e8f0",
    textDecoration: "none",
    lineHeight: 1.6,
  },
};
