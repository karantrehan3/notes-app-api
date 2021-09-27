const { validationResult } = require("express-validator");
const { schema, delSchema } = require("./validation-schema");

const validateAddModSchema = async (req, res, next) => {
    const length = Object.keys(req.body).length;
    if (length > schema.length || length < 1)
        return res
            .status(422)
            .json({ error: "Unprocessable Entity", status: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validateDelSchema = async (req, res, next) => {
    const length = Object.keys(req.body).length;
    if (length > delSchema.length || length < 1)
        return res
            .status(422)
            .json({ error: "Unprocessable Entity", status: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateAddModSchema: validateAddModSchema,
    validateDelSchema: validateDelSchema,
};
