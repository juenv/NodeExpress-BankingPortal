const fs = require("fs");
const path = require("path");
const express = require("express");
const data = require("./data");

const accounts = data.accounts;
const users = data.users;
const writeJSON = data.writeJSON;

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));



app.get('/', function(req, resp) {
    resp.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/savings', function(req, resp) {
    resp.render('account', {account: accounts.savings});
});

app.get('/checking', function(req, resp) {
    resp.render('account', {account: accounts.checking});
});

app.get('/credit', function(req, resp) {
    resp.render('account', {account: accounts.credit});
});

app.get('/profile', function(req, resp) {
    resp.render('profile', {user: users[0]});
});

app.get('/transfer', function(req, resp) {
    resp.render('transfer');
});

app.post('/transfer', function(req, resp) {
    const from = req.body.from;
    const to = req.body.to;
    const amount = parseInt(req.body.amount);
    if (accounts[from].balance >= amount){
        const balance = accounts[from].balance - amount;
        accounts[from].balance = balance;
        const toBalance = accounts[to].balance + amount;
        accounts[to].balance = toBalance;
        writeJSON(accounts);
        resp.render('transfer', {message: "Transfer Completed"});
    } else {
        resp.render('transfer', {message: "Transfer Failed"});
    }
    
});

app.get('/payment', function(req, resp) {
    resp.render('payment', { account: accounts.credit });
});

app.post('/payment', function(req, resp) {
    const amount = parseInt(req.body.amount);
    const balance = accounts["credit"].balance - amount;
    accounts["credit"].balance = balance;
    const toBalance = accounts["credit"].available + amount;
    accounts["credit"].available = toBalance;
    writeJSON(accounts);
    resp.render('payment', { message: "Payment Successful", account: accounts.credit });

    
});

app.listen(3000, () => console.log("PS Project Running on port 3000!"));
