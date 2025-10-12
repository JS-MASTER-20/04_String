// JavaScript String.prototype.toUpperCase() — Cheatsheet (Interview‑Friendly)

// The toUpperCase() method returns a NEW string with all alphabetic characters converted to uppercase,
// using Unicode’s default case mapping. It does NOT modify the original string (strings are immutable).

// Syntax:
//    str.toUpperCase()
//
// Arguments:
//    • None (0 arguments).
//
// Returns:
//    • A new string (may be the same text if there are no lowercase letters).
//
// Key Notes:
//    • Non-mutating: original string remains unchanged.
//    • Unicode-aware: follows Unicode Default Case Conversion (not locale-specific).
//    • Length can change in rare cases (e.g., "ß" → "SS").
//    • Works on string primitives and String objects; throws TypeError if called with null/undefined as this.
//    • For locale-sensitive uppercasing (e.g., Turkish), prefer toLocaleUpperCase(locale).
//    • Complexity: O(n) over the string length.
//
// Interview Tips & Gotchas:
//    1) Immutability: Since JS strings are immutable, toUpperCase() always returns a new string.
//    2) Locale differences: toUpperCase() is NOT locale-aware; use toLocaleUpperCase('tr') for Turkish “i/İ”.
//    3) Special characters: German “ß” maps to "SS" under default mapping (length increases).
//    4) Case-insensitive compare: A common pattern is strA.toUpperCase() === strB.toUpperCase().
//       For robust i18n comparisons, consider Intl.Collator with { sensitivity: 'base' }.
//    5) Normalization: Case conversion does not normalize accents. Consider str.normalize('NFC').
//    6) Error behavior: String.prototype.toUpperCase.call(null) → TypeError (null/undefined not allowed).
//    7) Idempotent on uppercase: Calling twice gives same result (no further change).

// -------------------------------------------------------------
// 1) Basic usage with ASCII letters
const ex1 = "hello world";
const res1 = ex1.toUpperCase();
console.log(res1);                   // OUTPUT: "HELLO WORLD"
// NOTE: ex1 is unchanged.
console.log(ex1);                    // OUTPUT: "hello world"

// -------------------------------------------------------------
// 2) Non-alphabetic characters are unaffected
const ex2 = "price: $99.99!";
console.log(ex2.toUpperCase());      // OUTPUT: "PRICE: $99.99!"

// -------------------------------------------------------------
// 3) Works on string literals due to auto-boxing
console.log("abc".toUpperCase());    // OUTPUT: "ABC"

// -------------------------------------------------------------
// 4) Original remains unchanged (immutability demo)
let ex4 = "immutable?";
let res4 = ex4.toUpperCase();
console.log(ex4);                    // OUTPUT: "immutable?"
console.log(res4);                   // OUTPUT: "IMMUTABLE?"

// -------------------------------------------------------------
// 5) Idempotence: repeating doesn’t change the result further
const ex5 = "Already UPPER";
console.log(ex5.toUpperCase().toUpperCase()); // OUTPUT: "ALREADY UPPER"

// -------------------------------------------------------------
// 6) Numbers, emojis, and punctuation stay the same
const ex6 = "mix 123 😄 ok!";
console.log(ex6.toUpperCase());      // OUTPUT: "MIX 123 😄 OK!"

// -------------------------------------------------------------
// 7) Type coercion rules (null/undefined vs others)
try {
  // Throws because 'this' is null (not object-coercible)
  console.log(String.prototype.toUpperCase.call(null));
} catch (e) {
  console.log("TypeError on null");  // OUTPUT: "TypeError on null"
}
try {
  // Throws because 'this' is undefined (not object-coercible)
  console.log(String.prototype.toUpperCase.call(undefined));
} catch (e) {
  console.log("TypeError on undefined"); // OUTPUT: "TypeError on undefined"
}
// Other primitives are coerced to string:
console.log(String.prototype.toUpperCase.call(123));     // OUTPUT: "123"
console.log(String.prototype.toUpperCase.call(true));    // OUTPUT: "TRUE"

// -------------------------------------------------------------
// 8) Case-insensitive comparison (simple, non-locale-sensitive)
function equalIgnoreCase(a, b) {
  // In interviews, mention BOTH toUpperCase() or toLowerCase() are fine here.
  return String(a).toUpperCase() === String(b).toUpperCase();
}
console.log(equalIgnoreCase("NodeJS", "nodejs"));        // OUTPUT: true
console.log(equalIgnoreCase("Résumé", "RÉSUMÉ"));        // OUTPUT: true


// -------------------------------------------------------------
// 25) Quick summary (copy-ready)
// • Returns new uppercase string; original unchanged.
// • 0 arguments; Unicode default mapping (not locale-aware).
// • Use toLocaleUpperCase(locale) for language-specific needs.
// • Length can change (e.g., "ß" → "SS").
// • Throws TypeError if called with null/undefined as this value.
// • Useful for case-insensitive search/compare/sorting (with caveats).
