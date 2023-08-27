const yup = require('yup');
const MAX_USERNAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 255;
const MIN_DURATION = 0;

const userValidation = yup.object({
    username: yup.string().trim().max(MAX_USERNAME_LENGTH).required()
});

const exerciseValidation = yup.object({
    description: yup.string().trim().max(MAX_DESCRIPTION_LENGTH).required(),
    duration: yup.number().min(MIN_DURATION).required(),
    date: yup.date()
});

const logParamsValidation = yup.object({
    from: yup.date(),
    to: yup.date(),
    limit: yup.number()
})

exports.userValidation = userValidation;
exports.exerciseValidation = exerciseValidation;
exports.logParamsValidation = logParamsValidation;
exports.MAX_USERNAME_LENGTH = MAX_USERNAME_LENGTH;
exports.MAX_DESCRIPTION_LENGTH = MAX_DESCRIPTION_LENGTH;
exports.MIN_DURATION = MIN_DURATION;