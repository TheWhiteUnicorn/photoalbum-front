export const validatePhotoForm = values => {
    const errors = {};

    if (!values.photoName) {
        errors.photoName = 'Это поле обязательное';
    }

    return errors;
};