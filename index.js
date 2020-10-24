const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {

res.render('home')

})


app.listen(3000, (err) => {
    if(err){
        console.log('Não foi possível iniciar o servidor')
    } else {
        console.log('O servidor Jobify está online!')
    }
})