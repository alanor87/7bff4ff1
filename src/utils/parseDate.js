function parseDate(rawDate) {
    const date = new Date(rawDate);
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const time = date.toLocaleTimeString('en-US', options);
    return {
        year,
        month,
        day,
        time,
    }
}

export { parseDate }