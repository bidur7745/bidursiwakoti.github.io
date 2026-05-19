import { useEffect, useMemo, useState } from "react";
import startupProgress from "../../assets/macos-startup-apple-logo-progress-bar.png";
import welcomeScreen from "../../assets/welcome screen.webp";

const PASSWORD_STORAGE_KEY = "evileverest-os-password";
const HINT_STORAGE_KEY = "evileverest-os-password-hint";

function normalizePassword(value) {
  return value.trim();
}

function getStoredAuth() {
  if (typeof window === "undefined") {
    return { password: "", hint: "" };
  }

  return {
    password: window.localStorage.getItem(PASSWORD_STORAGE_KEY) ?? "",
    hint: window.localStorage.getItem(HINT_STORAGE_KEY) ?? "",
  };
}

export default function BootSequence({ onUnlock }) {
  const storedAuth = useMemo(getStoredAuth, []);
  const [stage, setStage] = useState("boot");
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [mode, setMode] = useState(() => (storedAuth.password ? "login" : "setup"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordHint, setPasswordHint] = useState(storedAuth.hint);
  const [savedPassword, setSavedPassword] = useState(storedAuth.password);
  const [savedHint, setSavedHint] = useState(storedAuth.hint);
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [bootLine, setBootLine] = useState(0);

  const bootMessages = [
    "Initializing EvilEverest OS",
    "Loading profile workspace",
    "Preparing portfolio desktop",
  ];

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setBootLine((current) => Math.min(current + 1, bootMessages.length - 1));
    }, 650);

    const bootTimer = window.setTimeout(() => {
      setStage("welcome");
    }, 2600);

    return () => {
      window.clearInterval(lineTimer);
      window.clearTimeout(bootTimer);
    };
  }, [bootMessages.length]);

  function handleOpenPrompt() {
    if (stage !== "welcome") {
      return;
    }

    setIsPromptVisible(true);
    setError("");
  }

  function handleSetupSubmit(event) {
    event.preventDefault();

    const normalizedPassword = normalizePassword(password);
    const normalizedConfirm = normalizePassword(confirmPassword);
    const normalizedHint = normalizePassword(passwordHint);

    if (!normalizedPassword || normalizedPassword.length < 4) {
      setError("Choose a password with at least 4 characters.");
      return;
    }

    if (normalizedPassword !== normalizedConfirm) {
      setError("Passwords do not match.");
      return;
    }

    if (!normalizedHint) {
      setError("Add one hint for later login attempts.");
      return;
    }

    window.localStorage.setItem(PASSWORD_STORAGE_KEY, normalizedPassword);
    window.localStorage.setItem(HINT_STORAGE_KEY, normalizedHint);
    setSavedPassword(normalizedPassword);
    setSavedHint(normalizedHint);
    setError("");
    onUnlock();
  }

  function handleLoginSubmit(event) {
    event.preventDefault();

    if (normalizePassword(password) !== savedPassword) {
      setError("Wrong password.");
      setShowHint(true);
      return;
    }

    setError("");
    onUnlock();
  }

  function handleSubmit(event) {
    if (mode === "setup") {
      handleSetupSubmit(event);
      return;
    }

    handleLoginSubmit(event);
  }

  if (stage === "boot") {
    return (
      <main className="boot-screen" aria-label="Boot screen">
        <div className="boot-screen-background" style={{ backgroundImage: `url(${startupProgress})` }} />
        <div className="boot-shell">
          <div className="boot-apple-mark" aria-hidden="true">
            <div className="boot-apple-leaf" />
            <div className="boot-apple-body" />
          </div>
          <div className="boot-status-panel">
            <p className="boot-status-title">macOS portfolio startup</p>
            <div className="boot-status-list" aria-live="polite">
              {bootMessages.map((message, index) => (
                <p key={message} className={index <= bootLine ? "is-visible" : ""}>
                  {message}
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="welcome-screen"
      aria-label="Welcome screen"
      onClick={handleOpenPrompt}
      style={{ backgroundImage: `linear-gradient(rgba(2, 6, 23, 0.14), rgba(2, 6, 23, 0.42)), url(${welcomeScreen})` }}
    >
      <div className="welcome-overlay">
        <section className="welcome-lockscreen-panel glass-panel">
          <div className="welcome-avatar">B</div>
          <h1>Bidur Siwakoti</h1>
          <p className="welcome-lockscreen-subtitle">EvilEverest OS</p>
          <p className="welcome-lockscreen-caption">
            {isPromptVisible
              ? mode === "setup"
                ? "Create your Mac-style portfolio password"
                : "Enter your password to continue"
              : "Click anywhere to begin"}
          </p>
        </section>

        {isPromptVisible ? (
          <form
            className="welcome-password-card glass-panel"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <div className="welcome-password-header">
              <div className="welcome-traffic-lights" aria-hidden="true">
                <span className="traffic-red" />
                <span className="traffic-yellow" />
                <span className="traffic-green" />
              </div>
              <p>{mode === "setup" ? "Set Password" : "Login"}</p>
            </div>

            {mode === "setup" ? (
              <>
                <label className="welcome-password-label" htmlFor="portfolio-password">
                  New password
                </label>
                <input
                  autoFocus
                  id="portfolio-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  className="welcome-password-input"
                />
                <label className="welcome-password-label" htmlFor="portfolio-password-confirm">
                  Confirm password
                </label>
                <input
                  id="portfolio-password-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Type it again"
                  className="welcome-password-input"
                />
                <label className="welcome-password-label" htmlFor="portfolio-password-hint">
                  Save one hint
                </label>
                <input
                  id="portfolio-password-hint"
                  type="text"
                  value={passwordHint}
                  onChange={(event) => setPasswordHint(event.target.value)}
                  placeholder="A clue only you understand"
                  className="welcome-password-input"
                />
              </>
            ) : (
              <>
                <label className="welcome-password-label" htmlFor="portfolio-password-login">
                  Password
                </label>
                <input
                  autoFocus
                  id="portfolio-password-login"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="welcome-password-input"
                />
                {showHint && savedHint ? <p className="welcome-password-hint">Hint: {savedHint}</p> : null}
              </>
            )}

            {error ? <p className="welcome-password-error">{error}</p> : null}

            <button type="submit" className="welcome-password-button">
              {mode === "setup" ? "Save And Enter Desktop" : "Enter Desktop"}
            </button>
          </form>
        ) : null}
      </div>
    </main>
  );
}
