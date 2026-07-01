import { useEffect, useMemo, useState } from "react";

const OPERATORS = {
  divide: "÷",
  multiply: "×",
  subtract: "-",
  add: "+",
};

const BUTTON_ROWS = [
  [
    { label: "AC", type: "utility", action: "clear" },
    { label: "±", type: "utility", action: "sign" },
    { label: "%", type: "utility", action: "percent" },
    { label: OPERATORS.divide, type: "operator", action: "operator", value: OPERATORS.divide },
  ],
  [
    { label: "7", action: "digit", value: "7" },
    { label: "8", action: "digit", value: "8" },
    { label: "9", action: "digit", value: "9" },
    { label: OPERATORS.multiply, type: "operator", action: "operator", value: OPERATORS.multiply },
  ],
  [
    { label: "4", action: "digit", value: "4" },
    { label: "5", action: "digit", value: "5" },
    { label: "6", action: "digit", value: "6" },
    { label: OPERATORS.subtract, type: "operator", action: "operator", value: OPERATORS.subtract },
  ],
  [
    { label: "1", action: "digit", value: "1" },
    { label: "2", action: "digit", value: "2" },
    { label: "3", action: "digit", value: "3" },
    { label: OPERATORS.add, type: "operator", action: "operator", value: OPERATORS.add },
  ],
  [
    { label: "0", action: "digit", value: "0", wide: true },
    { label: ".", action: "decimal" },
    { label: "=", type: "operator", action: "equals" },
  ],
];

function compute(left, right, operator) {
  if (operator === OPERATORS.add) {
    return left + right;
  }

  if (operator === OPERATORS.subtract) {
    return left - right;
  }

  if (operator === OPERATORS.multiply) {
    return left * right;
  }

  if (operator === OPERATORS.divide) {
    return right === 0 ? Number.NaN : left / right;
  }

  return right;
}

function formatDisplay(value) {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  const rounded = Number(value.toPrecision(12));
  const next = String(rounded);

  return next.length <= 12 ? next : rounded.toExponential(6);
}

function getOperatorFromKey(key) {
  if (key === "/") return OPERATORS.divide;
  if (key === "*") return OPERATORS.multiply;
  if (key === "-") return OPERATORS.subtract;
  if (key === "+") return OPERATORS.add;
  return null;
}

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const expressionLabel = useMemo(() => {
    if (storedValue === null || !operator) {
      return "";
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
    if (display === "Error" || waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    setDisplay((current) => {
      if (current.replace("-", "").replace(".", "").length >= 12) {
        return current;
      }

      return current === "0" ? digit : `${current}${digit}`;
    });
  }

  function inputDecimal() {
    if (display === "Error" || waitingForOperand) {
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

    setDisplay(formatDisplay(Number.parseFloat(display) / 100));
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
    if (display === "Error" || !operator || storedValue === null) {
      return;
    }

    const result = compute(storedValue, Number.parseFloat(display), operator);
    setDisplay(formatDisplay(result));
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }

  function handleButtonPress(button) {
    if (button.action === "clear") resetAll();
    if (button.action === "sign") toggleSign();
    if (button.action === "percent") percentage();
    if (button.action === "digit") inputDigit(button.value);
    if (button.action === "decimal") inputDecimal();
    if (button.action === "operator") setNextOperator(button.value);
    if (button.action === "equals") evaluate();
  }

  useEffect(() => {
    function handleKeyDown(event) {
      const target = event.target;
      const isTypingField =
        target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);

      if (isTypingField) {
        return;
      }

      if (/^\d$/.test(event.key)) {
        event.preventDefault();
        inputDigit(event.key);
        return;
      }

      const keyOperator = getOperatorFromKey(event.key);

      if (keyOperator) {
        event.preventDefault();
        setNextOperator(keyOperator);
        return;
      }

      if (event.key === ".") {
        event.preventDefault();
        inputDecimal();
        return;
      }

      if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        evaluate();
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        resetAll();
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        backspace();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="calculator-app">
      <style>{`
        .calculator-app {
          display: grid;
          place-items: center;
          min-height: 100%;
          margin: -6px;
          color: #f5f5f7;
        }

        .calculator-shell {
          width: min(100%, 330px);
          min-width: 252px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 30px;
          background:
            linear-gradient(180deg, rgba(45, 45, 48, 0.98), rgba(22, 22, 24, 0.98)),
            #1f1f21;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 22px 60px rgba(2, 6, 23, 0.34);
        }

        .calculator-display {
          display: grid;
          align-content: end;
          min-height: 112px;
          padding: 10px 6px 16px;
          text-align: right;
        }

        .calculator-expression {
          min-height: 20px;
          margin: 0 0 6px;
          color: rgba(245, 245, 247, 0.46);
          font-size: 0.9rem;
          line-height: 1.2;
        }

        .calculator-value {
          margin: 0;
          overflow: hidden;
          color: #ffffff;
          font-size: clamp(2.45rem, 11vw, 4.25rem);
          font-weight: 300;
          letter-spacing: 0;
          line-height: 0.98;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }

        .calculator-key {
          display: inline-grid;
          place-items: center;
          min-width: 0;
          aspect-ratio: 1;
          border: 0;
          border-radius: 999px;
          background: linear-gradient(180deg, #626266, #4b4b4f);
          color: #ffffff;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 4px 9px rgba(0, 0, 0, 0.18);
          cursor: pointer;
          font-size: clamp(1.2rem, 3.4vw, 1.7rem);
          font-weight: 400;
          line-height: 1;
          transition:
            background-color 120ms ease,
            box-shadow 120ms ease,
            filter 120ms ease,
            transform 90ms ease;
        }

        .calculator-key:hover {
          filter: brightness(1.12);
        }

        .calculator-key:active {
          transform: scale(0.96);
          filter: brightness(1.2);
        }

        .calculator-key:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.72);
          outline-offset: 3px;
        }

        .calculator-key-utility {
          background: linear-gradient(180deg, #c7c7cc, #a6a6ab);
          color: #111113;
        }

        .calculator-key-operator {
          background: linear-gradient(180deg, #ffb13b, #ff9500);
          color: #ffffff;
          font-size: clamp(1.55rem, 4.4vw, 2.25rem);
        }

        .calculator-key-operator.is-active {
          background: #ffffff;
          color: #ff9500;
        }

        .calculator-key-wide {
          grid-column: span 2;
          aspect-ratio: auto;
          justify-content: start;
          padding-left: 26px;
          border-radius: 999px;
        }

        .calculator-hint {
          margin: 12px 4px 0;
          color: rgba(245, 245, 247, 0.38);
          font-size: 0.72rem;
          line-height: 1.35;
          text-align: center;
        }

        @media (max-width: 480px) {
          .calculator-app {
            margin: 0;
          }

          .calculator-shell {
            width: min(100%, 304px);
            padding: 13px;
            border-radius: 26px;
          }

          .calculator-display {
            min-height: 92px;
          }

          .calculator-grid {
            gap: 8px;
          }

          .calculator-key-wide {
            padding-left: 22px;
          }
        }
      `}</style>

      <section className="calculator-shell" aria-label="Calculator">
        <div className="calculator-display" aria-live="polite">
          <p className="calculator-expression">{expressionLabel}</p>
          <h1 className="calculator-value">{display}</h1>
        </div>

        <div className="calculator-grid">
          {BUTTON_ROWS.flat().map((button) => {
            const isActiveOperator =
              button.action === "operator" &&
              operator === button.value &&
              waitingForOperand;
            const className = [
              "calculator-key",
              button.type === "utility" ? "calculator-key-utility" : "",
              button.type === "operator" ? "calculator-key-operator" : "",
              button.wide ? "calculator-key-wide" : "",
              isActiveOperator ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={`${button.label}-${button.action}`}
                type="button"
                className={className}
                aria-label={button.label === "±" ? "Toggle positive or negative" : button.label}
                onClick={() => handleButtonPress(button)}
              >
                {button.label}
              </button>
            );
          })}
        </div>

        <p className="calculator-hint">Keyboard: numbers, +, -, *, /, Enter, Escape, Backspace</p>
      </section>
    </div>
  );
}
