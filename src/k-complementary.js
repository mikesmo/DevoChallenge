export const isKComplementary = (array, k, cb) => {
    let output = [];
    let kDiff = new Map();

    for (let i = 0; i < array.length; i++) {
        let diff = k - array[i];
        if (diff < 0) {
            return cb(`array value ${array[i]} at index ${i} is less than k of ${k}`, null);
        }

        kDiff.set(diff, i);
    }

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