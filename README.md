# ⚡ Interactive Ohm’s Law & Power Calculator

A web-based engineering tool to solve Ohm’s Law (V, I, R) with real-time circuit visualization and power estimation.

Designed as a lightweight, interactive reference for electrical engineering and biomedical instrumentation applications.

---

## 🚀 Features

- 🔢 Auto-solves any two variables (Voltage, Current, Resistance)
- ⚡ Power calculation: P = V × I
- 🎨 Dynamic SVG circuit visualization
- 🔥 Visual feedback based on power (color + thickness)
- ⚠️ Safety warnings for high current levels (>10 mA)
- 🧠 Robust input handling (invalid/partial inputs)

---

## 🧪 Example Use Cases

- Quick circuit checks during design
- Educational tool for Ohm’s Law
- Bioinstrumentation (e.g. electrode current safety)
- Rapid prototyping reference

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (ES6 modules)
- SVG (for circuit rendering)

---

## 📂 Project Structure
Interactive_Ohms_Law_Calculator/
│
├── README.md
├── interactiveOhmsLaw.html
├── css/
│ └── styles.css
├── js/
│ ├── main.js # UI logic
│ ├── calculator.js # Physics calculations
│ ├── circuit.js # SVG rendering
│ ├── ui.js # Pending 
│ └── utils.js # Pending
└── assets/
└── icons/
├── idle_Battery.svg
└── idle_Resistor.svg

---

## ▶️ How to Run

### Option 1 (Recommended)
Use VS Code with **Live Server**:
- Right-click `interactiveOhmsLaw.html`
- Click *"Open with Live Server"*

### Option 2 (Terminal)
```bash
python3 -m http.server 8000

Then open:
http://localhost:8000/interactiveOhmsLaw.html