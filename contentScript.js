/* window.onload = function (e) { activateTimer() }

window.onhashchange = function (e) {console.log("on hash change")}

let currentLocation = ""


let timeout = ""
let elems = ""

function activateTimer(){
    console.log("unload")
    if(currentLocation != location.href){
        activateExtension()
        
    }else{
        console.log(currentLocation)
        console.log(location.href)
    }
    //timeout = setTimeout(activateTimer, 10000)  
} */

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("recieved a message")
        activateExtension()
    }
)
//activateExtension()

//activateExtension()
//size-selector___RHMZk
async function activateExtension() {

    console.log("Activate Extension Called")
    let elems = document.getElementsByClassName("product-description___1TLpA")
    //console.log(elems)
    //console.log(elems.length)
    if (elems.length >= 1) {
        console.log(elems)
        //console.log("We are in a product page")
        let id = extractProductID(location.href)

        console.log(id)
        let data = await getAvailability(id)
        //console.log("Josh Lineman")
        console.log(data)
        addAvailability(data["variation_list"])

    }else{
        console.log("Not Found")
    }
}

async function addAvailability(data){
    //console.log(data)
    //#app > div > div > div > div > div.content-wrapper___3TFwT > div.sidebar-wrapper___3uF26 > div.sidebar___29cCJ > section > div.size-selector___RHMZk
    //document.querySelector("#app > div > div > div > div > div.content-wrapper___3TFwT > div.sidebar-wrapper___3uF26 > div.sidebar___29cCJ > section > div.size-selector___RHMZk")
    //document.querySelector("#app > div > div > div > div > div.content-wrapper___3TFwT > div > div.fixed-width-content___9S_-P > section.buy-section___ZPaYL.mobile___3NCgR > div.size-selector___RHMZk")
    let buttonContainer = document.querySelector("#app > div > div > div > div > div.content-wrapper___3TFwT > div.sidebar-wrapper___3uF26 > div.sidebar___29cCJ > section > div.size-selector___RHMZk")
    //CATCH For mobile
    
    if(!buttonContainer){
        buttonContainer = document.querySelector("#app > div > div > div > div > div.content-wrapper___3TFwT > div > div.fixed-width-content___9S_-P > section.buy-section___ZPaYL.mobile___3NCgR > div.size-selector___RHMZk")
    }
    //console.log(buttonContainer)
    //Should fix this selector to something better
    let spanTargets = buttonContainer.querySelectorAll("button")
    //console.log(spanTargets)
    if (spanTargets.length == 0){
        await sleep(100)
        spanTargets = buttonContainer.querySelectorAll("button")
    }
    //console.log(spanTargets)
    spanTargets.forEach(element => {
        //console.log(element)
        let ins = element.querySelector("span")
        for (x=0; x < data.length; x++){
            /* console.log(data[x].availability)
            console.log(data[x].size)
            console.log(ins.textContent) */
            if(data[x].size == ins.textContent){
                ins.textContent = ins.textContent + ": " + data[x].availability
                if(data[x].availability >= 15){
                    ins.textContent = ins.textContent + "+"
                }
                break
            }
        }
        
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function extractProductID(url) {
    let id = url.split("/").pop() // Split on / and get final item
    id = id.split(".")[0] //split on id.html and get first item
    return id
}

async function getAvailability(id) {
    let url = `https://www.adidas.com/api/products/tf/` + id + `/availability?sitePath=us`

    const response = await fetch(url,{
        method: "GET"
    })

    return response.json()
}