export function compareValues<T>(
    a: T,
    b: T,
    descending: boolean = true,
): number {
    if (a < b) {
        return descending ? -1 : 1;
    }
    if (a > b) {
        return descending ? 1 : -1;
    }
    return 0;
}

export function toSorted<T, V>(
    arr: T[],
    key: (val: T) => V,
    descending: boolean = true,
) {
    return arr.toSorted((a, b) => compareValues(key(a), key(b), descending));
}
