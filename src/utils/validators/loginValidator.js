export const validateLoginForm = values => {
    const errors = {};

    if (!values.userName) {
        errors.userName = 'Это поле обязательное';
    }

    if (!values.pass1) {
        errors.pass1 = 'Это поле обязательное';
    }

    return errors;
};