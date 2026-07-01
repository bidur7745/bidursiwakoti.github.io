import { useEffect, useMemo, useState } from "react";
import "../../assets/style/calculator.css";
import WindowControls from "../window/WindowControls.jsx";

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

export default function CalculatorApp({
  isExpanded = false,
  onClose,
  onMinimize,
  onToggleExpand,
  onDragStart,
}) {
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
      <section className="calculator-shell" aria-label="Calculator">
        <header
          className="calculator-titlebar"
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
          <p className="calculator-title">Calculator</p>
          <span className="calculator-titlebar-spacer" aria-hidden="true" />
        </header>

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
      </section>
    </div>
  );
}
