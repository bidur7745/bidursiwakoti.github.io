import { useEffect, useMemo, useState } from "react";
import "../../assets/style/boot-sequence.css";
import appleIcon from "../../assets/icon/apple_icon.png";
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
  const [mode] = useState(() => (storedAuth.password ? "login" : "setup"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordHint, setPasswordHint] = useState(storedAuth.hint);
  const [savedPassword, setSavedPassword] = useState(storedAuth.password);
  const [savedHint, setSavedHint] = useState(storedAuth.hint);
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const currentTime = useMemo(
    () =>
      new Intl.DateTimeFormat("en", {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
    []
  );

  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setStage("welcome");
    }, 2600);

    return () => {
      window.clearTimeout(bootTimer);
    };
  }, []);

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
        <div className="boot-shell">
          <img src={appleIcon} alt="" className="boot-apple-icon" aria-hidden="true" />
          <div className="boot-progress-track" aria-hidden="true">
            <div className="boot-progress-fill" />
          </div>
          <p className="boot-caption">EvilEverest OS</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="welcome-screen"
      aria-label="Welcome screen"
      style={{ backgroundImage: `url(${welcomeScreen})` }}
    >
      <div className="welcome-topbar" aria-label="Current time">
        <span>{currentTime}</span>
      </div>

      <section className="welcome-login">
        <div className="welcome-avatar" aria-hidden="true">B</div>
        <h1 className="welcome-title">Bidur Siwakoti</h1>
        <p className="welcome-subtitle">
          {mode === "setup" ? "Set up EvilEverest OS" : "EvilEverest OS"}
        </p>

        <form className="welcome-form" onSubmit={handleSubmit}>
          {mode === "setup" ? (
            <>
              <div className="welcome-setup-fields">
                <input
                  autoFocus
                  id="portfolio-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="New password"
                  className="welcome-input"
                  aria-label="New password"
                />
                <input
                  id="portfolio-password-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm password"
                  className="welcome-input"
                  aria-label="Confirm password"
                />
                <input
                  id="portfolio-password-hint"
                  type="text"
                  value={passwordHint}
                  onChange={(event) => setPasswordHint(event.target.value)}
                  placeholder="Password hint"
                  className="welcome-input"
                  aria-label="Password hint"
                />
              </div>
              <button type="submit" className="welcome-submit-wide">
                Continue
              </button>
            </>
          ) : (
            <>
              <div className="welcome-password-row">
                <input
                  autoFocus
                  id="portfolio-password-login"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter Password"
                  className="welcome-input"
                  aria-label="Password"
                />
                <button type="submit" className="welcome-submit-round" aria-label="Enter desktop">
                  <span aria-hidden="true">&gt;</span>
                </button>
              </div>
            </>
          )}

          {error ? (
            <p className="welcome-message is-error">
              {error}
              {showHint && savedHint ? ` Hint: ${savedHint}` : ""}
            </p>
          ) : (
            <p className="welcome-message">
              {mode === "setup" ? "Create a local password for this portfolio." : "Enter your password to continue."}
            </p>
          )}
        </form>
      </section>

      <div className="welcome-footer">
        <span>Portfolio desktop</span>
      </div>
    </main>
  );
}
