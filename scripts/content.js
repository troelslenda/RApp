
var RApp = {

  'toc_string' : '',

  'init' : function () {

    RApp.toc_string = RApp.readTOC();
    // Load options to set initial state for options.
    RApp.setInitialState();


    chrome.extension.onMessage.addListener(function (request){
      RApp.toggleSelector(request.selector);
      RApp.updateTOC();
    });

  },
  'setInitialState' : function () {
    chrome.storage.sync.get("options", function(data){
      $(data.options).each(function() {
        if (this.value) {
          RApp.toggleSelector(this.selector);
          RApp.updateTOC();
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
  },
  'readTOC' : function () {
    return $('.table-of-contents .js-details-target').text();
  },
  'updateTOC': function () {
    var hidden = $('body .diff-view > .hide-diff');
    var hidden_files = [];
    hidden.each(function() {
      hidden_files.push($('.file-header', this).data('path'));
    });

    var toc = $('.table-of-contents');
    var files_title = RApp.toc_string;
    var links = $('ol li', toc);

    // Remove all hidden files indications.

    links.removeClass('blob-code-deletion');

    // If no hidden files do not alter rest of string.
    if (!hidden_files.length) {
      $('.js-details-target', toc).text(files_title);
      return;
    }

    // Assume that the first is only the amount of files changed.
    var parts = files_title.trim().split(' ');
    // deduct the hidden files from shown.
    parts[0] = parseInt(parts[0]) - hidden_files.length;

    // Removing files part of string.
    parts.pop();
    parts.push('(' + hidden_files.length);
    parts.push('hidden');
    parts.push('files)');
    $('.js-details-target', toc).text(parts.join(' '));

    // Look through all links.
    links.each(function(){
      var links_str = $(' > a',this).text();
      if ($.inArray(links_str, hidden_files) != -1) {
        // Just reuse blob-code-deletion class since all it does
        // is to provide wanted background color.
        $(this).addClass('blob-code-deletion');
      }
    });
  }
};

// Run.
$(function() {
  RApp.init();
});
