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
    const db = dbConnection
    const sql  = "SELECT * FROM vagas INNER JOIN categorias ON vagas.id = categorias.id ORDER BY id"
    db.all(sql, [], (err, results) => {    
        res.render("home", { 
            results 
        });
    }); 

})

app.get('/vaga/:id', async(req, res) => {
    const db = await dbConnection
    const sql = "SELECT * FROM vagas WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        res.render("vaga", { 
            vaga: row 
        });
    });
    
})

app.get('/admin', (req,res) => {
    res.render('admin/home')
})

 const init = async() => {
   const db =  await dbConnection
    await db.run('create table if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);')
    await db.run('create table if not exists vagas (id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);')
    // const categoria = 'Social Media'
    // await db.run(`insert into categorias(categoria) values('${categoria}')`) 
    // const vaga = 'Social Media'
    //const descricao = 'Vaga disponível para Social Media para quem fez o Fullstack Lab'
    // await db.run(`insert into vagas(categoria, titulo, descricao) values(1, '${vaga}', '${descricao}')`) //use temlate string (`)para adicionar variáveis à expressão sql
    //db.run("UPDATE vagas SET categoria = 3 WHERE (id = 3);");
    }
init()


app.listen(3000, (err) => {
    if(err){
        console.log('Não foi possível iniciar o servidor')
    } else {
        console.log('O servidor Jobify está online!')
    }
})
