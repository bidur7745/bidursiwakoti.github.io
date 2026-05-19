import { academicInterests } from "../../data/education.js";
import { skills } from "../../data/skills.js";

const groupedSkills = [
  { title: "Frontend", items: skills.frontend, tone: "blue" },
  { title: "Backend", items: skills.backend, tone: "violet" },
  { title: "Database", items: skills.databases, tone: "cyan" },
  { title: "AI/ML", items: skills.aiAndMachineLearning, tone: "emerald" },
  {
    title: "Tools",
    items: skills.tools.filter((item) => !["Vercel", "Render", "Neon", "Cloudinary"].includes(item)),
    tone: "amber",
  },
  {
    title: "Deployment",
    items: ["Vercel", "Render", "Neon", "Cloudinary"],
    tone: "rose",
  },
  { title: "Shopify", items: skills.shopify, tone: "sky" },
  { title: "Academic/Research", items: academicInterests, tone: "slate" },
];

function SkillSection({ title, items, tone }) {
  return (
    <section style={styles.sectionCard}>
      <div style={styles.sectionHeader}>
        <span style={{ ...styles.colorDot, ...toneStyles[tone] }} />
        <h2 style={styles.sectionTitle}>{title}</h2>
      </div>
      <div style={styles.badgeWrap}>
        {items.map((item) => (
          <span key={item} style={{ ...styles.badge, ...badgeStyles[tone] }}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function SkillsApp() {
  return (
    <div style={styles.page}>
      <section style={styles.heroCard}>
        <p style={styles.kicker}>Capabilities</p>
        <h1 style={styles.title}>Skills & Technical Foundation</h1>
        <p style={styles.description}>
          A portfolio-ready overview of the tools, stacks, platforms, and academic focus areas shaping EvilEverest OS and Bidur Siwakoti&apos;s broader development work.
        </p>
      </section>

      <section style={styles.grid}>
        {groupedSkills.map((group) => (
          <SkillSection key={group.title} {...group} />
        ))}
      </section>
    </div>
  );
}

const toneStyles = {
  blue: { background: "linear-gradient(135deg, #60a5fa, #2563eb)" },
  violet: { background: "linear-gradient(135deg, #c084fc, #7c3aed)" },
  cyan: { background: "linear-gradient(135deg, #22d3ee, #0f766e)" },
  emerald: { background: "linear-gradient(135deg, #34d399, #059669)" },
  amber: { background: "linear-gradient(135deg, #fbbf24, #f97316)" },
  rose: { background: "linear-gradient(135deg, #fb7185, #e11d48)" },
  sky: { background: "linear-gradient(135deg, #38bdf8, #0284c7)" },
  slate: { background: "linear-gradient(135deg, #94a3b8, #475569)" },
};

const badgeStyles = {
  blue: { background: "rgba(59,130,246,0.12)", border: "1px solid rgba(96,165,250,0.14)", color: "#dbeafe" },
  violet: { background: "rgba(168,85,247,0.12)", border: "1px solid rgba(192,132,252,0.14)", color: "#ede9fe" },
  cyan: { background: "rgba(34,211,238,0.12)", border: "1px solid rgba(103,232,249,0.14)", color: "#cffafe" },
  emerald: { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(52,211,153,0.14)", color: "#d1fae5" },
  amber: { background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.14)", color: "#fef3c7" },
  rose: { background: "rgba(244,63,94,0.12)", border: "1px solid rgba(251,113,133,0.14)", color: "#ffe4e6" },
  sky: { background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.14)", color: "#e0f2fe" },
  slate: { background: "rgba(148,163,184,0.12)", border: "1px solid rgba(148,163,184,0.14)", color: "#e2e8f0" },
};

const styles = {
  page: {
    display: "grid",
    gap: "18px",
  },
  heroCard: {
    padding: "24px",
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
  description: {
    margin: "12px 0 0",
    color: "rgba(226,232,240,0.9)",
    lineHeight: 1.7,
    maxWidth: "62ch",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  colorDot: {
    width: "12px",
    height: "12px",
    borderRadius: "999px",
  },
  sectionTitle: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "1rem",
  },
  badgeWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  badge: {
    padding: "9px 12px",
    borderRadius: "999px",
    fontSize: "0.84rem",
  },
};
