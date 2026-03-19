// circuit.js

export function updateCircuitDisplay(solution, container) {

    if (!solution || solution.filled < 2) {
        container.innerHTML = '<div style="padding:2rem;color:#777;">Enter two values to see the circuit</div>';
        return;
    }

    let v = solution.voltage?.toFixed(1) ?? '?';
    let i = solution.current != null ? solution.current.toExponential(1) : '?';
    let r = solution.resistance?.toFixed(1) ?? '?';
    let p = solution.power != null ? solution.power.toFixed(1) : '?';

    let color = '#555';
    if (solution.power != null && solution.power > 0.5) {
        color = '#c0392b';
    } else if (solution.power != null && solution.power > 0.1) {
        color = '#e67e22';
    }

    let thickness = 4;
    if (solution.current != null) {
        thickness = Math.min(2, 2 + solution.current * 500);
    }

    // ⚡ Animated current (flowing dot)
    const animation = solution.current && solution.current > 0 ? `
    <circle r="4" fill="${color}">
        <animateMotion dur="2s" repeatCount="indefinite"
            path="M150 80 L180 80 L300 80 L340 80 L340 150 L40 150 L40 80 L150 80"/>
    </circle>
    ` : '';

    const warningsSVG = solution.warning.length > 0
        ? solution.warning.map((w, idx) =>
            `<text x="260" y="180" font-size="14" fill="#c0392b" font-weight="bold">⚠ ${w}</text>`
          ).join('')
        : '';

    const svg = `
<svg width="100%" height="200" viewBox="0 0 520 200" preserveAspectRatio="xMidYMid meet">

  <!-- Battery SVG -->
  <image href="assets/icons/idle_Battery.svg" x="5" y="80" width="70" height="70"/>

  <!-- Wire --> 
  <line x1="40" y1="80" x2="180" y2="80" stroke="#000000ff" stroke-width="${thickness}"/>

  <!-- Resistor SVG -->
  <image href="assets/icons/idle_Resistor.svg" x="180" y="45" width="120" height="70"/>

  <!-- Wire -->
  <line x1="300" y1="80" x2="340" y2="80" stroke="#000000ff" stroke-width="${thickness}"/>

  <!-- Loop -->
  <line x1="340" y1="80" x2="340" y2="150" stroke="#000000ff" stroke-width="${thickness}"/>
  <line x1="40"  y1="150" x2="340" y2="150" stroke="#000000ff" stroke-width="${thickness}"/>

  <!-- Labels -->
  <text x="-50" y="120" font-size="18" fill="#1a3c6d"> ${v} V </text>
  <text x="210" y="50" font-size="18" fill="#2c3e50">R = ${r} Ω</text>
  <text x="150" y="180" font-size="18" fill="#27ae60">I = ${i} A</text>
  <text x="30"  y="180" font-size="18" fill="#7f8c8d">P = ${p} W</text>

  ${animation}
  ${warningsSVG}

</svg>`;

    container.innerHTML = svg;
}