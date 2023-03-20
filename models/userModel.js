var con = require("../connect");
var express = require('express');
var app = express();

const getData = async function (req, res, next) {
  const [rows] = await con.execute('SELECT * FROM user');
  return rows;
}

const addUser = async function (data) {
  const name = data.name;
  con.query("insert into user(username) values(?) ", [name], function (err, rows, fields) {
    if (err) {
      console.log("error", err);
    }
    // else {
    // res.json({ "ResponseCode": "1", "ResponseMessage": "success", "data": "Data Inserted Successfully!" });
    // }
  });
}

const deleteUser = async function (userId) {
  con.query("delete from user where id=?", [userId], function (err, rows, fields) {
    if (err) {
      console.log('Error', +err);
    }
    else {
      console.log("record deleted");
    }
  });
}

const getUserDetail = async function (userId) {
  const [rows] = await con.execute("SELECT * FROM user where id=?", [userId]);
  return rows;
}


module.exports = {
  getData,
  addUser,
  deleteUser,
  getUserDetail
};
