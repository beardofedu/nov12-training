// DEMO (Code quality): reliability and maintainability findings.

function applyDiscount(total, code) {
  // DEMO: unused local variable — js/unused-local-variable
  let unusedRate = 0.15;

  // DEMO: comparison of a value with itself — js/comparison-of-identical-expressions
  if (code == code) {
    if (code === 'SAVE10') {
      return total * 0.9;
    }
  }

  // DEMO: duplicated logic that should be a lookup table
  if (code === 'SAVE20') {
    return total * 0.8;
  }
  if (code === 'SAVE30') {
    return total * 0.7;
  }
  return total;
}

function applyDiscountLegacy(total, code) {
  // DEMO: near-duplicate of applyDiscount — maintainability smell
  if (code === 'SAVE10') {
    return total * 0.9;
  }
  if (code === 'SAVE20') {
    return total * 0.8;
  }
  return total;
}

async function loadPrices(fetchPrices) {
  try {
    // DEMO: missing await means the catch block never sees the rejection
    return fetchPrices();
  } catch (e) {
    // DEMO: swallowed error
  }
}

module.exports = { applyDiscount, applyDiscountLegacy, loadPrices };
