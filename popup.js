document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', onclick, false)
    
    function onclick () {
        //content.js searches page for recipe keywords
        // query the open tabs to find current tabs
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'hi', setCount)
        })

        //webscrape the recipe
        //calculate carbon emissions for each ingredient
        //when mouse gpoesh
    }

    // count eggs
    function setCount (res) {
        const div = document.createElement('div')
        div.textContent = '${res.count} eggs'
        document.body.appendChild(div)
    }
}, false)