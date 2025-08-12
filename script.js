

console.log("lets write js");

async function main() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();

    console.log("Fetched HTML:");
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let tds = div.getElementsByTagName("td");

    console.log("Text inside <td> tags:");
    for (let i = 0; i < tds.length; i++) {
        console.log(tds[i].textContent.trim());
    }
}

main();
