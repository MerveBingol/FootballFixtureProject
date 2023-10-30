const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const app = express();
app.use(express.static("public"));

dotenv.config();

const teams=[];


app.get('/league-table', async (req, res) => {



    let livematches = await fetch(`https://livescore-api.com/api-client/competitions/standings.json?competition_id=2&key=zIFEF40GZSg5tGZK&secret=Ll89Hz5AS1yao1OXKtCpyD6yvmDY2DJO&include_form=1`)
    .then(response => response.json())
    .catch(err => console.error(err)); 

    standingss=livematches.data.table


  try {
    const response1 = await axios.get('https://api.football-data.org/v4/competitions/PL/standings',{
        headers:{
            'X-Auth-Token': 'bf22ceb1e3144616822aaa16640551cd'
        }
    });
    const data1 = response1.data;
    const standings = data1.standings[0].table;

    res.render('league-table.ejs', { standings,standingss});
  } catch (error) {
    console.error('API İsteği Sırasında Hata:', error);
    res.status(500).send('API isteği sırasında hata oluştu.');
  }
});

app.get('/index',async (req,res)=>{

    let matches = await fetch('https://api.football-data.org/v4/competitions/PL/matches', {
        headers: {
            method: 'GET',
            'X-Auth-Token': '28185993d8f54afd9cdb5a945a155849',
        },
    })
        .then(response => response.json())
        .catch(err => console.error(err));

        let livematches = await fetch(`https://livescore-api.com/api-client/scores/live.json?key=zIFEF40GZSg5tGZK&secret=Ll89Hz5AS1yao1OXKtCpyD6yvmDY2DJO`)
        .then(response => response.json())
        .catch(err => console.error(err)); 
  
    matches = matches['matches'];
    livematches=livematches['data']['match']

    res.render("index.ejs", { matches,livematches });
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is running on:5000");
})