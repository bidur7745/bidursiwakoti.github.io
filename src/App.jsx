import { useState } from "react";
import Desktop from "./components/desktop/Desktop.jsx";
import BootSequence from "./components/system/BootSequence.jsx";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return <BootSequence onUnlock={() => setIsUnlocked(true)} />;
  }

  return <Desktop />;
}
