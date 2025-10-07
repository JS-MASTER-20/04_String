// Strings

        // In JavaScript, the textual data is stored as strings. There is no separate type for a single character.

        // The internal format for strings is always UTF-16, it is not tied to the page encoding.

        // Strings are immutable:
            // Strings can’t be changed in JavaScript. It is impossible to change a character.

            let str = 'Hi';

            str[0] = 'h'; // error
            console.log( str[0] ); // doesn't work
// Quotes

        // Strings can be enclosed within either single quotes, double quotes or backticks:
        // Single and double quotes are essentially the same. Backticks, however, allow us to embed any expression into the string, by wrapping it in ${…}:
        // Another advantage of using backticks is that they allow a string to span multiple lines

        // Example:1

            let single = 'single-quoted';
            let double = "double-quoted";

            let backticks = `backticks`;

        // Example:2

            function sum(a, b) {
                return a + b;
            }

            console.log(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.

        // Example:3

            let guestList = `Guests:
            * John
            * Pete
            * Mary
            `;

            console.log(guestList); // a list of guests, multiple lines

// Special Characters

        // It is still possible to create multiline strings with single and double quotes by using a so-called “newline character”, written as \n, which denotes a line break:

            // Example:4

                let guestList1 = "Guests:\n * John\n * Pete\n * Mary";

                console.log(guestList1); // a multiline list of guests, same as abov 

            // Example:5

                let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

                // two lines using a normal newline and backticks
                let str2 = `Hello
                World`;

                console.log(str1 == str2); // true

// String Length
        
        // The length property has the string length:
        // Note that \n is a single “special” character, so the length is indeed 3.

        // length is a property:
        //     People with a background in some other languages sometimes mistype by calling str.length() instead of just str.length. That doesn’t work.
        //     Please note that str.length is a numeric property, not a function. 
        //     There is no need to add parenthesis after it. Not .length(), but .length.

        console.log( `My\n`.length ); // 3

