// main.js

import { calculateOhmsLaw } from './calculator.js';
import { updateCircuitDisplay } from './circuit.js';

console.log("main.js is LOADED and running");

document.addEventListener("DOMContentLoaded", () => {

    const voltageEl   = document.getElementById('voltage');
    const currentEl   = document.getElementById('current');
    const resistanceEl = document.getElementById('resistance');
    const solutionEl  = document.getElementById('solution');
    const circuitEl   = document.getElementById('circuit');

    function updateAll() {  
        const v = voltageEl.value;
        const i = currentEl.value;
        const r = resistanceEl.value;

        const result = calculateOhmsLaw(v, i, r);

        if (result.voltage    !== null) voltageEl.value    = result.voltage.toFixed(3);
        if (result.current    !== null) currentEl.value    = result.current.toExponential(4);
        if (result.resistance !== null) resistanceEl.value = result.resistance.toFixed(3);

        let html = '';
        if (result.filled >= 2) {
            html = `
                <div class="result-line"><strong>Voltage:</strong> ${result.voltage?.toFixed(3) ?? '?'} V</div>
                <div class="result-line"><strong>Current:</strong> ${result.current != null ? result.current.toExponential(4) : '?'} A</div>
                <div class="result-line"><strong>Resistance:</strong> ${result.resistance?.toFixed(3) ?? '?'} Ω</div>
                <div class="result-line"><strong>Power:</strong> ${result.power != null ? result.power.toFixed(4) : '?'} W</div>
            `;
            if (result.warning) {
                html += `<div class="warning">${result.warning}</div>`;
            }
        } else {
            html = '<div style="color:#777;">Enter two values to calculate</div>';
        }

        solutionEl.innerHTML = html;
        updateCircuitDisplay(result, circuitEl);
    }

    voltageEl.addEventListener('input', updateAll);
    currentEl.addEventListener('input', updateAll);
    resistanceEl.addEventListener('input', updateAll);
    updateAll();
});