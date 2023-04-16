const { crawlPage } = require("./crawl")

function main(){
    if(process.argv.length < 3){
        console.log("Please specify website ;o")
    }

    if(process.argv.length > 3){
        console.log("Too many arguments ;o")
    }
    
    console.log("Beginning the crawl....")
    crawlPage(process.argv[2])
}

main()