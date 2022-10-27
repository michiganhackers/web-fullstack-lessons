export function randomColor() {
    return `rgb(${randRange(0, 255)}, ${randRange(0, 255)}, ${randRange(0, 255)})`;
}

// helper for randomColor()
function randRange(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}


const dateOptions = {
    timeStyle: "medium",
    dateStyle: "medium",
};

/**
 * Format a Date object into a nice, human-readable format
 * @param {Date?} date
 */
export function formatDate(date) {
    return date?.toLocaleString([], dateOptions);
}
