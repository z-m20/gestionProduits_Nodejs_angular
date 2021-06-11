//1-    Importation des modules
    const express = require('express')
    const mysql = require('promise-mysql')
    var cors = require('cors');
//2-    Création de la connexion vers MySql avec promise-mysql
    mysql.createConnection({
        host:'localhost',
        user : 'root',
        password :'root',
        database : 'gescom'
    }).then((db)=>{
    //2-1   Création du module app
        console.log('Connected !')
        const app = express()
        //2-2 les middelwares
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }))
            //app.use(cors())
            app.use(cors())
            app.use(function (request, response, next) {
                response.header("Access-Control-Allow-Origin", 'http://localhost:4200');
                response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
    //2-3   Requêtes de sélection des produits (SELECT)
        app.get('/api/v1/produits',(req,res)=>{
            db.query('SELECT * FROM produit')
                .then((resultat)=>{
                    res.json(resultat)
                })
                .catch((err)=>{
                    res.json(err)
                })
        })
    //2-3   Requêtes d'insertion d'un produit (INSERT)
        app.post('/api/v1/produits',(req,res)=>{
            db.query('INSERT INTO produit values(default,?,?,?,?)',[req.body.nom,req.body.description,req.body.prix,req.body.stock])
            .then((resultat)=>{
                res.json(resultat)
            })
            .catch((err)=>{
                res.json(err)
            })        
        })
    //2-3   Requêtes de suppression d'un produit (DELETE)
        app.delete('/api/v1/produits/:id',(req,res)=>{
            db.query('DELETE FROM produit WHERE id = ?',[req.params.id])
            .then((resultat)=>{
                res.json(resultat)
            })
            .catch((err)=>{
                res.json(err)
            })        
        })
    //2-4   Requête de mise à jour d'un produit (UPDATE)
        app.put('/api/v1/produits/:id',(req,res)=>{
            db.query('UPDATE  produit set nom = ?,description=?,prix=?,stock=? WHERE id = ?',[req.body.nom,req.body.description,parseFloat(req.body.prix),parseInt(req.body.stock),parseInt(req.params.id)])
            .then((resultat)=>{
                res.json(resultat)
            })
            .catch((err)=>{
                res.json(err)
            })        
        })
    
    //2-n   start du serveur sur le port 3000
    app.listen(3000,()=>console.log("Server started on port 3000 : http://localhost:3000" ))
}).catch((err)=>console.log(err))