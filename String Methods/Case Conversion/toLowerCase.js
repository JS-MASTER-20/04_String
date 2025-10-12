// JavaScript String.prototype.toLowerCase() — Cheatsheet (Interview‑Friendly)

// The toLowerCase() method returns a NEW string with all alphabetic characters converted to lowercase,
// using Unicode’s default case mapping. It does NOT modify the original string (strings are immutable).

// Syntax:
//    str.toLowerCase()
//
// Arguments:
//    • None (0 arguments).
//
// Returns:
//    • A new string (may be the same text if there are no uppercase letters).
//
// Key Notes:
//    • Non‑mutating: original string remains unchanged.
//    • Unicode‑aware (default mapping), but NOT locale‑specific.
//    • Length can change in rare cases (e.g., "İ" (U+0130) → "i̇" (two code points: i + combining dot)).
//    • Works on string primitives and String objects; throws TypeError if called with null/undefined as this.
//    • Prefer toLocaleLowerCase(locale) for locale‑sensitive rules (e.g., Turkish).
//    • Time complexity: O(n) over string length.
//
// Interview Tips & Gotchas:
//    1) Immutability: Always returns a new string (strings are immutable in JS).
//    2) Locale differences: "I".toLowerCase() → "i" (English) but in Turkish it should be "ı" (dotless i).
//       Use toLocaleLowerCase("tr") for correct Turkish behavior.
//    3) Special casing: Greek sigma (Σ) lowercases context‑sensitively to σ/ς; uppercase dotted İ becomes "i̇".
//    4) Case‑insensitive comparisons: strA.toLowerCase() === strB.toLowerCase() is common, but for i18n
//       use Intl.Collator with { sensitivity: "base" }.
//    5) Normalization: Case conversion doesn’t normalize accents. Combine with normalize('NFC') if needed.
//    6) Error behavior: String.prototype.toLowerCase.call(null) → TypeError (null/undefined not allowed).
//    7) Idempotent when already lowercase: calling repeatedly doesn’t change the result.

// -------------------------------------------------------------
// 1) Basic usage with ASCII letters
const ex1 = "HELLO World";
const res1 = ex1.toLowerCase();
console.log(res1);                   // OUTPUT: "hello world"
console.log(ex1);                    // OUTPUT: "HELLO World" (original unchanged)

// -------------------------------------------------------------
// 2) Non‑alphabetic characters are unaffected (digits, punctuation)
const ex2 = "PRICE: $99.99!";
console.log(ex2.toLowerCase());      // OUTPUT: "price: $99.99!"

// -------------------------------------------------------------
// 3) Works on string literals and String objects
console.log("ABC".toLowerCase());               // OUTPUT: "abc"
console.log(new String("MIXED").toLowerCase()); // OUTPUT: "mixed"

// -------------------------------------------------------------
// 4) Original remains unchanged (immutability demo)
let ex4 = "IMMUTABLE?";
let res4 = ex4.toLowerCase();
console.log(ex4);                    // OUTPUT: "IMMUTABLE?"
console.log(res4);                   // OUTPUT: "immutable?"

// -------------------------------------------------------------
// 5) Idempotence: repeating doesn’t change further
const ex5 = "already lower";
console.log(ex5.toLowerCase().toLowerCase());   // OUTPUT: "already lower"

// -------------------------------------------------------------
// 6) Numbers, emojis, and punctuation stay the same; letters get lowercased
const ex6 = "MIX 123 😄 OK!";
console.log(ex6.toLowerCase());      // OUTPUT: "mix 123 😄 ok!"

// -------------------------------------------------------------
// 7) Type coercion rules (null/undefined vs others)
try {
  console.log(String.prototype.toLowerCase.call(null));
} catch (e) {
  console.log("TypeError on null");  // OUTPUT: "TypeError on null"
}
try {
  console.log(String.prototype.toLowerCase.call(undefined));
} catch (e) {
  console.log("TypeError on undefined"); // OUTPUT: "TypeError on undefined"
}
// Other primitives are coerced to string:
console.log(String.prototype.toLowerCase.call(123));     // OUTPUT: "123"
console.log(String.prototype.toLowerCase.call(true));    // OUTPUT: "true"

// -------------------------------------------------------------
// 8) Case‑insensitive comparison (simple, non‑locale‑sensitive)
function equalIgnoreCase(a, b) {
  return String(a).toLowerCase() === String(b).toLowerCase();
}
console.log(equalIgnoreCase("NodeJS", "nodejs"));        // OUTPUT: true
console.log(equalIgnoreCase("Résumé", "RÉSUMÉ"));        // OUTPUT: true

// -------------------------------------------------------------
// 27) Quick summary (copy‑ready)
// • Returns new lowercase string; original unchanged.
// • 0 arguments; Unicode default mapping (not locale‑aware).
// • Use toLocaleLowerCase(locale) for language‑specific needs (e.g., Turkish).
// • Length may change (e.g., "İ" → "i̇") due to combining marks.
// • Throws TypeError if called with null/undefined as this value.
// • Useful for case‑insensitive search/compare/sorting (with i18n caveats).
