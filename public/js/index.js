$().ready(function() {
  $('#receipt').hide();
  $('#phoneError').hide();
  $('#artistError').hide();
  $('#form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      data: {artist: $('#artistName').val(), phone: $('#phone').val()},
      success: function(res) {
        if(!res.success){
          if(res.message == "Invalid Phone"){
            $('#phoneError').show();
            $('#artistError').hide();
          }else{
            $('#phoneError').hide();
            $('#artistError').show();
          }
        }else{
          $('#responseText').text("Thanks for using our service, you should be receiving the text of the top track of "+res.artist+".");
          $('#demo').hide();
          $('#receipt').show();
          $('#phoneError').hide();
          $('#artistError').hide();
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
  $('#reset').click(function(event){reset()});
  var reset = function(){
    $('#demo').show();
    $('#receipt').hide();
    $('#phoneError').hide();
    $('#artistError').hide();
    $('#artistName').val("");
    $('#phone').val("");
  };
});
