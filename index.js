const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// Simple dataset
let products = [
  { id: 1, name: 'Palmuvehka', latinName: 'Zamioculcas zamiifolia', colors: ['vihreä','musta'], flowers: false },
  { id: 2, name: 'Kiinanruusu', latinName: 'Hibiscus', colors: ['vihreä','punainen'], flowers: true },
  { id: 3, name: 'Neulavehka', latinName: 'Rhaphidophora tetrasperma', colors: 'vihreä', flowers: false },
  { id: 4, name: 'Peikonlehti', latinName: 'Monstera deliciosa', colors: ['vihreä','värivirheellinen'], flowers: false },
  { id: 5, name: 'Begonia', latinName: 'Begonia', colors: ['punainen','violetti','monivärinen','pilkullinen'], flowers: true },
  { id: 6, name: 'Palmuvehka', latinName: 'Epipremnum aureum', colors: ['vihreä','limenvihreä','valkoinen', 'monivärinen'], flowers: false },
  { id: 7, name: 'Kumipuu', latinName: 'Ficus Elastica', colors: ['vihreä', 'valkoinen'], flowers: false },
  { id: 8, name: 'Viirivehka', latinName: 'Spathiphyllum', colors: ['vihreä', 'valkoinen'], flowers: true },
  { id: 9, name: 'Orkidea', latinName: 'Phalaenopsis', colors: ['pinkki', 'punainen','violetti','keltainen','monivärinen','valkoinen'], flowers: true },
  { id: 10, name: 'Anopinkieli', latinName: 'Sansevieria', colors: ['vihreä', 'limenvihreä', 'keltainen'], flowers: false },
  { id: 11, name: 'Kirjopunalehti', latinName: 'Iresine herbstii', colors: ['punainen','musta'], flowers: false },

];

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req,res) => {
  res.render('index',
  {
    pagetitle : "Anskun huonekasvit",
    desc: "Täältä löytyy (muille) täysin turhaa tietoa siitä minkälaisia kasveja Ansku omistaa",
    plants: plants
  });
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));