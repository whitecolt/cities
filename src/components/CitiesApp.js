import React, {useState, useEffect} from "react";
import CitiesList from "./CitiesList";
import AddingCitiesForm from "./AddingCitiesForm";
import {
    getItem,
    setItem,
} from "../utils/localStorage";

const cities = [
    {
        id: 1,
        name: "Абакан",
    },
    {
        id: 28,
        name: "Омск",
    },
    {
        id: 60,
        name: "Великий Новгород",
    },
    {
        id: 52,
        name: "Санкт-Петербург",
    },
    {
        id: 25,
        name: "Новосибирск",
    },
    {
        id: 45,
        name: "Краснодар",
    },
    {
        id: 44,
        name: "Кемерово",
    },
    {
        id: 75,
        name: "Вологда",
    },
    {
        id: 68,
        name: "Липецк",
    },
    {
        id: 9,
        name: "Екатеринбург",
    },
    {
        id: 11,
        name: "Иваново",
    },
    {
        id: 77,
        name: "Йошкар-Ола",
    },
    {
        id: 40,
        name: "Томск",
    },
    {
        id: 13,
        name: "Казань",
    },
    {
        id: 66,
        name: "Волгоград",
    },
    {
        id: 54,
        name: "Калининград",
    },
    {
        id: 69,
        name: "Тверь",
    },
    {
        id: 14,
        name: "Калуга",
    },
    {
        id: 17,
        name: "Красноярск",
    },
    {
        id: 62,
        name: "Ханты-Мансийск",
    },
    {
        id: 20,
        name: "Москва",
    },
    {
        id: 280,
        name: "Абакан",
    },
    {
        id: 22,
        name: "Надым",
    },
    {
        id: 70,
        name: "Новый Уренгой",
    },
    {
        id: 27,
        name: "Ноябрьск",
    },
    {
        id: 46,
        name: "Орёл",
    },
    {
        id: 224,
        name: "надым",
    },
    {
        id: 31,
        name: "Пермь",
    },
    {
        id: 12,
        name: "Ижевск",
    },
    {
        id: 49,
        name: "Иркутск",
    },
    {
        id: 79,
        name: "Петрозаводск",
    },
    {
        id: 61,
        name: "Петропавловск-Камчатский",
    },
    {
        id: 33,
        name: "Ростов-на-Дону",
    },
    {
        id: 50,
        name: "Владивосток",
    },
    {
        id: 3,
        name: "Белгород",
    },
    {
        id: 35,
        name: "Рязань",
    },
    {
        id: 37,
        name: "Саранск",
    },
    {
        id: 38,
        name: "Саратов",
    },
    {
        id: 23,
        name: "Нижний Новгород",
    },
    {
        id: 74,
        name: "Смоленск",
    },
    {
        id: 1,
        name: "Абакан",
    },
    {
        id: 24,
        name: "Новокузнецк",
    },
    {
        id: 15,
        name: "Киров",
    },
    {
        id: 55,
        name: "Сыктывкар",
    },
    {
        id: 53,
        name: "Архангельск",
    },
    {
        id: 67,
        name: "Тамбов",
    },
    {
        id: 64,
        name: "Тула",
    },
    {
        id: 47,
        name: "Тюмень",
    },
    {
        id: 48,
        name: "Улан-Удэ",
    },
    {
        id: 30,
        name: "Пенза",
    },
    {
        id: 51,
        name: "Хабаровск",
    },
    {
        id: 71,
        name: "Миасс",
    },
    {
        id: 6,
        name: "Воронеж",
    },
    {
        id: 41,
        name: "Челябинск",
    },
    {
        id: 5,
        name: "Владимир",
    },
    {
        id: 43,
        name: "Ярославль",
    },
];

function sortAndFilterData(array) {
    return [...array]
        .sort((a, b) => a.name > b.name ? 1 : -1)
        .filter((item, index, array) => (
            index === array.findIndex(({ name }) => name.toLowerCase() === item.name.toLowerCase())));
}

function groupByFirstLetter(array) {
    // Функция группирует города в подмассивы в алфавитном порядке
    const result = array.reduce((accumulator, item) => {
        const firstLetter = item.name.charAt(0);
        // Превращаем массив в объект, где ключами будут первые буквы городов
        if (accumulator[firstLetter]) {
            accumulator[firstLetter].push(item)
        } else {
            accumulator[firstLetter] = [item]
        }
        return accumulator;
    }, {})
/*  Затем превращаем объект в массив, в итоге получаем массив с подмассивами,
    которые содержат все города, начинающиеся на одну букву
 */
return Object.values(result);
}

function setDataInAlphabeticalOrder(array) {
const sortedData = sortAndFilterData(array);
return groupByFirstLetter(sortedData);
}

function CitiesApp() {
const [citiesValue, setCitiesValue] = useState(() => {
    const citiesJSON = getItem('cities');
    if (citiesJSON) {
        return (JSON.parse(citiesJSON));
    }
    return cities;
});

useEffect(() => {
    setItem('cities', JSON.stringify(citiesValue))
}, [citiesValue])

const isItemAlreadyExist = (city) => {
    return citiesValue.some(({ name }) => name === city)
}

return (
    <>
        <AddingCitiesForm
            setCitiesValue={setCitiesValue}
            initialData={cities}
            isItemAlreadyExist={isItemAlreadyExist}
        />
        <CitiesList data={setDataInAlphabeticalOrder(citiesValue)} />
    </>
)
}

export default CitiesApp;
