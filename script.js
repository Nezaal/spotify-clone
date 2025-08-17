console.log("lets write js");

let currentSong = new Audio();

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();

    console.log("Fetched HTML:");
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");

    let songs = [];
    for (let index  = 0; index < as.length; index++) {
        const element = as[index]
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs;
}


const playMusic = (track) =>{
    // let audio = new Audio("/songs/" + track);

    currentSong.src = "/songs/" + track;
    currentSong.play();

}

async function main(){

 
    let songs = await getSongs();
    console.log(songs)
// show all the songs in the play list
    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li> 
        
                            <img src="svg files/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll(/%20/g, " ")}</div>
                                <div> </div>
                            </div>

                            <div class="playnow">
                                <span>Play Now</span>
                                <img src="svg files/playnow.svg" alt="">
                            </div> </li>`;
        
    }
    // -----
    // attach an even listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e =>{
        addEventListener("click", element =>{

            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            
        })
    })    
} 

main()