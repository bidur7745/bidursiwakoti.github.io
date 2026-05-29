import { useMemo, useState } from "react";

const DIGIT_BUTTONS = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

function compute(left, right, operator) {
  if (operator === "+") {
    return left + right;
  }

  if (operator === "-") {
    return left - right;
  }

  if (operator === "×") {
    return left * right;
  }

  if (operator === "÷") {
    if (right === 0) {
      return Number.NaN;
    }

    return left / right;
  }

  return right;
}

function formatDisplay(value) {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  const rounded = Number(value.toPrecision(12));
  const next = String(rounded);

  if (next.length <= 12) {
    return next;
  }

  return rounded.toExponential(6);
}

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const expressionLabel = useMemo(() => {
    if (storedValue === null || !operator) {
      return "Ready";
    }

    return `${formatDisplay(storedValue)} ${operator}`;
  }, [operator, storedValue]);

  function resetAll() {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }

  function inputDigit(digit) {
    if (display === "Error") {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    setDisplay((current) => (current === "0" ? digit : `${current}${digit}`));
  }

  function inputDecimal() {
    if (display === "Error") {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((current) => `${current}.`);
    }
  }

  function backspace() {
    if (display === "Error") {
      setDisplay("0");
      return;
    }

    if (waitingForOperand) {
      return;
    }

    setDisplay((current) => {
      if (current.length <= 1 || (current.length === 2 && current.startsWith("-"))) {
        return "0";
      }

      return current.slice(0, -1);
    });
  }

  function toggleSign() {
    if (display === "Error" || display === "0") {
      return;
    }

    setDisplay((current) => (current.startsWith("-") ? current.slice(1) : `-${current}`));
  }

  function percentage() {
    if (display === "Error") {
      return;
    }

    const value = Number.parseFloat(display);
    setDisplay(formatDisplay(value / 100));
    setWaitingForOperand(false);
  }

  function setNextOperator(nextOperator) {
    if (display === "Error") {
      return;
    }

    const nextValue = Number.parseFloat(display);

    if (storedValue === null) {
      setStoredValue(nextValue);
    } else if (operator && !waitingForOperand) {
      const result = compute(storedValue, nextValue, operator);
      setDisplay(formatDisplay(result));
      setStoredValue(result);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  }

  function evaluate() {
    if (display === "Error") {
      return;
    }

    if (!operator || storedValue === null) {
      return;
    }

    const result = compute(storedValue, Number.parseFloat(display), operator);
    setDisplay(formatDisplay(result));
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }

  return (
    <div style={styles.page}>
      <section style={styles.screen}>
        <p style={styles.expression}>{expressionLabel}</p>
        <h1 style={styles.value}>{display}</h1>
      </section>

      <section style={styles.grid}>
        <button type="button" style={{ ...styles.key, ...styles.utilityKey }} onClick={resetAll}>AC</button>
        <button type="button" style={{ ...styles.key, ...styles.utilityKey }} onClick={toggleSign}>+/-</button>
        <button type="button" style={{ ...styles.key, ...styles.utilityKey }} onClick={percentage}>%</button>
        <button type="button" style={{ ...styles.key, ...styles.operatorKey }} onClick={() => setNextOperator("÷")}>÷</button>

        {DIGIT_BUTTONS.slice(0, 3).map((digit) => (
          <button key={digit} type="button" style={styles.key} onClick={() => inputDigit(digit)}>{digit}</button>
        ))}
        <button type="button" style={{ ...styles.key, ...styles.operatorKey }} onClick={() => setNextOperator("×")}>×</button>

        {DIGIT_BUTTONS.slice(3, 6).map((digit) => (
          <button key={digit} type="button" style={styles.key} onClick={() => inputDigit(digit)}>{digit}</button>
        ))}
        <button type="button" style={{ ...styles.key, ...styles.operatorKey }} onClick={() => setNextOperator("-")}>-</button>

        {DIGIT_BUTTONS.slice(6, 9).map((digit) => (
          <button key={digit} type="button" style={styles.key} onClick={() => inputDigit(digit)}>{digit}</button>
        ))}
        <button type="button" style={{ ...styles.key, ...styles.operatorKey }} onClick={() => setNextOperator("+")}>+</button>

        <button type="button" style={{ ...styles.key, ...styles.zeroKey }} onClick={() => inputDigit("0")}>0</button>
        <button type="button" style={styles.key} onClick={inputDecimal}>.</button>
        <button type="button" style={{ ...styles.key, ...styles.equalsKey }} onClick={evaluate}>=</button>
      </section>

      <button type="button" style={styles.backspace} onClick={backspace}>Delete</button>
    </div>
  );
}

const styles = {
  page: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    gap: "12px",
    minHeight: "320px",
  },
  screen: {
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "linear-gradient(180deg, rgba(15,23,42,0.8), rgba(2,6,23,0.74))",
    padding: "14px",
    minHeight: "94px",
    display: "grid",
    alignContent: "space-between",
    gap: "8px",
  },
  expression: {
    margin: 0,
    color: "rgba(191,219,254,0.82)",
    fontSize: "0.78rem",
    minHeight: "1.1rem",
  },
  value: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "clamp(1.7rem, 3.4vw, 2.35rem)",
    fontWeight: 700,
    textAlign: "right",
    lineHeight: 1.1,
    letterSpacing: "0.02em",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "10px",
    alignContent: "start",
  },
  key: {
    borderRadius: "13px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "linear-gradient(180deg, rgba(30,41,59,0.86), rgba(15,23,42,0.72))",
    color: "#f8fafc",
    minHeight: "48px",
    fontSize: "1rem",
    fontWeight: 600,
  },
  utilityKey: {
    color: "#dbeafe",
    background: "linear-gradient(180deg, rgba(71,85,105,0.92), rgba(51,65,85,0.74))",
  },
  operatorKey: {
    color: "#fef3c7",
    background: "linear-gradient(180deg, rgba(245,158,11,0.92), rgba(217,119,6,0.84))",
    border: "1px solid rgba(253,230,138,0.4)",
  },
  equalsKey: {
    color: "#eff6ff",
    background: "linear-gradient(180deg, rgba(37,99,235,0.92), rgba(29,78,216,0.84))",
    border: "1px solid rgba(147,197,253,0.48)",
  },
  zeroKey: {
    gridColumn: "span 2",
  },
  backspace: {
    justifySelf: "end",
    borderRadius: "10px",
    border: "1px solid rgba(148,163,184,0.4)",
    padding: "7px 10px",
    color: "#dbeafe",
    background: "rgba(15,23,42,0.55)",
    fontSize: "0.78rem",
  },
};
