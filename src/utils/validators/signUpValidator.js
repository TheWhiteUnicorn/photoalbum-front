export const validateAlbumForm = values => {
    const errors = {};

    if (!values.login) {
        errors.login = 'Это поле обязательное';
    }
    re = /^\w+$/;
    if(!re.test(values.login)) {
        errors.login = "Имя пользователя может содержать только буквы, цифры и нижние подчеркивания";
    }

    if (!values.password1) {
        errors.password1 = 'Это поле обязательное';
    }
    if (!values.password2) {
        errors.password2 = 'Это поле обязательное';
    }
    if(values.password1 === values.password2) {
        if(values.password1 < 6) {
            errors.password1 ="Error: Password must contain at least six characters!"
        }
        if(values.password1 === values.login) {
            errors.password1 ="Error: Password must be different from Username!"
        }
        re = /[0-9]/;
        if(!re.test(values.password1)) {
            errors.password1 ="Error: password must contain at least one number (0-9)!"
        }
        re = /[a-z]/;
        if(!re.test(values.password1)) {
            errors.password1 ="Error: password must contain at least one lowercase letter (a-z)!"
        }
        re = /[A-Z]/;
        if(!re.test(values.password1)) {
            errors.password1 ="Error: password must contain at least one uppercase letter (A-Z)!"
        }
    } else {
        errors.password2 = "Пароли не совпадают"
    }

    return errors;
};