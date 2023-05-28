export const emptyObjChecker = (obj?: Object): boolean => {
    if (obj) {
        return Object.keys(obj).length === 0;
    }
    return true;
};
