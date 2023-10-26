const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { render } = require('ejs');
const axios = require('axios');
const app = express();
app.use(express.static("public"));

dotenv.config();

const teams=[];


app.get('/league-table', async (req, res) => {
  try {
    const response1 = await axios.get('https://api.football-data.org/v4/competitions/PL/standings',{
        headers:{
            'X-Auth-Token': 'bf22ceb1e3144616822aaa16640551cd'
        }
    });
    const data1 = response1.data;
    const standings = data1.standings[0].table;

    const response2 = await axios.get('https://football-web-pages1.p.rapidapi.com/form-guide.json',{
        params:{
        comp:'1',
        team:'1'
  },
  headers:{
        'X-RapidAPI-Key': 'caa1494095msh51251f309697f53p1607c8jsneb6421b7c32b',
        'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com'
  }
});
    const data2 = response2.data;
    const matches=data2['form-guide'].teams[0].matches;

    res.render('league-table.ejs', { standings});
  } catch (error) {
    console.error('API İsteği Sırasında Hata:', error);
    res.status(500).send('API isteği sırasında hata oluştu.');
  }
});


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




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is running on:5000");
})