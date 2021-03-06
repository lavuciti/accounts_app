const express = require('express');
const mongojs = require('mongojs');
const db = mongojs ('danilovadb', ['accounts']);

const app = express();
app.set('view engine', 'ejs');

//body parser koji je ugradjen u sam express
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    db.accounts.find((err,data) =>{
        res.render('index', {data: data});
    })
})

app.get('/add' ,(req, res) => {
    res.render('add-view')
})

app.post('/save', (req, res)=>{
    db.accounts.insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    },(err,data) =>{
        res.redirect('/')
    })
})

app.get('/edit', (req, res) => {
    db.accounts.find((err,data) =>{
        res.render('edit-view', {data: data});
    })
})

app.get('/delete_acc/:id', (req, res) => {
    let id = req.params.id;
    db.accounts.remove({"_id":db.ObjectId(id)}, (err,data) =>{
        res.redirect('/')
    })
})

app.get('/edit_acc/:id', (req, res) => {
    let id = req.params.id;
    db.accounts.findOne({"_id":db.ObjectId(id)}, (err,data) => {
        res.render('edit-form-view', {data: data})
    })
})

app.post('/edit_acc_db', (req, res) =>{
    let id = req.body.id;
    db.accounts.update({"_id":db.ObjectId(id)},{$set: {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        phone : req.body.phone
    }}, (err,data) => {
        res.redirect('/')
    })
})

app.listen(3000, () =>{
    console.log('Listening on port 3000');
})