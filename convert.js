const db = require("./public/db.json")
var fs = require('fs');
const db2 = []
db.forEach(country => {
    const data = {name:'', states: []};
    const states = [];
    data.name = country.name;
    country.states.forEach(state => {
        const stateData = {name:'', cities:[]}
        stateData.name = state.name;
        const cities = [];
        state.cities.forEach(city => {
            const cityData = {name:''};
            cityData.name = city.name;
            cities.push(cityData)
        })
        stateData.cities = cities;
        states.push(stateData)
    })
    data.states = states
    db2.push(data)
});

// var dbstring = JSON.stringify(db2);

fs.writeFileSync("data.json", JSON.stringify(db2));
