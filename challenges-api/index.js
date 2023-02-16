const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const guard = require('express-jwt-permissions')();

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'https://www.challenges-api.com',
  issuerBaseURL: 'https://dev-qnff475amwergqaj.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/challenges', guard.check(['read:challenges']), function (req, res) {
    res.json({challenge1: 'challenge1', challenge2: 'challenge2'});
});

app.listen(port);

console.log('Running on port ', port);