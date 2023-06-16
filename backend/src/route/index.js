
const {Router} = require('express');
const ErrorAPI = require('../../apiError');
// const pool = require('../db/init.sql');
const bcrypt = require('bcrypt');
const {  findUserByUsername, insertUser, findUserByEmail } = require('../db/query');

const route = Router();

route.post('/auth/login', async (req, res, next) => {
   try {
    const body = req.body;
    const user = await findUserByUsername(body.username);

    if(!user) {
        throw new ErrorAPI(404, 'Incorrect account or password');
    }

    const pwdCompare = await bcrypt.compare(body.password, user.password);

    if(!pwdCompare) {
        throw new ErrorAPI(400, 'Incorrect account or password');
    }

    const {password, ...others} = user;

    return res.json({
        data: others
    });
   } catch (error) {
       next(error)
   }
})


route.post('/auth/register', async (req, res, next) => {
    try {
     const body = req.body;
 
     console.log("body => ", body);
 
     if(await findUserByUsername(body.username)) {
        throw new ErrorAPI(400, 'Account already exists');
     }

     if(await findUserByEmail(body.email)) {
        throw new ErrorAPI(400, 'Email already exists');
     }
 
     const hashPwd = await bcrypt.hash(body.password, 10);
 
    await insertUser({...req.body, password: hashPwd});
 
     return res.json({
         message: 'Register Success',
         data: true
     });
    } catch (error) {
        next(error)
    }
 })

module.exports = route;