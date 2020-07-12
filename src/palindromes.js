
export const isPalindrome = (text) => {
    let numOfChars = text.length;

    // Check for odd length text - only even length text can be a palindrome.
    if (numOfChars % 2 !== 0) {
        return false;
    }

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