const content = document.getElementById("content")

content.innerHTML = "Hello World!"

// Get information about this day in history from English Wikipedia

let m = 2;
let day = 21;

let url = "https://de.wikipedia.org/w/api.php?action=parse&page=February_21.&format=json&origin=*"
fetch(url)
    .then(response => console.log(response))
    // .then(data => {
        // const html = data.parse.text["*"]
        // const parser = new DOMParser();
        // const doc = parser.parseFromString(html, "text/html");
        // const headings = 
        // [...doc.querySelectorAll(".mw-heading2")]
        // // .find(h2 =>
        // //     h2.children[1].textContent.includes("Events"));
        // let evHeading = headings.find(h2 =>
        //      h2.children[0].textContent.includes("Events"));
        //     document.body.appendChild(evHeading.nextElementSibling.nextElementSibling)

    
    .catch(error => console.error(error))

