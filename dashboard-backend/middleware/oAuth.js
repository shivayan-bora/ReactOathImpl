const axios = require("axios");

const tokenEndpoint = "YOUR_TOKEN_ENDPOINT_HERE";

const oAuth = (req, res, next) => {
  const code = req.query.code;

  if (!code) {
    res.status(401).send("Missing authorization code");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", "YOUR_CLIENT_ID_HERE");
  params.append("client_secret", "YOUR_CLIENT_SECRET_HERE");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/challenges");

  axios
    .post(tokenEndpoint, params)
    .then((response) => {
      req.oauth = response.data;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json(`Reason: ${err.message}`);
    });
};

module.exports = oAuth;
