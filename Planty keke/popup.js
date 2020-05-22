document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', onclick, false)
    
    function onclick () {
        //content.js searches page for recipe keywords
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'hi')
        })

        //webscrape the recipe
        //calculate carbon emissions for each ingredient
        //when mouse gpoes
    }
}, false)