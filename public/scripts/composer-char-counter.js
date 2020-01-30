$(document).ready(function() {
  console.log('jQuery is Ready')
  $('textarea').keyup(function() {
    $(this).parent().find('.counter').text(140 - ($(this).val().length));
    let onOrOff = true;
    if (parseInt($(this).parent().find('.counter').text()) < 0) {
      onOrOff = true;
    } else {
      onOrOff = false;
    }
    $(this).parent().find('.counter').toggleClass("below-zero", onOrOff);
  });
});