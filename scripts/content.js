
var RApp = {

  'init' : function () {

    // Load options to set initial state for options.
    RApp.setInitialState();


    chrome.extension.onMessage.addListener(function (request){
      console.log(request);
      RApp.toggleSelector(request.selector);
    });

  },
  'setInitialState' : function () {
    chrome.storage.sync.get("options", function(data){
      $(data.options).each(function() {
        if (this.value) {
          RApp.toggleSelector(this.selector);
        }
      });
    });
  },
  'toggleSelector' : function (selector) {
    $('.diff-view > *').each(function() {
      if ($(this).find(selector).get(0)) {
        if ($(this).hasClass('hide-diff')) {
          $(this).removeClass('hide-diff');
        }
        else {
          $(this).addClass('hide-diff');
        }

      }
    });
  }
};

// Run.
$(function() {
  RApp.init();
});
