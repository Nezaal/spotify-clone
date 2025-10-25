console.log("lets write js");

let currentSong = new Audio();
let songs;

function formatTime(seconds) {


    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60); // ensures no decimal part

    if (isNaN(minutes) || isNaN(secs)) {
        return "00:00";
    } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

}



async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();

    console.log("Fetched HTML:");
    // console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");

    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index]
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs;
}


const playMusic = (track, pause = true) => {
    // let audio = new Audio("/songs/" + track);

    currentSong.pause();        // stop previous
    currentSong.currentTime = 0; // reset
    currentSong.src = "/songs/" + track;
    if (!pause) {

        currentSong.play().catch(err => console.log(err));
    }
    play.src = "/svg files/pause.svg"

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00/00:00"

}

async function main() {


    songs = await getSongs();

    playMusic(songs[0], pause = false)

    console.log(songs)
    // show all the songs in the play list
    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML +

            `<li> 
            
                                <img src="svg files/music.svg" alt="">
                                <div class="info">
                                    <div>${song.replaceAll(/%20/g, " ")}</div>
                                    <div> </div>
                                </div>

                                <div class="playnow">
                                    <span>Play Now</span>
                                    <img src="svg files/playnow.svg" alt="">
                                </div> 
                                
                            </li>`;

    }
    // -----
    // attach an even listener to each song.
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click", () => {

            let songname = li.querySelector(".info").firstElementChild.innerHTML;
            console.log(songname);
            playMusic(songname);

        })
    })

    // attach an event listener to play , previous and next button;

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "/svg files/pause.svg";
        } else {
            currentSong.pause();
            play.src = "/svg files/play.svg";
        }
    })

    // listen for time update event

    // Update time and seek bar circle
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`;

        let percent = (currentSong.currentTime / currentSong.duration) * 100;
        document.querySelector(".circle").style.left = percent + "%";
    });

    // Add event listener to seekbar    
    document.querySelector(".seekbar").addEventListener("click", e => {
        let seekbar = e.target;
        let percent = (e.offsetX / seekbar.getBoundingClientRect().width);

        // Move circle visually
        document.querySelector(".circle").style.left = (percent * 100) + "%";

        // Update song current time
        currentSong.currentTime = percent * currentSong.duration;


    });


    // eveent listener or hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });


    // event listesr for close button 
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%"
    });


    // button for prev and next buttons
    previous.addEventListener("click", () => {
        console.log("previous clicked");
        console.log(currentSong.src);

        let filename = currentSong.src.split("/").pop();
        let index = songs.indexOf(filename);

        console.log(songs, index);

        if (index > 0) {
            playMusic(songs[index - 1]);
        } else {
            console.log("Already at first song!");
        }
    });

    next.addEventListener("click", () => {
        console.log("next clicked");

        let filename = currentSong.src.split("/").pop();
        let index = songs.indexOf(filename);

        console.log(songs, index);

        if (index < songs.length - 1) {
            playMusic(songs[index + 1]);
        } else {
            console.log("Already at last song!");
        }
    });

    

}

main()