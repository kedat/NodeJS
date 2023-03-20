var con = require("../connect");
let edit = [];

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
              id: 2,
              name: 'dsgdf',
            });
          })
        }
      });
    }
  }
})

module.exports = edit;
