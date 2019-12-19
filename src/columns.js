// function of rows: throw values to definited +number+ of columns and return split line

export default (split, number) => {
    const parsedLine = {
        date: new Date(),
        columns: []
    };
    parsedLine.date.setFullYear(split[0], split[1] - 1, split[2]);
    parsedLine.date.setHours(split[3], split[4], split[5]);
    parsedLine.date.setMilliseconds(0);
    if (number <= 6 || number > 40) {
        throw Error('Unsupported number of rows ' + number);
    }
    for (let i = 6; i < number; i++) {
        if (split[i] === undefined) {
            split[i] = null;
        }
        if (split[i] === '?') {
            split[i] = null;
        }
        parsedLine.columns[i - 6] = split[i];
    }

    return parsedLine;
};
