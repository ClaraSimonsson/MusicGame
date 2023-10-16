const express = require('express');
const request = require('request');
const dotenv = require('dotenv');

const port = 3001
global.access_token = ''
dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
var spotify_redirect_uri = process.env.REDIRECT_URI

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var app = express();

app.get('/auth/login', (req, res) => {
    const scopes = [
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-modify-playback-state",
      "streaming",
      "playlist-read-collaborative",
      "playlist-read-private",
      "playlist-modify-public",
      "user-library-modify"
    ];
    var state = generateRandomString(16);
  
    var auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: spotify_client_id,
      scope: scopes,
      redirect_uri: spotify_redirect_uri,
      state: state
    })
  
    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});
  


app.get('/auth/callback', (req, res) => {
    var code = req.query.code;
    var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: spotify_redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                Authorization: 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            json: true
            };
        
            request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                global.access_token = body.access_token;
                res.redirect('/')
            }
            });
        
});

app.get("/auth/refresh_token", (req, res) => {
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  })

app.get('/playlists', (req, res) => { 
  const playlist_id = '5mQVbkcILLiU2aqVOplsMy';
  var playlistOptions = {
    url: 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks',
    headers: { 'Authorization': 'Bearer ' + global.access_token },
    json: true
  };
  console.log('Came to server!')
  request.get(playlistOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json({ playlists: body.items })
  }
  });
})

app.get('/auth/token', (req, res) => {
    res.json({ access_token: global.access_token })
  })

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})