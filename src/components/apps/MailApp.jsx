import { useState } from "react";
import { Globe, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { links } from "../../data/links.js";
import { personalInfo } from "../../data/personalInfo.js";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function LinkCard({ href, icon: Icon, label, value }) {
  return (
    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" style={styles.linkCard}>
      <span style={styles.linkIconWrap}>
        <Icon size={16} strokeWidth={2} />
      </span>
      <span>
        <strong style={styles.linkLabel}>{label}</strong>
        <span style={styles.linkValue}>{value}</span>
      </span>
    </a>
  );
}

export default function MailApp() {
  const [form, setForm] = useState(initialForm);
  const [isSent, setIsSent] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSent(true);
    setForm(initialForm);
  }

  return (
    <div style={styles.page}>
      <section style={styles.sidebar}>
        <div style={styles.mailHeader}>
          <p style={styles.kicker}>Apple Mail Style</p>
          <h1 style={styles.title}>Contact Bidur</h1>
          <p style={styles.subtitle}>{personalInfo.contactMessage}</p>
        </div>

        <div style={styles.linksStack}>
          <LinkCard
            href={links.email.personal}
            icon={Mail}
            label="Email"
            value={links.email.personal.replace("mailto:", "")}
          />
          <LinkCard href={links.github} icon={FaGithub} label="GitHub" value="bidur7745" />
          <LinkCard href={links.linkedin} icon={FaLinkedinIn} label="LinkedIn" value="Profile link" />
          <LinkCard href={links.portfolio} icon={Globe} label="Portfolio" value="EvilEverest OS" />
        </div>
      </section>

      <section style={styles.composer}>
        <div style={styles.composerTop}>
          <span style={styles.composeBadge}>New Message</span>
          {isSent ? <span style={styles.successBadge}>Message queued successfully</span> : null}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.field}>
            <span style={styles.label}>Name</span>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={styles.input} required />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={styles.input}
              required
            />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Subject</span>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Project, collaboration, internship..."
              style={styles.input}
              required
            />
          </label>

          <label style={{ ...styles.field, flex: 1 }}>
            <span style={styles.label}>Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              style={styles.textarea}
              required
            />
          </label>

          <div style={styles.formFooter}>
            <p style={styles.footerText}>Frontend-only demo for now. No backend is connected yet.</p>
            <button type="submit" style={styles.sendButton}>
              <Send size={15} strokeWidth={2} />
              <span>Send</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

const styles = {
  page: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },
  sidebar: {
    display: "grid",
    gap: "16px",
    alignContent: "start",
  },
  mailHeader: {
    padding: "20px",
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
    fontSize: "1.8rem",
  },
  subtitle: {
    margin: "12px 0 0",
    color: "rgba(226,232,240,0.9)",
    lineHeight: 1.7,
  },
  linksStack: {
    display: "grid",
    gap: "12px",
  },
  linkCard: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    padding: "16px",
    borderRadius: "20px",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(180deg, rgba(15,23,42,0.76), rgba(15,23,42,0.5))",
  },
  linkIconWrap: {
    display: "inline-grid",
    placeItems: "center",
    width: "34px",
    height: "34px",
    borderRadius: "12px",
    background: "rgba(59,130,246,0.14)",
    color: "#bfdbfe",
    flexShrink: 0,
  },
  linkLabel: {
    display: "block",
    color: "#f8fafc",
    fontSize: "0.92rem",
  },
  linkValue: {
    display: "block",
    marginTop: "5px",
    color: "rgba(226,232,240,0.82)",
    lineHeight: 1.5,
  },
  composer: {
    display: "grid",
    gap: "16px",
    padding: "20px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "linear-gradient(180deg, rgba(15,23,42,0.76), rgba(15,23,42,0.52))",
  },
  composerTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  composeBadge: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(148,163,184,0.12)",
    border: "1px solid rgba(148,163,184,0.12)",
    color: "#e2e8f0",
    fontSize: "0.82rem",
  },
  successBadge: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(16,185,129,0.14)",
    border: "1px solid rgba(52,211,153,0.14)",
    color: "#d1fae5",
    fontSize: "0.82rem",
  },
  form: {
    display: "grid",
    gap: "14px",
    minHeight: 0,
  },
  field: {
    display: "grid",
    gap: "8px",
  },
  label: {
    color: "#bfdbfe",
    fontSize: "0.86rem",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.05)",
    color: "#f8fafc",
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: "180px",
    resize: "vertical",
    padding: "14px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.05)",
    color: "#f8fafc",
    outline: "none",
    font: "inherit",
  },
  formFooter: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  footerText: {
    margin: 0,
    color: "rgba(226,232,240,0.72)",
    lineHeight: 1.6,
  },
  sendButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    borderRadius: "14px",
    border: "1px solid rgba(96,165,250,0.16)",
    background: "linear-gradient(135deg, rgba(59,130,246,0.9), rgba(14,165,233,0.85))",
    color: "#eff6ff",
    cursor: "pointer",
  },
};
