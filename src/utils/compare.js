export function compareByDesc(property) {
    return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        return value2 < value1 ? -1 : 1;
    }
}

export function compareByAsc(property) {
    return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        return value1 < value2 ? -1 : 1;
    }
}
