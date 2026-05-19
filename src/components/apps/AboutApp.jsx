import { GraduationCap, MapPin, Mountain, Sparkles, Target, UserRound } from "lucide-react";
import { academicInterests, education, futureAcademicGoals } from "../../data/education.js";
import { personalInfo } from "../../data/personalInfo.js";

const topEducation = education[0];

function SectionCard({ icon: Icon, title, children }) {
  return (
    <section style={styles.sectionCard}>
      <div style={styles.sectionHeading}>
        <span style={styles.sectionIconWrap}>
          <Icon size={16} strokeWidth={2} />
        </span>
        <h3 style={styles.sectionTitle}>{title}</h3>
      </div>
      <div>{children}</div>
    </section>
  );
}

export default function AboutApp() {
  return (
    <div style={styles.page}>
      <section style={styles.heroCard}>
        <div style={styles.heroTopRow}>
          <span style={styles.identityBadge}>About Me</span>
          <span style={styles.tagline}>{personalInfo.tagline}</span>
        </div>

        <div style={styles.heroGrid}>
          <div>
            <h1 style={styles.heroTitle}>{personalInfo.fullName}</h1>
            <p style={styles.heroSubtitle}>Also known as {personalInfo.nickname}</p>
            <p style={styles.heroText}>{personalInfo.shortIntroduction}</p>
          </div>

          <div style={styles.identityPanel}>
            <div style={styles.identityRow}>
              <UserRound size={16} strokeWidth={2} />
              <span>{personalInfo.currentRole}</span>
            </div>
            <div style={styles.identityRow}>
              <MapPin size={16} strokeWidth={2} />
              <span>{personalInfo.location}</span>
            </div>
            <div style={styles.identityRow}>
              <Mountain size={16} strokeWidth={2} />
              <span>{personalInfo.preferredName} / {personalInfo.nickname}</span>
            </div>
          </div>
        </div>
      </section>

      <div style={styles.contentGrid}>
        <SectionCard icon={Sparkles} title="Identity">
          <p style={styles.bodyText}>{personalInfo.professionalIdentity}</p>
        </SectionCard>

        <SectionCard icon={GraduationCap} title="Academic Background">
          <div style={styles.timelineItem}>
            <p style={styles.timelineTitle}>{topEducation.degree}</p>
            <p style={styles.timelineMeta}>{topEducation.institution}</p>
            <p style={styles.timelineMeta}>{topEducation.affiliation}</p>
            <p style={styles.timelineStatus}>{topEducation.status}</p>
          </div>
          <div style={styles.interestList}>
            {academicInterests.slice(0, 6).map((item) => (
              <span key={item} style={styles.pill}>
                {item}
              </span>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={Target} title="Interests">
          <div style={styles.dualList}>
            <div>
              <p style={styles.listLabel}>Technical</p>
              <div style={styles.interestList}>
                {personalInfo.interests.technical.slice(0, 6).map((item) => (
                  <span key={item} style={styles.pill}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p style={styles.listLabel}>Broader Interests</p>
              <div style={styles.interestList}>
                {personalInfo.interests.nonTechnical.slice(0, 6).map((item) => (
                  <span key={item} style={styles.pillMuted}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard icon={Target} title="Long-Term Goals">
          <p style={styles.bodyText}>{futureAcademicGoals}</p>
          <ul style={styles.goalList}>
            {personalInfo.goals.longTerm.map((goal) => (
              <li key={goal} style={styles.goalItem}>
                {goal}
              </li>
            ))}
          </ul>
        </SectionCard>
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
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    padding: "24px",
    background: "linear-gradient(180deg, rgba(30,41,59,0.82), rgba(15,23,42,0.62))",
    boxShadow: "0 24px 60px rgba(2,6,23,0.22)",
  },
  heroTopRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "18px",
  },
  identityBadge: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(96,165,250,0.14)",
    border: "1px solid rgba(147,197,253,0.18)",
    color: "#bfdbfe",
    fontSize: "0.78rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  tagline: {
    color: "rgba(226,232,240,0.88)",
    fontSize: "0.92rem",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },
  heroTitle: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3rem)",
    lineHeight: 1,
    color: "#f8fafc",
  },
  heroSubtitle: {
    margin: "10px 0 0",
    color: "#93c5fd",
    fontSize: "1rem",
  },
  heroText: {
    margin: "16px 0 0",
    color: "rgba(226,232,240,0.92)",
    lineHeight: 1.75,
    maxWidth: "60ch",
  },
  identityPanel: {
    display: "grid",
    gap: "12px",
    alignContent: "start",
    padding: "18px",
    borderRadius: "20px",
    background: "rgba(15,23,42,0.5)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  identityRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    color: "#e2e8f0",
    lineHeight: 1.5,
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },
  sectionCard: {
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "22px",
    padding: "20px",
    background: "linear-gradient(180deg, rgba(15,23,42,0.72), rgba(15,23,42,0.48))",
  },
  sectionHeading: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },
  sectionIconWrap: {
    display: "inline-grid",
    placeItems: "center",
    width: "30px",
    height: "30px",
    borderRadius: "10px",
    background: "rgba(96,165,250,0.14)",
    color: "#bfdbfe",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1rem",
    color: "#f8fafc",
  },
  bodyText: {
    margin: 0,
    color: "rgba(226,232,240,0.9)",
    lineHeight: 1.75,
  },
  timelineItem: {
    display: "grid",
    gap: "6px",
    marginBottom: "16px",
  },
  timelineTitle: {
    margin: 0,
    color: "#f8fafc",
    fontWeight: 600,
  },
  timelineMeta: {
    margin: 0,
    color: "rgba(191,219,254,0.82)",
  },
  timelineStatus: {
    margin: 0,
    color: "rgba(226,232,240,0.84)",
  },
  dualList: {
    display: "grid",
    gap: "16px",
  },
  listLabel: {
    margin: "0 0 10px",
    color: "#f8fafc",
    fontWeight: 600,
  },
  interestList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  pill: {
    padding: "9px 12px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.14)",
    border: "1px solid rgba(96,165,250,0.16)",
    color: "#dbeafe",
    fontSize: "0.86rem",
  },
  pillMuted: {
    padding: "9px 12px",
    borderRadius: "999px",
    background: "rgba(148,163,184,0.12)",
    border: "1px solid rgba(148,163,184,0.12)",
    color: "#e2e8f0",
    fontSize: "0.86rem",
  },
  goalList: {
    margin: "14px 0 0",
    paddingLeft: "18px",
    color: "#e2e8f0",
    lineHeight: 1.7,
  },
  goalItem: {
    marginBottom: "6px",
  },
};
