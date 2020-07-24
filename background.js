
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    //chrome.tabs.executeScript(null,{file:"contentScript.js"});
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //console.log("Sending message")
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" });
    });
}, { urls: ["*://www.adidas.com/*"] });

/* chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"contentScript.js"});
}); */

/* let lastCall = ""
chrome.webRequest.onCompleted.addListener(
    function(details){
        if(lastCall != details.url){
            lastCall = details.url
            console.log(details)
            var xhr =  new XMLHttpRequest()
            xhr.onload = function(e){
                console.log("sent a request")
                console.log(e)
                console.log(xhr.response)
            }
            xhr.open("GET", details.url, true)
            xhr.send(null)
        }

    },
    {urls: ['*://www.adidas.com/api/products/tf/*']},
    []
)

chrome.tabs.on
 */