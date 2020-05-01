const mongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const port = 3000
// const fs = require('fs')
// const fileName = 'file.json'
var cors = require('cors')
app.use(cors())

//axios to access api from server
//const axios = require('axios')
//axios.get(url).then(response=>{})

app.get('/verify/:username/:password',(req,res)=>{
    let user = req.params.username
    let pass = req.params.password
    let resp = 'false'
    mongoClient.connect("mongodb+srv://bryanbyerly9:bryanbyerly9@cluster0-ueaad.mongodb.net/test?retryWrites=true&w=majority",(err,client)=>{
        const db = client.db('passwordStorageApp')
        const accountInfoCollection = db.collection('accountInfo')
        let sent = accountInfoCollection.find({user:user},{pass:pass}).forEach(function(item){
            if(item.user.length>0){
                resp = 'true'
            }
            res.send(resp)
        })
        client.close()
    })
})
app.post('/createAccount/:username/:password',(req,res)=>{
    let acc = {
        user: req.params.username,
        pass: req.params.password
    }
    mongoClient.connect("mongodb+srv://bryanbyerly9:bryanbyerly9@cluster0-ueaad.mongodb.net/test?retryWrites=true&w=majority",(err,client)=>{
        const db = client.db('passwordStorageApp')
        const accountInfoCollection = db.collection('accountInfo')
        accountInfoCollection.insertOne(acc)
        client.close()
    })
    res.send()
})
app.get('/retrieveAccounts',(req,res)=>{
    let resp = []
    mongoClient.connect("mongodb+srv://bryanbyerly9:bryanbyerly9@cluster0-ueaad.mongodb.net/test?retryWrites=true&w=majority",(err,client)=>{
        const db = client.db('passwordStorageApp')
        const accountInfoCollection = db.collection('accounts')
        accountInfoCollection.find().toArray(function(err,item){
            if(err) throw err
            client.close()
            res.send(item)
        })
        client.close()
    })
    //res.send(resp)
})
app.post('/addAccount/:name/:username/:password',(req,res)=>{
    let acc = {
        accName: req.params.name,
        accUser: req.params.username,
        accPass: req.params.password
    }
    mongoClient.connect("mongodb+srv://bryanbyerly9:bryanbyerly9@cluster0-ueaad.mongodb.net/test?retryWrites=true&w=majority",(err,client)=>{
        const db = client.db('passwordStorageApp')
        const accountInfoCollection = db.collection('accounts')
        accountInfoCollection.insertOne(acc)
        client.close()
    })
    res.send()
})
app.post('/delAccount/:name',(req,res)=>{
    let name = req.params.name
    mongoClient.connect("mongodb+srv://bryanbyerly9:bryanbyerly9@cluster0-ueaad.mongodb.net/test?retryWrites=true&w=majority",(err,client)=>{
        const db = client.db('passwordStorageApp')
        const accountInfoCollection = db.collection('accounts')
        accountInfoCollection.remove({accName:name})
        client.close()
    })
    res.send()
})
app.listen(port,()=>{
    console.log("hello running on port "+port)
})
/*
function verify(user,pass){
    mongoClient.connect("mongodb+srv://bryanbyerly9:bryanbyerly9@cluster0-ueaad.mongodb.net/test?retryWrites=true&w=majority",(err,client)=>{
        const db = client.db('passwordStorageApp')
        const accountInfoCollection = db.collection('accountInfo')
        console.log(db.accountInfoCollection.find({user:user,pass:pass}).limit(1))
    })
}
*/
