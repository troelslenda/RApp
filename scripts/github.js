/*chrome.app.runtime.onLaunched.addListener(function() {


  chrome.app.window.create('window.html', {
    'bounds': {
      'width': 400,
      'height': 500
    }
  });
});
*/

//console.log('hest');






var RApp = {

  'init' : function () {
    /*checkbox = $('<input>', {type: 'checkbox'});
    checkbox.click(function(){
      RApp.toggleSelector('.file-header[data-path*=".css"]');
    });

    $('body').prepend(checkbox);*/
    $('body').prepend(RApp.controlPanel());

  },

  'controlPanel' : function () {

    var items = [
      {name : 'css', label : 'CSS'},
      {name : 'contrib', label : 'Contrib'},
      {name : 'features', label : 'Features'}
    ];

    var list = $('<ul>');

    $(items).each(function(){
      var box = $('<input>', {type: 'checkbox', name : this.name});
      var label = $('<span>').text(this.label);
      var item = $('<li>');
      item.append(label).append(box).appendTo(list);
    });

    return list;
  },

  'toggleSelector' : function (selector) {
    $('.diff-view > *').each(function() {
      console.log('hep');
      ;
      if ($(this).find(selector).get(0)) {
        $(this).parent().addClass('hide-diff');
      }
    });
  }
};




$(function() {
  RApp.init();
});





/*$('.diff-view > *').each(function() {
  if ($(this).find('.file-header[data-path*=".css"]:not(.file-header[data-path*=".info"]):not(.file-header[data-path*=".yml"])').get(0)) {
    $(this).parent().addClass('hide-diff');
  }
});
*/


