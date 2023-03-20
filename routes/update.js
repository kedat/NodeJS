var express = require('express');
var router = express.Router();
var con = require("../connect");

let edit = [];
router.get('/', function (req, res) {
  con.query("select * from user", function (err, result) {
    if (err) throw err;
    else {
      if (req.query.id != '') {
        con.query("SELECT * FROM user where id = ? ", [req.query.id], function (error, rows) {
          if (!!error) {
            console.log('edit Error' + error);
          } else {
            rows.map(row => {
              console.log("🚀 ~ file: update.js:21 ~ row:", row)
              edit.push({
                id: row.id,
                name: row.username,
              });
            })
          }
        });
      }
      obj = { req: edit };

    }

  })
  res.render("update", { edit: edit });
})

module.exports = router;
