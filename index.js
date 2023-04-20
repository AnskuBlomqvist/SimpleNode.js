const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// "Simple" dataset
let plants = [
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
//GET ONE
app.get('/:id', (req,res ) => {
  const id = Number(req.params.id);
  const plant = plants.find(plant => plant.id === id);
  if (plant)
  {
    res.json(plant);
  }
  else
  {
    res.status(404).json(
      {
        msg: "Not found"
      }
    );
  }
});
//DELETE
app.delete('/:id', (req,res) => {
  const id = Number(req.params.id);
  plants = plants.filter(plant => plant.id != id);
  res.json(plants)

});

//CREATE
app.post('/', (req,res)=> {
  const newId = plants[plants.length-1].id + 1;
  const newPlant = {
    id : newId,
    name : req.body.name,
    latinName : req.body.latinName,
    colors : req.body.colors,
    flowers : req.body.flowers
  }
  plants.push(newPlant);
  res.json(plants);
})

//UPDATE
app.patch('/:id', (req, res) => {
  const idToUpdate = Number(req.params.id);
  const newName = req.body.name;
  const newlatinName = req.body.latinName;
  const newColors = req.body.colors;
  const newFlowers = req.body.flowers;
  console.log(newName);
  console.log(newlatinName);
  res.send("ok still going strong");

  plants.forEach(plant => {
    if (plant.id === idToUpdate)
    {
      plant.name = newName;
      plant.latinName = newlatinName;
      plant.colors = newColors;
      plant.flowers = newFlowers;
    }
  })
  res.json(plants);

  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));