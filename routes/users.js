var express = require('express');
var router = express.Router();
var con = require("../connect");
var {
  getData,
  addUser,
  deleteUser,
  getUserDetail,
  updateUser,
  checkExist,
  updateUserInfo,
  sortData
} = require('../models/userModel')


/* GET users listing. */
router.get('/', async function (req, res, next) {
  let data = await getData();
  // order by, filter
  res.render('users', { data: data });
});

router.post('/', async function (req, res, next) {
  let newUser = req.body;
  const isExist = await checkExist(req.body.username);
  if (isExist) {
    res.render('error', { message: "User already existed" });
  }
  else {
    await addUser(newUser);
    res.redirect('/users');
  }
}
);

router.post('/delete/:username', async function (req, res, next) {
  const isExist = await checkExist(req.params.username);
  if (!isExist) {
    res.render('error', { message: "User not exist" });
  }
  else {
    await deleteUser(req.params.username);
    res.redirect('/users');
  }
}

);

router.get('/detail/:username', async function (req, res, next) {
  const isExist = await checkExist(req.params.username);
  if (!isExist) {
    res.render('error', { message: "User not exist" });
  }
  else {
    const userDetail = await getUserDetail(req.params.username);
    res.render('detail', { userDetail });
  }
}
);

router.post('/update/:username', async function (req, res, next) {
  let newUserInfo = req.body;
  const isExist = await checkExist(req.body.username);
  if (isExist) {
    newUserInfo = delete newUserInfo.username;
    await updateUserInfo({ username: req.params.username, newInfo: req.body });
    res.redirect('/users');
  }
  else {
    await updateUser({ username: req.params.username, newInfo: req.body });
    res.redirect('/users');
  }
}
);

router.get('/:type/:method', async function (req, res, next) {
  const type = req.params.type;
  const method = req.params.method;
  const data = await sortData(type, method)
  res.render('users', { data: data });
}
);


module.exports = router;
