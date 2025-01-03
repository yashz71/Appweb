let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let user = require('./routes/users');
const router = express.Router()
let mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// Use cookie-parser middleware to parse cookies
const prefix = '/api';



mongoose.Promise = global.Promise;
const uri = '';
class TokenBucket {

  constructor(capacity, fillPerSecond) {
      this.capacity = capacity;
      this.tokens = capacity;
      setInterval(() => this.addToken(), 1000 / fillPerSecond);
  }
 
  addToken() {
      if (this.tokens < this.capacity) {
          this.tokens += 1;
      }
  }

  take() {
      if (this.tokens > 0) {
          this.tokens -= 1;
          return true;
      }

      return false;
  }
}


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8080/api/users que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use(cors({ origin: 'http://localhost:4200', credentials: true }));


  


  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  let port = process.env.PORT || 8080; 

  app.use(express.json())

  // les routes


function limitRequests(perSecond, maxBurst) {
  const bucket = new TokenBucket(maxBurst, perSecond);

  // Return an Express middleware function
  return function limitRequestsMiddleware(req, res, next) {
      if (bucket.take()) {
          next();
      } else {
          res.status(429).send('Rate limit exceeded');
      }
  }
}





  app.route(prefix + '/signin',limitRequests(5, 10))
  .post(user.signin);

  app.route(prefix + '/signup',limitRequests(5, 10))
  .post(user.signup);
  app.route(prefix + '/verify',limitRequests(5, 10))
  .get(user.verifyToken);
  /*app.get(prefix + '/verify', (req, res) => {
    const jwtToken = req.cookies.jwtToken;
  
    if (!jwtToken) {
      // Handle case when the cookie is not found or invalid
      return res.status(401).send(jwtToken);
    }
  
    // Your code to verify and process the JWT token goes here
    // ...
  
    res.send('Access granted to protected route!');
  });*/
  
 

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);


module.exports = app;


