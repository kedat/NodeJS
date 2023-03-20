var con = require("../connect");
let data = []

con.query("SELECT * FROM user", function (err, result, fields) {
  result.map(row => {
    data.push({
      id: row.id,
      name: row.username,
    });
  })
});

module.exports = data;
