alert('Would you like to use Planty?')
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //find every instance of egg, case sensitive
    const re = new RegExp('egg', 'gi')
    const matches = document.documentElement.innerHTML.match(re)

})