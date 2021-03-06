var libphone = require('libphonenumber-js');
var SpotifyWebApi = require('spotify-web-api-node');
var twilio = require('twilio');
var config = require('./config');
///dev info
const fromNumber = config.twilio_phone_number;
const accountSID = config.twilio_account_sid;
const authToken = config.twilio_auth_token;
var spotifyApi = new SpotifyWebApi({
  clientId: config.spotify_clientId,
  clientSecret: config.spotify_clientSecret
});

module.exports = {
  validatePhone: function(number){
    return libphone.isValidNumber(number,'US');
  },
  getArtist:function(artistName,callback){
    return getArtist(artistName,callback);
  },
  sendMusic: function(demoInfo,callback){
    return getTrackAndSend(demoInfo,callback);
  }
};
function getArtist(artistName,callback){
  spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.searchArtists(artistName)
          .then(function(rspData) {
            callback(rspData.body.artists);
      });
  });
}

function getTrackAndSend(demoInfo,callback){
  spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.searchArtists(demoInfo.artist)
    .then(function(rspData) {
      var artist = rspData.body.artists.items[0];
      if(typeof artist !== "undefined"){
        spotifyApi.getArtistTopTracks(artist.id, 'US')
          .then(function(data) {
            var messageBody = `${data.body.tracks[0].artists[0].name}'s top track: ${data.body.tracks[0].name}`;
            var twilioClient = new twilio(accountSID,authToken);
            //return {success:true};
            //@todo split this out into separate function
             twilioClient.messages.create({
                body: messageBody,
                to: '+1'+demoInfo.phone,  // Text this number
                from: fromNumber // From a valid Twilio number
            }).then(function(message){
              callback({success:true,artist:data.body.tracks[0].artists[0].name});
            });
          }, function(err) {
            return {success:false,message:err};
            console.error(err);
          });
      }
        }, function(err){
          /// return any error message coming from spotify, like artist not found.
          return {success:false,message:err};
          //console.error(err);
        });

    }, function(err) {
      return {success:false,message:err}
      //console.error(err);
    });
};
