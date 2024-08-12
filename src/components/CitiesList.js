import React from "react";

function CitiesList({data}) {
    const citiesList = data.map((item, index) => {
        const letter = item[0]?.name.charAt(0);
        const cities = item.map((city) => (<li key={city.id}>{city.name}</li>))
        return (
            <div key={index}>
                <h3>{`${letter}:`}</h3>
                    {cities}
            </div>
        )
    })
    return (
        <ul>
            {citiesList}
        </ul>
    );
}

export default CitiesList;
