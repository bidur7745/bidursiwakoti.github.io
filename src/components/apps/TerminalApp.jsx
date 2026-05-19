import { useMemo, useState } from "react";
import { personalInfo } from "../../data/personalInfo.js";
import { projects } from "../../data/projects.js";
import { skills } from "../../data/skills.js";
import WindowControls from "../window/WindowControls.jsx";

function createCommandMap() {
  return {
    "evilos --help": [
      "Available commands:",
      "  evilos --help        Show this help menu",
      "  whoami               Show profile identity",
      "  skills --list        Show core technical skills",
      "  projects --featured  Show featured projects",
      "  mission              Show long-term goals",
      "  contact              Show contact guidance",
      "  clear                Clear terminal output",
    ],
    whoami: [
      `${personalInfo.fullName} aka ${personalInfo.nickname}`,
      personalInfo.currentRole,
      `${personalInfo.location} | ${personalInfo.tagline}`,
    ],
    "skills --list": [
      `frontend: ${skills.frontend.slice(0, 5).join(", ")}`,
      `backend: ${skills.backend.slice(0, 4).join(", ")}`,
      `ai/ml: ${skills.aiAndMachineLearning.slice(0, 4).join(", ")}`,
      `shopify: ${skills.shopify.join(", ")}`,
    ],
    "projects --featured": projects.slice(0, 4).map((project) => `${project.name} -> ${project.role}`),
    mission: personalInfo.goals.longTerm,
    contact: [
      personalInfo.contactMessage,
      "Preferred channels: Email / LinkedIn / GitHub",
    ],
  };
}

export default function TerminalApp({
  isExpanded = false,
  onClose,
  onMinimize,
  onToggleExpand,
  onDragStart,
}) {
  const commandMap = useMemo(() => createCommandMap(), []);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    const command = input.trim();

    if (!command) {
      return;
    }

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = commandMap[command] ?? [
      `Command not found: ${command}`,
      "Run `evilos --help` to see available commands.",
    ];

    setHistory((current) => [...current, { command, output }]);
    setInput("");
  }

  return (
    <div style={styles.page}>
      <div
        style={styles.header}
        onPointerDown={(event) => {
          if (event.target.closest(".window-controls")) {
            return;
          }

          onDragStart?.(event);
        }}
      >
        <WindowControls
          isExpanded={isExpanded}
          onClose={onClose}
          onMinimize={onMinimize}
          onToggleExpand={onToggleExpand}
        />
        <span style={styles.headerTitle}>evileverest@portfolio: ~</span>
      </div>

      <div style={styles.terminalBody}>
        {history.map((entry, index) => (
          <div key={`${entry.command}-${index}`} style={styles.commandBlock}>
            <div style={styles.promptRow}>
              <span style={styles.promptUser}>bidur@evileverest</span>
              <span style={styles.promptPath}>~</span>
              <span style={styles.promptCommand}>$ {entry.command}</span>
            </div>

            <div style={styles.outputList}>
              {entry.output.map((line) => (
                <p key={`${entry.command}-${line}`} style={styles.outputLine}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        <form style={styles.promptForm} onSubmit={handleSubmit}>
          <div style={styles.promptRow}>
            <span style={styles.promptUser}>bidur@evileverest</span>
            <span style={styles.promptPath}>~</span>
            <label htmlFor="terminal-input" style={styles.hiddenLabel}>
              Terminal input
            </label>
            <span style={styles.promptDollar}>$</span>
            <input
              id="terminal-input"
              type="text"
              value={input}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              onChange={(event) => setInput(event.target.value)}
              style={styles.input}
              placeholder="Type evilos --help"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(180deg, rgba(2,6,23,0.96), rgba(15,23,42,0.92))",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(15,23,42,0.92)",
    cursor: "grab",
    userSelect: "none",
    touchAction: "none",
  },
  headerDots: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "999px",
  },
  headerTitle: {
    color: "#94a3b8",
    fontSize: "0.82rem",
    whiteSpace: "nowrap",
  },
  terminalBody: {
    flex: 1,
    padding: "20px",
    fontFamily: '"SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
    display: "grid",
    gap: "18px",
    minHeight: "320px",
    alignContent: "start",
    overflow: "auto",
  },
  commandBlock: {
    display: "grid",
    gap: "10px",
  },
  promptForm: {
    margin: 0,
  },
  promptRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    lineHeight: 1.6,
    alignItems: "center",
  },
  promptUser: {
    color: "#34d399",
  },
  promptPath: {
    color: "#60a5fa",
  },
  promptDollar: {
    color: "#f8fafc",
  },
  promptCommand: {
    color: "#f8fafc",
  },
  outputList: {
    display: "grid",
    gap: "6px",
    paddingLeft: "4px",
  },
  outputLine: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: 1.7,
    whiteSpace: "pre-wrap",
  },
  input: {
    flex: "1 1 220px",
    minWidth: "180px",
    border: 0,
    outline: 0,
    background: "transparent",
    color: "#f8fafc",
    font: "inherit",
    padding: 0,
  },
  hiddenLabel: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
};
