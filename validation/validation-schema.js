const { body } = require("express-validator");

const schema = [
    body("title")
        .exists()
        .withMessage("Title should be present")
        .bail()
        .notEmpty()
        .withMessage("Title must not be Empty")
        .isString()
        .withMessage("Title must be a String Value"),
    body("body")
        .exists()
        .withMessage("Body should be present")
        .bail()
        .notEmpty()
        .withMessage("Body must not be Empty")
        .isString()
        .withMessage("Body must be a String Value"),
];

const delSchema = [
    body("title")
        .exists()
        .withMessage("Title should be present")
        .bail()
        .notEmpty()
        .withMessage("Title must not be Empty")
        .isString()
        .withMessage("Title must be a String Value"),
];

module.exports = { schema: schema, delSchema: delSchema };
