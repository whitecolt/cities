import React, {useState} from "react";
import styled from "styled-components";
import { nanoid } from 'nanoid'

import ErrorMessage from "./ErrorMessage";
import {
    NAME_IS_EMPTY,
    NAME_IS_TOO_SHORT,
    INCORRECT_SYMBOLS,
    ALREADY_EXISTS,
} from "../constants/errorKeys";

const Form = styled.form`
    width: 100%;
    padding: 0.5em;
    margin-bottom: 0.1em;
    border: 1px solid #ccc;
    border-radius: 0.1em;
    input {
        margin-left: 1em;
    }
    .button {
        margin-right: 0.5em;
    }
    span {
        color: red;
    }
`;


function AddingCitiesForm({
    setCitiesValue,
    initialData,
    isItemAlreadyExist,
}) {
    const [inputValue, setInputValue] = useState('');
    const [isShowError, setShowError] = useState(false);
    const [errorKey, setErrorKey] = useState(0);

    const getUpperCaseFirst = (str) => {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let cityName = inputValue;
        if (inputValue?.[0] === inputValue[0]?.toLowerCase()) {
            cityName = getUpperCaseFirst(inputValue);
        }
        if (inputValue.length === 0) {
            setShowError(true);
            setErrorKey(NAME_IS_EMPTY);
        }
        else if (inputValue.length < 2) {
            setShowError(true);
            setErrorKey(NAME_IS_TOO_SHORT);
        }
        // Проверка на использование только кириллицы
        else if (!/^[а-я-\s]+$/i.test(inputValue)) {
            setShowError(true);
            setErrorKey(INCORRECT_SYMBOLS);
        }
        else if (isItemAlreadyExist(cityName)) {
            setShowError(true);
            setErrorKey(ALREADY_EXISTS);
        } else {
            setCitiesValue((prev) => ([...prev, {id: nanoid(5), name: cityName } ]));
            setInputValue('')
            if (isShowError) {
                setShowError(false);
            }
        }
    }

    const handleReset = () => {
        setCitiesValue(initialData);
        setInputValue('')
        if (isShowError) {
            setShowError(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <p>
                <label>Введите название города:
                    <input
                        type="text"
                        placeholder="Город"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                    />
                </label>
            </p>
            <button type="submit" className="button">Добавить</button>
            <button type="button" onClick={handleReset} className="button">Сбросить</button>
            {isShowError && (
                <ErrorMessage errorKey={errorKey}/>
            )}
        </Form>
    )
}

export default AddingCitiesForm;
