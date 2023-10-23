const express = require('express');
const dotenv = require('dotenv');
//const fs = require('fs');
const path = require('path')
const app = express();

app.use(express.static("public"));
dotenv.config();

async function get_matchday_matches(matchday) {
    let matches = await fetch(`https://api.football-data.org/v4/competitions/PL/matches?matchday=${matchday}`, {
        headers: {
            method: 'GET',
            'X-Auth-Token': '28185993d8f54afd9cdb5a945a155849',
        },
    })
        .then(response => response.json())
        // .then(data => console.log(data))
        .catch(err => console.error(err));

    return matches['matches'];
}


//  http://localhost:5000/fixture?matchday=1 
app.get('/fixture', async (req, res) => {
    let matches = await get_matchday_matches(parseInt(req.query['matchday'])); // parseInt(req.params['matchday']
    res.render("index.ejs", { matches });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is running on:5000");
})