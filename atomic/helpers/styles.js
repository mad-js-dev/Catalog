export function processStyle(value) {
    let style;
    if(Array.isArray(value)) {
        style = Object.assign({}, ...value)
    } else {
        style = value
    }
    return style
}