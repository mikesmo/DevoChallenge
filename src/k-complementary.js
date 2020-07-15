/**
 * Description. Generates a K-Complementary array for a given array of integers.
 *
 * @param {Array<Integer>}  array                An input array of integers.
 * @param {type}            k                    K value.
 * @param {Function}        cb(error, result)    Callback funcition.
 *         error {String}: Error description. Null if no error occurs
 *         result {Array<Integer>}: An array of KComplemtary integers.  
 */

export const kComplementary = (array, k, cb) => {
    let output = [];
    let kDiff = new Map();

    // Calculate the k difference for each integer.
    for (let i = 0; i < array.length; i++) {
        let diff = k - array[i];
        if (diff < 0) {
            return cb(`array value ${array[i]} at index ${i} is less than k of ${k}`, null);
        }

        kDiff.set(diff, i);
    }

    // Loop through array set and find the k-complementary if it exists for the array position.
    for (let i = 0; i < array.length; i++) {
        let result = kDiff.get(array[i]);
        if (result === undefined) {
            output.push(null);
        } else {
            output.push(result);
        }
    } 

    return cb(null, output);
}
