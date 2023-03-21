var con = require("../connect");
var express = require('express');
var app = express();

const getData = async function (req, res, next) {
  const [rows] = await con.execute('SELECT * FROM user');
  return rows;
}

const addUser = async function (data) {
  await con.query("insert into user (email, phone, username) values(?,?,?)", [data.email, data.phone, data.username], function (err, rows, fields) {
    if (err) {
      console.log("error", err);
    }
  });
}

const deleteUser = async function (username) {
  await con.query("delete from user where username=?", [username], function (err) {
    if (err) {
      console.log('Error', +err);
    }
    else {
      console.log("record deleted");
    }
  });
}

const getUserDetail = async function (username) {
  const [rows] = await con.execute("SELECT * FROM user where username=?", [username]);
  return rows;
}

const updateUser = async function (userInfo) {
  await con.query("UPDATE user SET ? where username=?", [userInfo.newInfo, userInfo.username], function (err, rows, fields) {
    if (err) {
      console.log("error", err);
    }
  })
}

const updateUserInfo = async function (userInfo) {
  await con.query("UPDATE user SET ? where username=?", [userInfo.newInfo, userInfo.username], function (err, rows, fields) {
    if (err) {
      console.log("error", err);
    }
  })
}

const checkExist = async function (username) {
  const [rows] = await con.execute("SELECT * FROM user where username=?", [username]);
  if (rows.length > 0)
    return true
  return false
}

const sortData = async function (type, method) {
  const [rows] = await con.execute(`SELECT * FROM user ORDER BY ${type} ${method}`);
  return rows;
}

module.exports = {
  getData,
  addUser,
  deleteUser,
  getUserDetail,
  updateUser,
  checkExist,
  updateUserInfo,
  sortData
};
