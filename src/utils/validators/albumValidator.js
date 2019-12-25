export const validateAlbumForm = values => {
    const errors = {};

    if (!values.albumName) {
        errors.albumName = 'Это поле обязательное';
    }

    return errors;
};