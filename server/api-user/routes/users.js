let Users = require('../model/user-shema');
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const {secret} = require("../config/auth.config");
const { Validator } = require('node-input-validator');
require("cookie-parser");






function verifyToken(req, res) {
  const token = req.cookies.jwtToken;

  if (!token) {
   return res.send(true);
    
  }


    jwt.verify(token, secret, (err,decoded) => {
    if (err) {
     
    return res.send(true);
    
    }

    // Token is valid, set user information in the request object for further use
    res.send(false);
  });
}







function getUsers(req, res){
    var aggregateQuery=Users.aggregate();
    Users.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) ||20,
        },
        (err, users) =>{
        if(err){
            res.status(500).send(err);
            return;
        }
        res.send(users);
      return;
    }
        );
       
    }

// Récupérer un assignment par son id (GET)





// Update d'un assignment (PUT)
function updateUser(req, res) {
    console.log("UPDATE recu user : ");
    console.log(req.body);
    Users.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteUser(req, res) {

    Users.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${user.userName} deleted`});
    })
    
}

function signup  (req, res)  {
  
 
  // Save User to Database
  const v = new Validator(req.body, {
    userName: 'required|maxLength:10',
    userMail: 'required|email',
    userPassword: 'required|minLength:10|regex:^[a-zA-Z0-9!@#$%^&*]+$'
  });

  v.check().then((matched) => {
    if (!matched) {
      if(!v.userPassword){
        return res.send({ message: "unvalid password "});
      }
      else if(!v.userMail){
      return res.send({ message: "unvalid email "});
      }
      else{
        return res.send({ message: "unvalid username too long "});
 
      }
    }
    if(matched){
      const user = new Users({
        userName: req.body.userName,
        userMail: req.body.userMail,
        userPassword: bcrypt.hashSync(req.body.userPassword, 14)
      });
      Users.findOne({
        userName: req.body.userName
      }).exec((err,users)=>{
        if(users){
          return res.send({ message: "User Already existing." });
        }
        user.save((err, _user) => {
          if (err) {
            res.send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
                });
      
      })
    }
  });

          
        
};
function signin  (req, res)  {
  
  const v = new Validator(req.body, {
    userName: 'required|maxLength:10',
    userPassword: 'required'
  });

  v.check().then((matched) => {
    if (!matched) {
      //res.status(422).json(v.errors);
      return res.send({
        message: "Invalid credentials"
      });
    }
    if(matched){
      Users.findOne({
        userName: req.body.userName
      })
        .exec((err, user) => {
          if (err) {
            res.send({ message: err });
            return;
          }
    
          if (!user) {
            return res.send({ message: "User Not found." });
          }
    
          var passwordIsValid = bcrypt.compareSync(
            req.body.userPassword,
            user.userPassword
          );
    
          if (!passwordIsValid) {
            return res.send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
    
          var token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 86400 // 24 hours
          });
    
         
          res.status(200).send({
            id: user._id,
            username: user.userName,
            accessToken: token,
            message:"connected succesfuly"
          });
        });
    }
  });
  
};

module.exports = { getUsers,signin,signup,verifyToken, updateUser, deleteUser };