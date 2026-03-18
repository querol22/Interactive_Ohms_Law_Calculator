// circuit.js  — very simple visualization (text + basic line drawing)

export function updateCircuitDisplay(solution, container) {
    if (!solution || solution.filled < 2) {
        container.innerHTML = '<div style="padding:2rem;color:#777;">Enter two values to see the circuit</div>';
        return;
    }

    let v = solution.voltage?.toFixed(3) ?? '?'; 
    let i = solution.current != null ? solution.current.toExponential(3) : '?';
    let r = solution.resistance?.toFixed(1) ?? '?';
    let p = solution.power != null ? solution.power.toFixed(4) : '?';

    let color = '#555';
    if (solution.power != null && solution.power > 0.5) {
        color = '#c0392b'; // red when power is high
    } else if (solution.power != null && solution.power > 0.1) {
        color = '#e67e22'; // orange
    }

    const svg = `
<svg width="100%" height="160" viewBox="0 0 520 160" preserveAspectRatio="xMidYMid meet">
  <!-- Battery -->
  <rect x="40" y="60" width="60" height="40" rx="4" fill="none" stroke="#333" stroke-width="5"/>
  <line x1="100" y1="70" x2="120" y2="70" stroke="#333" stroke-width="5"/>
  <line x1="100" y1="90" x2="120" y2="90" stroke="#333" stroke-width="5"/>
  <text x="50" y="50" font-size="14" fill="#1a3c6d">+ ${v} V –</text>

  <!-- Wire -->
  <line x1="120" y1="80" x2="180" y2="80" stroke="#666" stroke-width="4"/>

  <!-- Resistor (classic zigzag) -->
  <path d="M180 80 L200 50 L220 110 L240 50 L260 110 L280 80" 
        fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/>

  <!-- Closing loop -->
  <line x1="280" y1="80" x2="340" y2="80" stroke="#666" stroke-width="4"/>
  <line x1="340" y1="80" x2="340" y2="120" stroke="#666" stroke-width="4"/>
  <line x1="40"  y1="80" x2="40"  y2="120" stroke="#666" stroke-width="4"/>
  <line x1="40"  y1="120" x2="340" y2="120" stroke="#666" stroke-width="4"/>

  <!-- Labels -->
  <text x="225" y="35"  font-size="15" fill="#2c3e50">R = ${r} Ω</text>
  <text x="225" y="140" font-size="14" fill="#27ae60">I = ${i} A</text>
  <text x="80"  y="145" font-size="13" fill="#7f8c8d">P = ${p} W</text>

  ${solution.warning ? 
    `<text x="260" y="155" font-size="13" fill="#c0392b" font-weight="bold">⚠ ${solution.warning}</text>` 
    : ''}
</svg>`;

    container.innerHTML = svg;
}