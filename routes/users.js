var express = require('express');
var router = express.Router();
var con = require("../connect");
var userModel = require('../models/userModel')


/* GET users listing. */
router.get('/', async function (req, res, next) {
  let data = await userModel.getData();
  // order by, filter
  res.render('users', { data: data });
});

router.post('/', async function (req, res, next) {
  let newUser = req.body
  // check if user already exists => show error on screen
  await userModel.addUser(newUser);
  res.redirect('/users');
}
);

router.post('/delete/:id', async function (req, res, next) {
  // check if user not exists => show error on screen
  await userModel.deleteUser(req.params.id)
  res.redirect('/users');
}
);

router.get('/update/:id', async function (req, res, next) {
  // check if user not exists => show error on screen
  const userDetail = await userModel.getUserDetail(req.params.id);
  res.render('update', { userDetail });
  let newUser = req.body
  // check if new data already exists => show error on screen
  // res.render('update', { data: data });

}
);

module.exports = router;
