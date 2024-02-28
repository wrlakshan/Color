import { useState } from "react";
import Logo from "/icon.svg";
import "./App.css";

function App() {
  const [color, setColor] = useState("#000000");

  const Click = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src={Logo} className="app-logo" alt="logo" />
        <h1>Change Page Color</h1>
      </header>
      <main className="app-main">
        <div className="color-picker">
          <label htmlFor="colorInput" className="color-label">
            Select Color:
          </label>
          <input
            id="colorInput"
            type="color"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          />
        </div>
        <button className="change-color-btn" onClick={Click}>
          Change Color
        </button>
      </main>
    </div>
  );
}

export default App;
