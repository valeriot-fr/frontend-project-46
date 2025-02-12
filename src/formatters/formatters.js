import stylish from "./stylish.js";
import plain from "./plain.js";
import json from "./json.js";
import exp from "constants";

const formatters = { stylish, plain, json };

export const formatDiff = (diff, format) => {
    if (!formatters[format]) {
        throw new Error(`Unknown format: ${format}`);
    }
    return formatters[format](diff);
};
export default formatters;