const express = require("express");
const router = express.Router();
const { accounts, writeJSON } = require("../data");


router.get('/transfer', function(req, resp) {
    resp.render('transfer');
});

router.post('/transfer', function(req, resp) {
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

router.get('/payment', function(req, resp) {
    resp.render('payment', { account: accounts.credit });
});

router.post('/payment', function(req, resp) {
    const amount = parseInt(req.body.amount);
    const balance = accounts["credit"].balance - amount;
    accounts["credit"].balance = balance;
    const toBalance = accounts["credit"].available + amount;
    accounts["credit"].available = toBalance;
    writeJSON(accounts);
    resp.render('payment', { message: "Payment Successful", account: accounts.credit });

    
});

module.exports = router;