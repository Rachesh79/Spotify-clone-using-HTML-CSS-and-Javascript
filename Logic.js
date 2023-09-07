console.log('Welcome To Spotify');

// initialize the variables
let songindex=0
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay')
let myprogressbar = document.getElementById('myprogressbar')
let gif = document.getElementById('gif')
let mastersongname = document.getElementById('mastersongname');
let songitems = Array.from(document.getElementsByClassName('songitem'))

let songs=[
    {songname: "Mehbooba(Hindi)", filepath: "songs/1.mp3", coverspath: "covers/1.jpg"},
    {songname: "Toofan(Hindi)", filepath: "songs/2.mp3", coverspath: "covers/2.jpg"},
    {songname: "Kesariya", filepath: "songs/3.mp3", coverspath: "covers/3.jpg"},
    {songname: "Sultan(Kgf)", filepath: "songs/4.mp3", coverspath: "covers/1.jpg"},
    {songname: "Believer", filepath: "songs/5.mp3", coverspath: "covers/5.jpg"},
]

songitems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverspath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songname
})
// audioElement.play();

// play pause clicks
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle')
        masterplay.classList.add('fa-play-circle')
        gif.style.opacity = 0
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myprogressbar.value = progress
})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value*audioElement.duration/100
})

const makesallplay = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
            element.classList.add('fa-play-circle')
            element.classList.remove('fa-pause-circle')
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makesallplay()
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src = `songs/${songindex+1}.mp3`;
        mastersongname.innerText = songs[songindex].songname;
        audioElement.currentTime = 0;
        audioElement.play()
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=4){
        songindex = 0
    }
    else{
        songindex += 1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})


document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex = 0
    }
    else{
        songindex -= 1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})