/** Merge a variant's base view style with a caller override, if any. */
export function mergeViewStyle(base, override) {
    return override ? [base, override] : base;
}
/** Merge a variant's base text style with a caller override, if any. */
export function mergeTextStyle(base, override) {
    return override ? [base, override] : base;
}
/** Merge a variant's default icon palette with a caller's partial override. */
export function resolveIconPalette(defaults, override) {
    return { ...defaults, ...override };
}
//# sourceMappingURL=tabbar-style-utils.js.map