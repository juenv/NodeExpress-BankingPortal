const express = require("express");
const router = express.Router();
const { accounts } = require("../data");

router.get('/savings', function(req, resp) {
    resp.render('account', {account: accounts.savings});
});

router.get('/checking', function(req, resp) {
    resp.render('account', {account: accounts.checking});
});

router.get('/credit', function(req, resp) {
    resp.render('account', {account: accounts.credit});
});

module.exports = router;