export const validateLoginForm = values => {
    const errors = {};

    if (!values.login) {
        errors.login = 'Это поле обязательное';
    }

    if (!values.password) {
        errors.password = 'Это поле обязательное';
    }

    return errors;
};