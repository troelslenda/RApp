document.addEventListener('DOMContentLoaded', function(){

  var options = $('input');

  // set the initial state of the checkbox
  chrome.storage.sync.get("options", function(data){

    $(data.options).each(function(){
      if (this.value) {
        $('[name="' + this.name + '"]').prop('checked', true);
      }
    });
  });

  options.each(function(){
    this.addEventListener("change", function() {

      var changed_option = this;
      // Send the message about selected option to the DOM.
      chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{selector:$(changed_option).parent().data('selector')}, function(response){
          //If you need a response, do stuff with it here
        });
      });

      // Logic to save the option state.
      var save_options = [];
      options.each(function(){
        var option = {};
        option.name = $(this).attr('name');
        option.value = $(this).prop('checked');
        option.selector = $(this).parent().data('selector');
        save_options.push(option);
      });

      chrome.storage.sync.set(
        {options : save_options}
      );
    });
  });

});
