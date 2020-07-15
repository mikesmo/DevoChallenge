/**
 * Description. Determines if the given text is a palindrome.
 *
 * @param  {String} text Input text.
 * @return {Bool}        True if the text is a palindrome.
 */
export const isPalindrome = (text) => {
    // Remove white spaces.
    text = text.replace(/ /g,'');

    let numOfChars = text.length;
    let j = numOfChars / 2 - 1;

    for (let posA = 0; posA <= j; posA++) {
        let posB = numOfChars - posA - 1;

        let charA = text.charAt(posA);
        let charB = text.charAt(posB);

        if (charA !== charB) {
            return false;
        }
    }

    return true
};