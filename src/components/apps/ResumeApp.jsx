import { Code2, Download, ExternalLink, GraduationCap, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import {
  SiDotnet,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRender,
  SiShopify,
  SiTailwindcss,
  SiVercel,
  SiVite,
  SiCss,
} from "react-icons/si";
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

const skillGroups = [
  {
    title: "Languages",
    items: ["JavaScript", "Python", "Java", "HTML", "CSS", "Shopify Liquid"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React.js", "Next.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", ".NET", "Laravel", "FastAPI"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Neon PostgreSQL"],
  },
  {
    title: "Tools & Platforms",
    items: ["Git", "GitHub", "Docker", "Vercel", "Render", "Shopify Theme Development"],
  },
];

const skillIconMap = {
  "React.js": { icon: SiReact, color: "#61dafb" },
  "Next.js": { icon: SiNextdotjs, color: "#f8fafc" },
  Vite: { icon: SiVite, color: "#a78bfa" },
  JavaScript: { icon: SiJavascript, color: "#f7df1e" },
  Python: { icon: SiPython, color: "#facc15" },
  Java: { icon: SiOpenjdk, color: "#f97316" },
  HTML: { icon: SiHtml5, color: "#fb923c" },
  CSS: { icon: SiCss, color: "#60a5fa" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38bdf8" },
  "Node.js": { icon: SiNodedotjs, color: "#86efac" },
  "Express.js": { icon: SiExpress, color: "#f8fafc" },
  ".NET": { icon: SiDotnet, color: "#c4b5fd" },
  Laravel: { icon: SiLaravel, color: "#fb7185" },
  FastAPI: { icon: SiFastapi, color: "#2dd4bf" },
  PostgreSQL: { icon: SiPostgresql, color: "#93c5fd" },
  MongoDB: { icon: SiMongodb, color: "#6ee7b7" },
  MySQL: { icon: SiMysql, color: "#7dd3fc" },
  "Neon PostgreSQL": { icon: SiPostgresql, color: "#67e8f9" },
  Git: { icon: SiGit, color: "#fb923c" },
  GitHub: { icon: SiGithub, color: "#f8fafc" },
  Docker: { icon: SiDocker, color: "#60a5fa" },
  Vercel: { icon: SiVercel, color: "#f8fafc" },
  Render: { icon: SiRender, color: "#a78bfa" },
  "Shopify Theme Development": { icon: SiShopify, color: "#bef264" },
  "Shopify Liquid": { icon: SiShopify, color: "#bef264" },
};

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
        <Section title="Skills">
          <div style={styles.skillGroupStack}>
            {skillGroups.map((group) => (
              <div key={group.title} style={styles.skillGroup}>
                <h3 style={styles.skillGroupTitle}>{group.title}</h3>
                <div style={styles.skillGrid}>
                  {group.items.map((item) => {
                    const skillIcon = skillIconMap[item] ?? { icon: Code2, color: "#bfdbfe" };
                    const SkillIcon = skillIcon.icon;

                    return (
                      <span key={item} style={styles.skillTile}>
                        <span style={{ ...styles.skillIcon, color: skillIcon.color }}>
                          <SkillIcon size={18} strokeWidth={SkillIcon === Code2 ? 2 : undefined} />
                        </span>
                        <span>{item}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Major Projects">
          <div style={styles.cardGrid}>
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
                <div style={styles.projectActions}>
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" style={styles.projectActionLink}>
                      <ExternalLink size={14} strokeWidth={2} />
                      <span>Live</span>
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" style={styles.projectActionLink}>
                      <SiGithub size={14} />
                      <span>GitHub</span>
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Experience">
          <div style={styles.cardGrid}>
            {experience.map((item) => (
              <article key={item.title} style={styles.timelineCard}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemMeta}>{item.organization}</p>
                <p style={styles.itemText}>{item.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div style={styles.cardGrid}>
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

        <Section title="Contact Info">
          <div style={styles.contactStack}>
            <a href={links.email.work} style={styles.contactRow}>
              <Mail size={16} strokeWidth={2} />
              <span>{links.email.work.replace("mailto:", "")}</span>
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
    gridTemplateColumns: "1fr",
    gap: "18px",
    alignItems: "start",
  },
  sectionCard: {
    display: "grid",
    alignContent: "start",
    alignSelf: "start",
    width: "100%",
    boxSizing: "border-box",
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
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
    gap: "14px",
    alignItems: "start",
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
  skillGroupStack: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
    gap: "16px",
    alignItems: "start",
    padding: "16px",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(15,23,42,0.22) 48%, rgba(124,58,237,0.08))",
    border: "1px solid rgba(148,163,184,0.08)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  },
  skillGroup: {
    display: "grid",
    gap: "10px",
    padding: "16px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  skillGroupTitle: {
    margin: 0,
    color: "#bfdbfe",
    fontSize: "0.82rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  skillGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(138px, 1fr))",
    gap: "10px",
  },
  skillTile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minHeight: "42px",
    padding: "9px 11px",
    borderRadius: "14px",
    background: "linear-gradient(180deg, rgba(30,41,59,0.72), rgba(15,23,42,0.56))",
    border: "1px solid rgba(148,163,184,0.16)",
    color: "#dbeafe",
    fontSize: "0.84rem",
    lineHeight: 1.3,
  },
  skillIcon: {
    display: "inline-grid",
    placeItems: "center",
    width: "28px",
    height: "28px",
    flex: "0 0 auto",
    borderRadius: "9px",
    background: "rgba(255,255,255,0.07)",
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
  projectActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "12px",
  },
  projectActionLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    minHeight: "32px",
    padding: "7px 10px",
    borderRadius: "10px",
    border: "1px solid rgba(96,165,250,0.18)",
    background: "rgba(59,130,246,0.12)",
    color: "#dbeafe",
    textDecoration: "none",
    fontSize: "0.78rem",
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
