
describe("MusicDemo Suite", function() {
  var twilio = require('twilio');
  var config = require('../config');
  var musicDemo = require('../musicDemo');
  var musicMock = {artist:"Queen", phone : ""};
  const client = new twilio(config.twilio_account_sid, config.twilio_auth_token);
  //var twilioMock = new twilio.RestClient(, );

  describe("validate phone number",function(){
    it("should be true",function(){
      expect(musicDemo.validatePhone(musicMock.phone)).toBeTruthy();
    });
  });
  describe("artist name",function(){
    it("should be artist's information",function(){
      musicDemo.getArtist(musicMock.artist,function(rtnVal){
        expect(rtnVal).toBeDefined();
      });
    });
  });
  describe("get top track and sms",function(){
    it("should be obejct with success and artist name",function(){
      musicDemo.sendMusic(musicMock,function(rtnVal){
        console.log(rtnVal);
        expect(rtnVal).toBeDefined();
        expect(rtnVal).toBe({success:true,artist:musicMock});
      });
    });
  });
});
