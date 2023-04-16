const {JSDOM} = require('jsdom')
const fetch = require("node-fetch");


async function crawlPage(inputURL) {
    console.log(`crawling page ${inputURL}`)

    try{
        const resp = await fetch(inputURL)

        if(resp.status > 399){
            console.log(`error in fetching with status code: ${resp.status} on page: ${inputURL}`)
            return
        }

        const contentType = resp.headers.get("Content-Type")
        if(!contentType.includes("text/html")){
            console.log(`error in fetching with status code: ${resp.status} on page: ${inputURL}`)
            return
        }


        console.log(await resp.text())
    }
    catch(err){
        console.log(`error while fetching: ${err.message}`)
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for( const linkElement of linkElements){
        if (linkElement.href.slice(0,1) == '/'){
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`Invalid URL, ${err.message}`)
            }
        }else{
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)            }
            catch(err){
                console.log(`Invalid URL, ${err.message}`)
            }
        }
    }
    return urls

}
function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) == '/'){
        return hostPath.slice(0,-1)
    }

    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}