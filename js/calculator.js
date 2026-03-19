// calculator.js

export function calculateOhmsLaw(v, i, r) {

    // Robust parsing (Convert to numbers, treat empty/missing as null)
    v = v === '' ? null : Number(v);
    if (!Number.isFinite(v)) v = null;

    i = i === '' ? null : Number(i);
    if (!Number.isFinite(i)) i = null;

    r = r === '' ? null : Number(r);
    if (!Number.isFinite(r)) r = null;

    let result = {
        voltage: v, 
        current: i,
        resistance: r,
        power: null,
        filled: 0,
        warning: []
    };

    // Count how many values we have
    if (v !== null) result.filled++;
    if (i !== null) result.filled++;
    if (r !== null) result.filled++;

    if (result.filled < 2) {
        return result; // not enough data
    }

    if (result.filled === 3) {
        // All three given → just compute power + check consistency
        if (Math.abs(v - i * r) > 0.0001 * Math.max(v, i * r || 1)) {
            result.warning.push("Values are inconsistent (V ≠ I × R)");
        }
    }
    else if (v !== null && i !== null) {
        // V and I known → find R
        if (i === 0) {
            result.warning.push("Cannot divide by zero current");
        } else {
            result.resistance = v / i;
        }
    }
    else if (v !== null && r !== null) {
        // V and R known → find I
        if (r === 0) {
            result.warning.push("Cannot divide by zero current");
        } else {
            result.current = v / r;
        }
    }
    else if (i !== null && r !== null) {
        // I and R known → find V
        result.voltage = i * r;
    }

    // Compute Power
    if (result.voltage !== null && result.current !== null) {
        result.power = result.voltage * result.current;
    }

    // Safety warning for body contact (very rough rule of thumb)
    if (result.current !== null && result.current > 0.01) {
        result.warning.push("Current > 10 mA — potentially unsafe for direct body contact");
    }

    return result;
}