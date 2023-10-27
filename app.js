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
        'X-RapidAPI-Key': '6d7497497amsh26c045cfb9d92fap1725eajsn34deead94feb',
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


app.get('/conf',async (req,res)=>{
    let livedata = await fetch('https://livescore-api.com/api-client/scores/live.json?competition_id=2&key=zIFEF40GZSg5tGZK&secret=Ll89Hz5AS1yao1OXKtCpyD6yvmDY2DJO')
    .then(response => response.json())
    .catch(err => console.error(err));
  
    console.log(livedata['data']['match'][0])

    //res.render("index.ejs", { matches });
})

app.get('/index',async (req,res)=>{

    let matches = await fetch('https://api.football-data.org/v4/competitions/PL/matches', {
        headers: {
            method: 'GET',
            'X-Auth-Token': '28185993d8f54afd9cdb5a945a155849',
        },
    })
        .then(response => response.json())
        // .then(data => console.log(data))
        .catch(err => console.error(err));

        let livematches = await fetch(`https://livescore-api.com/api-client/scores/live.json?key=zIFEF40GZSg5tGZK&secret=Ll89Hz5AS1yao1OXKtCpyD6yvmDY2DJO`)
        .then(response => response.json())
        .catch(err => console.error(err)); //competition_id=2&
  
    matches = matches['matches'];
    livematches=livematches['data']['match']
    //console.log(livematches)

    res.render("index.ejs", { matches,livematches });
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is running on:5000");
})