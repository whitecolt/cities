import React from "react";
import {
    NAME_IS_EMPTY,
    NAME_IS_TOO_SHORT,
    INCORRECT_SYMBOLS,
    ALREADY_EXISTS,
} from "../constants/errorKeys";

function ErrorMessage({errorKey}) {
    let message;
    switch (errorKey) {
        case NAME_IS_EMPTY:
            message = 'Поле не может быть пустым';
            break;
        case NAME_IS_TOO_SHORT:
            message = 'Название города слишком короткое';
            break;
        case INCORRECT_SYMBOLS:
            message = 'Недопустимые символы';
            break;
        case ALREADY_EXISTS:
            message = 'Город уже есть в списке';
            break;
        default:
            message = 'Ошибка ввода';
    }

    return <span>{message}</span>;
}

export default ErrorMessage;