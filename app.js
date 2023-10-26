const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { render } = require('ejs');
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
      
        .catch(err => console.error(err));

    return matches['matches'];
}


app.get('/',async (req,res)=>{

    let matches = await fetch('https://api.football-data.org/v4/competitions/PL/matches', {
        headers: {
            method: 'GET',
            'X-Auth-Token': '28185993d8f54afd9cdb5a945a155849',
        },
    })
        .then(response => response.json())
        // .then(data => console.log(data))
        .catch(err => console.error(err));

      
  
    matches = matches['matches'];

    res.render("index.ejs", { matches });

})

app.get('/league-table',async (req,res)=>{
    res.render("league-table.ejs");
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is running on:5000");
})