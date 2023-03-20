var express = require('express');
var router = express.Router();
var con = require("../../connect");
var data = require('../../models/userModal')


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users', {
    data: data
  });
});

/* GET users listing. */
router.post('/', function (req, res, next) {
  var name = req.body.name;
  con.query("insert into user(username) values(?) ", [name], function (err, rows, fields) {
    if (!!err) {
      console.log("error", +err);
    }
    else {
      res.json({ "ResponseCode": "1", "ResponseMessage": "success", "data": "Data Inserted Successfully!" });
    }
  });
});

module.exports = router;
