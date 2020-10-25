const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))


const sqlite3 = require('sqlite3').verbose();
const dbConnection = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    }
    //console.log('Connected to the database.');
  });
  

app.get('/', (req, res) => {

res.render('home')

})

app.get('/vaga', (req, res) => {

    res.render('vaga')
    
    })




app.listen(3000, (err) => {
    if(err){
        console.log('Não foi possível iniciar o servidor')
    } else {
        console.log('O servidor Jobify está online!')
    }
})