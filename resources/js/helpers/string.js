import Handlebars from "handlebars";

Handlebars.registerHelper("compare", function (v1, operator, v2, options) {
    const operators = {
        // eslint-disable-next-line
        "==": v1 == v2,
        "===": v1 === v2,
        // eslint-disable-next-line
        "!=": v1 != v2,
        "!==": v1 !== v2,
        ">": v1 > v2,
        ">=": v1 >= v2,
        "<": v1 < v2,
        "<=": v1 <= v2,
        "||": !!(v1 || v2),
        "&&": !!(v1 && v2),
    };
    if (operators.hasOwnProperty(operator)) {
        if (operators[operator]) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
    return console.error("Error: Expression \"" + operator + "\" not found");
});

Handlebars.registerHelper("isequal", function (value, comparison) {
    return value === comparison;
});

Handlebars.registerHelper("contains", function (value, comparison) {
    try {
        return (value || "").includes(comparison);
    } catch (e) {
        return false;
    }
});

/**
 * @description lowercase's string and converts into kebab case
 * @param {string} text
 * @returns {string}
 */
export const slugify = (text = "") => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
};

export const template = (templateString, object) => {
    const templateObj = Handlebars.compile(templateString);
    return templateObj(object);
};

export const handlebarsTemplate = (templateString, objectValue) => {
    let object = objectValue;

    try {
        object =
            typeof objectValue === "string"
                ? JSON.parse(objectValue)
                : objectValue;
    } catch {}

    try {
        const templateObj = Handlebars.compile(templateString);
        return templateObj(object);
    } catch (e) {
        return e.toString();
    }
};

/**
 *
 * @param {string} condition
 * @param {Object} form -  this is required even though it's not used here. The eval method could pull in one of those values
 * @param {Object} options
 * @param {boolean} [options.debug] - console logs the resulting template and form object
 * @param {boolean} [options.strict] - on catch in the try catch return true to shw there are form errors
 * @returns {any}
 */
export const jsEval = (
    condition,
    form,
    { debug = false, strict = false } = {},
) => {
    try {
        //const template = handlebarsTemplate(condition, data);
        const template = condition
            // make sure the template is looking at form
            .replace(/~/g, "form.")
            // catch undefined errors here. Should be ok to globally
            // use the optional operator
            .replace(/\./g, "?.");

        if (debug) {
            console.log("jsEval", { template, form });
        }

        /* eslint no-eval: 0 */
        return eval(template);
    } catch (e) {
        if (debug) {
            console.log("jsEval", { e, condition, form });
        }
    }

    return strict;
};

/**
 * generate a random string of 5 chars
 * @return {string}
 */
export const generateRandomString = () => {
    return (Math.random() + 1).toString(36).substring(7);
};
