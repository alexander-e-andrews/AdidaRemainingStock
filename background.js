
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    //chrome.tabs.executeScript(null,{file:"contentScript.js"});
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //console.log("Sending message")
        chrome.tabs.sendMessage(tabs[0].id, null);
    });
}, { urls: ["*://www.adidas.com/*"] });