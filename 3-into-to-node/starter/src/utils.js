export function randomColor() {
    return `rgb(${randRange(0, 255)}, ${randRange(0, 255)}, ${randRange(0, 255)})`;
}

// helper for randomColor()
function randRange(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}
