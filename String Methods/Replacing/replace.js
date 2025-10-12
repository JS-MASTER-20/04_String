// JavaScript String.prototype.replace() — NO‑RegExp Masterfile (Console‑Ready)
// -----------------------------------------------------------------------------

// WHAT IT DOES (Core Concepts):
// • replace(searchString, replaceValue): Sirf FIRST occurrence ko replace karta hai. NEW string return hoti hai.
// • replaceAll(searchString, replaceValue): ALL occurrences ko replace karta hai. NEW string return hoti hai.
// • Original string immutable hoti hai (badalti nahi).
// • searchString & replaceValue string me coerce hote hain (agar function nahi hai).
// • Replacement string me special $-tokens ka support hai: $$, $&, $`, $'  (CAPTURE tokens jaise $1 yaha kaam NHI karte).
// • Agar replaceValue FUNCTION hai → signature: (match, index, string); return value literal use hoti hai (no $-expansion).
// • Empty search string ("") ke rules special hote hain (neeche detail me).

// -----------------------------------------------------------------------------
// 1) Basic: FIRST occurrence only
const s1 = "hello hello";
const r1 = s1.replace("hello", "hi");
console.log(r1);  // OUTPUT: "hi hello"
console.log(s1);  // OUTPUT: "hello hello"  (original unchanged)

// -----------------------------------------------------------------------------
// 2) Replace ALL occurrences with replaceAll()
const s2 = "abc abc abc";
const r2 = s2.replaceAll("abc", "XYZ");
console.log(r2);  // OUTPUT: "XYZ XYZ XYZ"

// -----------------------------------------------------------------------------
// 3) Not found → original string return hoti hai (function replacer bhi call NHI hota)
const s3 = "no match here";
const r3 = s3.replace("xyz", "FOUND");
console.log(r3);  // OUTPUT: "no match here"

// -----------------------------------------------------------------------------
// 4) Immutability proof
let base = "abc";
let changed = base.replace("a", "A");
console.log(base);    // OUTPUT: "abc"
console.log(changed); // OUTPUT: "Abc"

// -----------------------------------------------------------------------------
// 5) Type coercion (searchValue & replaceValue)
//    searchString → String(): number/boolean etc. string me convert ho jate hain
console.log("id=42".replace(42, "XX"));     // OUTPUT: "id=XX"
console.log("true or false".replace(true, "YES")); // OUTPUT: "true or false"  (kyonki "true" exact substring nahi mila)
console.log("abc".replace("a", 123));       // OUTPUT: "123bc" (replaceValue number → "123")

// -----------------------------------------------------------------------------
// 6) Special $-tokens (string-search me bhi work karte hain):
//    $$ → literal "$"
//    $& → matched substring
//    $` → left context
//    $' → right context
console.log("hello world".replace("hello", "[$$][$&][$`][$']"));
// OUTPUT: "[$][hello][][ world] world"

// -----------------------------------------------------------------------------
// 7) $1, $2 ... LITERAL hote hain jab regex use nahi kiya (string search me captures hote hi nahi)
console.log("foo".replace("f", "$1"));  // OUTPUT: "$1oo"

// -----------------------------------------------------------------------------
// 8) replaceValue as FUNCTION (string-search):
//    Signature: (match, index, string) → string  |  Return literal use hota hai (no $-expansion)
const s8 = "one two two three";
const r8 = s8.replace("two", (match, idx, str) => {
  // match === "two", idx === 4, str === "one two two three"
  return `[${match}@${idx}]`;
});
console.log(r8); // OUTPUT: "one [two@4] two three"

// -----------------------------------------------------------------------------
// 9) Function return literal hota hai: "$&" expand NHI hota
console.log("foo".replace("o", () => "$&")); // OUTPUT: "f$&o"

// -----------------------------------------------------------------------------
// 10) replace() sirf first ko hi touch karta hai; baaki same rehte hain
const s10 = "aaa";
console.log(s10.replace("a", "b")); // OUTPUT: "baa"

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 12) Empty search string ("") — SPECIAL:
//     • replace("", x)   → x + original  (sirf 1 baar, start me)
//     • replaceAll("", x) → har UTF‑16 code unit ke beech me + start & end (length+1 insertions)
console.log("xxx".replace("", "_"));    // OUTPUT: "_xxx"
console.log("AB".replaceAll("", "-"));  // OUTPUT: "-A-B-"

// NOTE (Unicode/Emoji): replaceAll("", x) UTF‑16 code units ke beech insert karta hai,
// emoji surrogate pair ko beech me tod sakta hai. Safer alternative for code‑points:
const safeBetween = Array.from("A😀B").join("-");
console.log(safeBetween);               // OUTPUT: "A-😀-B"  (safe for emoji/code points)

// -----------------------------------------------------------------------------
// 13) Overlapping matches replaceAll me NHI hote (non-overlapping only)
console.log("aaaa".replaceAll("aa", "b")); // OUTPUT: "bb"  (matches at 0 and 2)

// -----------------------------------------------------------------------------
// 14) replaceAll bina regex: split/join (simple & fast)
const s14 = "apple banana apple";
const r14 = s14.split("apple").join("🍎");
console.log(r14); // OUTPUT: "🍎 banana 🍎"

// -----------------------------------------------------------------------------
// 23) Error behavior: null/undefined as 'this' → TypeError (coercion allowed for others)
try {
  console.log(String.prototype.replace.call(null, "a", "b"));
} catch (e) {
  console.log("TypeError on null 'this'"); // OUTPUT: "TypeError on null 'this'"
}
try {
  console.log(String.prototype.replace.call(undefined, "a", "b"));
} catch (e) {
  console.log("TypeError on undefined 'this'"); // OUTPUT: "TypeError on undefined 'this'"
}
// Coercion works for numbers/booleans as 'this':
console.log(String.prototype.replace.call(12345, "23", "XX")); // OUTPUT: "1XX45"

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 25) Performance tips (interview-friendly):
// • O(n) over input length. Heavy loops me repeated replace() avoid karo; precompute/hoist values.
// • Multiple literals replace karne ho to .split/join ya single pass custom scan socho.
// • Unicode handling (emoji, diacritics) ke liye Array.from (code points) useful hai, split("") avoid karo.

// -----------------------------------------------------------------------------
// QUICK SUMMARY (copy-ready):
// • replace(string, value) → FIRST occurrence only; NEW string; original unchanged.
// • replaceAll(string, value) → ALL occurrences; NEW string; original unchanged.
// • Replacement string supports: $$, $&, $`, $'  (NO captures with string-search).
// • Function replacer (match, index, string) return is literal (no $-expansion).
// • Empty search (""): replace prepends once; replaceAll inserts between every UTF‑16 code unit & at both ends.
// • Overlaps NHI replace hote; matching left-to-right, non-overlapping.
// • No‑regex utilities: start/end replace, N‑th occurrence, first‑K, ASCII case‑insensitive, whole‑word.
// • Advanced: Objects with [Symbol.replace] custom dispatch implement kar sakte ho.
