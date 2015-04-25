// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'github.com' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});


chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    appendTextToBody(request.sel_text);
  });

function appendTextToBody(text) {
  //console.log(text);
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.executeScript(tab.id, {"code" : '$("body").prepend("Test : "'+text+');'}) ;
  });
}
