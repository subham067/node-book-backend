const express = require('express');
const User = require('../models/User')
const {
   body,
   validationResult
} = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser =require('../middleWere/fetchuser')


const JWT_SECRET=  "any text or number you want to add here to create jwt Token"


const router = express.Router();


// singUp
router.post('/singup', [body('email').isEmail(),
   body('name').isLength({
      min: 3
   }),
   body('password').isLength({
      min: 5
   })
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         errors: errors.array()
      });
   }

   try {
      let user = await User.findOne({
         email: req.body.email
      })

      if (user) {
         return res.status(400).json({
            error: "sorry with this email alrady exitsts"
         })
      }
      const salt = await bcrypt.genSalt(10);

      const secPass = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPass,
      })
      const  data = await{
         user: {
            id: user.id
         }
      }
      const jwtData = await jwt.sign(data, JWT_SECRET);
      console.log(jwtData);


      res.json({jwtData})
      console.log(req.body);
   } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message)
   }

})


// login
router.post('/login', [body('email',"Enter avalid email").isEmail(),
  
   body('password',"password cannot be blank").exists()
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         errors: errors.array()
      });
   }
   const {email , password} = req.body;
   try {
      let user =await User.findOne({email});
      if (!user) {
         return res.status(400).json({Error:"user can not exist"})
      }
      const passwordCompare=await bcrypt.compare(password , user.password)
      if (!passwordCompare) {
         return res.status(400).json({Error:"incorrect password"})
      }
      const  data = {
         user: {
            id: user.id
         }
      }
      const jwtData =  jwt.sign(data, JWT_SECRET);
      console.log(jwtData);


      res.json({jwtData})
      console.log(req.body);
   }catch (error) {
      console.error(error.message);
      res.status(500).send(error.message)
   }
})
// get login user datil
router.post('/loginn', fetchuser, async (req, res) => {
try {
  const userId= req.user.id
   const user =await User.findById(userId).select("-password")
   res.send(user)
}catch (error) {
   console.error(error.message);
   res.status(500).send(error.message)
}
})
module.exports = router;