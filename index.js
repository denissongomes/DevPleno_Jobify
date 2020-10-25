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
  

app.get('/', async(req, res) => {
     
        const db = dbConnection
        const sql = "SELECT * FROM categorias ORDER BY id"
        
        db.all(sql, [], (err, categorias) => {
           
            res.render("home", { 
                categorias   
            });
         
        });
       
   

})

app.get('/vaga', (req, res) => {

    res.render('vaga')
    
    })

 const init = async() => {
        const db =  await dbConnection
    await db.run('create table if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);')
    await db.run('create table if not exists vagas (id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);')
    // const categoria = 'Engineering Team'
    // await db.run(`insert into categorias(categoria) values('${categoria}')`) 
    const vaga1 = 'Fullstack Developer (Remote)'
    const descricao1 = 'Vaga disponível para Fullstack Developer para quem fez o Fullstack Lab'
    await db.run(`insert into vagas(categoria, titulo, descricao) values(1, '${vaga1}', '${descricao1}')`) //use temlate string (`)para adicionar variáveis à expressão sql
   const vaga2 = 'Marketing Manager (San Francisco)'
   const descricao2 = 'Vaga disponível para Marketing Manager em San Francisco para quem fez o Fullstack Lab'
   await db.run(`insert into vagas(categoria, titulo, descricao) values(2, '${vaga2}', '${descricao2}')`) //use temlate string (`)para adicionar variáveis à expressão sql
  // db.run("UPDATE Categorias SET categoria = 'Marketing Team' WHERE (id = 2);");
    }
init()


app.listen(3000, (err) => {
    if(err){
        console.log('Não foi possível iniciar o servidor')
    } else {
        console.log('O servidor Jobify está online!')
    }
})