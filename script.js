/* =====================================================
        BIRTHDAY ADVENTURE ULTIMATE
                SCRIPT.JS
        PART 3A
===================================================== */

"use strict";

/* ==========================================
            GLOBAL VARIABLES
========================================== */

const scenes = document.querySelectorAll(".scene");

const loader = document.getElementById("loader");

const progress = document.getElementById("progress");

const loadingText = document.getElementById("loadingText");

const passwordScene = document.getElementById("passwordScene");

const nameScene = document.getElementById("nameScene");

const countdownScene = document.getElementById("countdownScene");

const giftScene = document.getElementById("giftScene");

const letterScene = document.getElementById("letterScene");

const galleryScene = document.getElementById("galleryScene");

const cakeScene = document.getElementById("cakeScene");

const voiceScene = document.getElementById("voiceScene");

const videoScene = document.getElementById("videoScene");

const finalScene = document.getElementById("finalScene");

const endingScene = document.getElementById("endingScene");

const bgMusic = document.getElementById("bgMusic");

const giftSound = document.getElementById("giftSound");

const unlockSound = document.getElementById("unlockSound");

const popSound = document.getElementById("popSound");

const voiceAudio = document.getElementById("voiceAudio");

/* ==========================================
            SETTINGS
========================================== */

const PASSWORD = "sam";

let userName = "";

let typedStarted = false;

/* ==========================================
            LOADER
========================================== */

let loading = 0;

const loadingInterval = setInterval(() => {

    loading++;

    progress.style.width = loading + "%";

    loadingText.innerHTML = "Loading " + loading + "%";

    if (loading >= 100) {

        clearInterval(loadingInterval);

        setTimeout(() => {

            loader.style.display = "none";

            showScene(passwordScene);

        }, 700);

    }

}, 30);

/* ==========================================
            SCENE MANAGER
========================================== */

function showScene(scene){

    scenes.forEach(s=>{

        s.classList.remove("active");

    });

    scene.classList.add("active");

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ==========================================
        PASSWORD SYSTEM
========================================== */

const passwordInput = document.getElementById("password");

const passwordBtn = document.getElementById("passwordBtn");

const passwordError = document.getElementById("passwordError");

passwordBtn.onclick = ()=>{

    // Make password case-insensitive by converting both to lowercase
    if(passwordInput.value.trim().toLowerCase() === PASSWORD.toLowerCase()){

        unlockSound.play();

        passwordError.innerHTML="";

        showScene(nameScene);

    }

    else{

        passwordError.innerHTML="❌ Wrong Password";

        gsap.fromTo(

            ".glass",

            {x:-15},

            {

                x:15,

                duration:.08,

                repeat:5,

                yoyo:true

            }

        );

    }

};

/* ==========================================
            NAME ENTRY
========================================== */

const saveName = document.getElementById("saveName");

const nameInput = document.getElementById("userName");

saveName.onclick = ()=>{

    if(nameInput.value.trim()==""){

        alert("Please enter your name ❤️");

        return;

    }

    userName=nameInput.value.trim();

    document.getElementById("greeting").innerHTML=

    "Dear <span style='color:gold'>" +

    userName +

    "</span> ❤️";

    document.getElementById("finalName").innerHTML=

    "Happy Birthday " +

    userName +

    " 🎉";

    startCountdown();

};

/* ==========================================
            COUNTDOWN
========================================== */

const countNumber = document.getElementById("countNumber");

function startCountdown(){

    showScene(countdownScene);

    let count=3;

    countNumber.innerHTML=count;

    const timer=setInterval(()=>{

        count--;

        if(count>0){

            countNumber.innerHTML=count;

            gsap.fromTo(

                "#countNumber",

                {

                    scale:.4,

                    opacity:.3

                },

                {

                    scale:1,

                    opacity:1,

                    duration:.5

                }

            );

        }

        else{

            clearInterval(timer);

            countNumber.innerHTML="🎉";

            setTimeout(()=>{

                showScene(giftScene);

            },1000);

        }

    },1000);

}

/* ==========================================
        ENTER KEY SUPPORT
========================================== */

document.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        if(passwordScene.classList.contains("active")){

            passwordBtn.click();

        }

    }

});

/* ==========================================
        BACKGROUND MUSIC
========================================== */

document.body.addEventListener("click",()=>{

    bgMusic.volume=0.35;

    bgMusic.play().catch(()=>{});

},{once:true});

/* ==========================================
        GSAP INTRO
========================================== */

gsap.from(".glass",{

    scale:.8,

    opacity:0,

    duration:1,

    ease:"back.out(1.7)"

});

/* ==========================================
        END PART 3A
========================================== */
/* =====================================================
                SCRIPT.JS
                  PART 3B
        GIFT • PARTICLES • CONFETTI
=====================================================*/

/* ==========================================
            GIFT VARIABLES
========================================== */

const gift = document.getElementById("gift3D");

const giftButton = document.getElementById("openGift");

const giftGlow = document.getElementById("giftGlow");

/* ==========================================
            OPEN GIFT
========================================== */

if(giftButton){
giftButton.addEventListener("click", openGift);
}

function openGift(){

    giftButton.disabled = true;

    if(giftSound){

        giftSound.currentTime = 0;
        giftSound.play();

    }

    bgMusic.volume = 0.45;

    if(gift){
        gift.classList.add("open");
    }

    if(giftGlow){
        giftGlow.style.opacity = "1";
    }

    createMagicParticles();

    launchConfetti();

    if(gift){
    gsap.to("#gift3D",{

        duration:1,

        scale:1.08,

        ease:"back.out(2)"

    });
    }

    if(giftGlow){
    gsap.to("#giftGlow",{

        duration:1,

        scale:1.5,

        opacity:1

    });
    }

    setTimeout(()=>{

        showScene(letterScene);

        startLetter();

    },3000);

}

/* ==========================================
        MAGIC PARTICLES
========================================== */

function createMagicParticles(){

    const container = document.getElementById("giftContainer");

    for(let i=0;i<120;i++){

        const star = document.createElement("div");

        star.className="star";

        star.style.left=Math.random()*250+"px";

        star.style.top=Math.random()*220+"px";

        star.style.animationDuration=

        (Math.random()*2+1)+"s";

        star.style.opacity=Math.random();

        container.appendChild(star);

        setTimeout(()=>{

            star.remove();

        },3000);

    }

}

/* ==========================================
        CONFETTI BLAST
========================================== */

function launchConfetti(){

    confetti({

        particleCount:180,

        spread:120,

        origin:{y:.7}

    });

    setTimeout(()=>{

        confetti({

            particleCount:220,

            spread:180,

            startVelocity:55,

            origin:{y:.6}

        });

    },500);

}

/* ==========================================
            GIFT HOVER
========================================== */

if(gift){
gift.addEventListener("mouseenter",()=>{

    gsap.to(gift,{

        duration:.4,

        scale:1.05

    });

});

gift.addEventListener("mouseleave",()=>{

    gsap.to(gift,{

        duration:.4,

        scale:1

    });

});
}

/* ==========================================
        FLOATING STARS
========================================== */

function createFloatingStars(){

    const container=document.getElementById("giftContainer");

    setInterval(()=>{

        const star=document.createElement("div");

        star.className="star";

        star.style.left=Math.random()*260+"px";

        star.style.top="220px";

        star.style.animationDuration=

        (Math.random()*2+2)+"s";

        container.appendChild(star);

        setTimeout(()=>{

            star.remove();

        },4000);

    },350);

}

createFloatingStars();

/* ==========================================
        GLOW PULSE
========================================== */

if(giftGlow){
gsap.to("#giftGlow",{

    scale:1.25,

    opacity:.9,

    duration:2,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});
}

/* ==========================================
        GIFT ROTATION
========================================== */

if(gift){
gsap.to("#gift3D",{

    rotateY:15,

    duration:3,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});
}

/* ==========================================
        GIFT SHADOW
========================================== */

const giftContainer = document.getElementById("giftContainer");

if(giftContainer){
gsap.to("#giftContainer",{

    y:-8,

    duration:2,

    repeat:-1,

    yoyo:true,

    ease:"power1.inOut"

});
}

/* ==========================================
        END PART 3B
========================================== */
/* =====================================================
                SCRIPT.JS
                  PART 3C
      LETTER • GALLERY • IMAGE VIEWER
=====================================================*/

/* ==========================================
            TYPEWRITER LETTER
========================================== */

function startLetter(){

    if(typedStarted) return;

    typedStarted = true;

    const message = [

        "🎉 Happy Birthday " + userName + " ❤️",

        "Today is all about celebrating YOU.",

        "May your smile never fade.",

        "May your dreams become reality.",

        "May happiness stay with you forever.",

        "Thank you for being an amazing person.",

        "Keep shining like a star ✨",

        "Keep smiling every single day 😊",

        "Wishing you health, happiness and success.",

        "Enjoy your special day ❤️"

    ];

    new Typed("#typed",{

        strings:message,

        typeSpeed:45,

        backSpeed:0,

        startDelay:500,

        fadeOut:false,

        showCursor:true,

        cursorChar:"|"

    });

}

/* ==========================================
        CONTINUE BUTTON
========================================== */

const letterNext = document.getElementById("letterNext");

if(letterNext){
letterNext.onclick=()=>{

    showScene(galleryScene);

    animateGallery();

};
}

/* ==========================================
        GALLERY ANIMATION
========================================== */

function animateGallery(){

    gsap.from(".gallery img",{

        opacity:0,

        scale:.5,

        rotate:20,

        duration:.7,

        stagger:.08,

        ease:"back.out(1.7)"

    });

}

/* ==========================================
        IMAGE VIEWER
========================================== */

const viewer=document.getElementById("viewer");

const viewerImage=document.getElementById("viewerImage");

const closeViewer=document.getElementById("closeViewer");

document.querySelectorAll(".gallery img").forEach(image=>{

    image.addEventListener("click",()=>{

        viewer.style.display="flex";

        viewerImage.src=image.src;

        gsap.fromTo(

            "#viewerImage",

            {

                scale:.5,

                opacity:0

            },

            {

                scale:1,

                opacity:1,

                duration:.5,

                ease:"back.out(1.7)"

            }

        );

    });

});

/* ==========================================
        CLOSE VIEWER
========================================== */

if(closeViewer){

closeViewer.onclick=()=>{

    viewer.style.display="none";

};

}

viewer.addEventListener("click",(e)=>{

    if(e.target===viewer){

        viewer.style.display="none";

    }

});

/* ==========================================
        KEYBOARD SUPPORT
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        viewer.style.display="none";

    }

});

/* ==========================================
        PHOTO HOVER EFFECT
========================================== */

document.querySelectorAll(".gallery img").forEach(photo=>{

    photo.addEventListener("mouseenter",()=>{

        gsap.to(photo,{

            duration:.3,

            scale:1.08,

            rotate:0

        });

    });

    photo.addEventListener("mouseleave",()=>{

        gsap.to(photo,{

            duration:.3,

            scale:1,

            rotate:

            Math.random()>0.5 ? 4 : -4

        });

    });

});

/* ==========================================
        NEXT TO CAKE
========================================== */

const galleryNext = document.getElementById("galleryNext");

if(galleryNext){
galleryNext.onclick=()=>{

    showScene(cakeScene);

};
}

/* ==========================================
        END PART 3C
========================================== */
/* =====================================================
                SCRIPT.JS
                  PART 3D
      BALLOONS • FIREFLIES • CURSOR EFFECTS
=====================================================*/

/* ==========================================
            BALLOON COLORS
========================================== */

const balloonColors=[
"#ff4d6d",
"#ff6ec7",
"#ffd166",
"#06d6a0",
"#118ab2",
"#8338ec",
"#3a86ff",
"#ff9f1c"
];

const balloonContainer=document.getElementById("balloons");

/* ==========================================
            CREATE BALLOON
========================================== */

function createBalloon(){

    if(!balloonContainer) return;

    const balloon=document.createElement("div");

    balloon.className="balloon";

    const size=Math.random()*35+45;

    balloon.style.width=size+"px";
    balloon.style.height=size*1.2+"px";

    balloon.style.left=Math.random()*100+"vw";

    balloon.style.background=
    balloonColors[
        Math.floor(Math.random()*balloonColors.length)
    ];

    balloon.style.animationDuration=
    (Math.random()*6+8)+"s";

    balloon.style.animationDelay=
    Math.random()+"s";

    balloon.onclick=()=>{

        if(popSound){

            popSound.currentTime=0;
            popSound.play();

        }

        balloon.animate([

            {transform:"scale(1)",opacity:1},

            {transform:"scale(1.6)",opacity:0}

        ],{

            duration:250

        });

        confetti({

            particleCount:25,

            spread:60,

            origin:{

                x:balloon.offsetLeft/window.innerWidth,

                y:.8

            }

        });

        balloon.remove();

    };

    balloonContainer.appendChild(balloon);

    setTimeout(()=>{

        balloon.remove();

    },15000);

}

setInterval(createBalloon,650);

for(let i=0;i<10;i++){

    setTimeout(createBalloon,i*250);

}

/* ==========================================
            FIREFLIES
========================================== */

function createFirefly(){

    const fly=document.createElement("div");

    fly.className="firefly";

    fly.style.left=Math.random()*100+"vw";

    fly.style.top=Math.random()*100+"vh";

    fly.style.animationDuration=
    (Math.random()*8+8)+"s";

    document.body.appendChild(fly);

    setTimeout(()=>{

        fly.remove();

    },16000);

}

setInterval(createFirefly,1200);

/* ==========================================
            CURSOR GLOW
========================================== */

const cursor=document.getElementById("cursorGlow");

if(cursor){
document.addEventListener("mousemove",(e)=>{

    cursor.style.left=e.clientX+"px";

    cursor.style.top=e.clientY+"px";

});
}

/* ==========================================
            SPARK TRAIL
========================================== */

document.addEventListener("mousemove",(e)=>{

    const spark=document.createElement("div");

    spark.className="spark";

    spark.style.left=e.clientX+"px";

    spark.style.top=e.clientY+"px";

    spark.style.background=

    `hsl(${Math.random()*360},100%,70%)`;

    document.body.appendChild(spark);

    setTimeout(()=>{

        spark.remove();

    },800);

});

/* ==========================================
            FLOATING HEARTS
========================================== */

function floatingHearts(){

    const hearts=[
    "❤️","💖","💕","💗","💝"
    ];

    for(let i=0;i<40;i++){

        setTimeout(()=>{

            const heart=document.createElement("div");

            heart.className="heart";

            heart.innerHTML=

            hearts[
                Math.floor(Math.random()*hearts.length)
            ];

            heart.style.left=
            Math.random()*100+"vw";

            heart.style.fontSize=
            (Math.random()*20+20)+"px";

            heart.style.animationDuration=
            (Math.random()*3+4)+"s";

            document.body.appendChild(heart);

            setTimeout(()=>{

                heart.remove();

            },7000);

        },i*100);

    }

}

/* ==========================================
            STAR BACKGROUND
========================================== */

function randomSpark(){

    const dot=document.createElement("div");

    dot.style.position="fixed";

    dot.style.width="3px";

    dot.style.height="3px";

    dot.style.borderRadius="50%";

    dot.style.background="white";

    dot.style.left=Math.random()*100+"vw";

    dot.style.top=Math.random()*100+"vh";

    dot.style.opacity=Math.random();

    dot.style.pointerEvents="none";

    dot.style.zIndex="-1";

    document.body.appendChild(dot);

    gsap.to(dot,{

        opacity:0,

        duration:4,

        onComplete(){

            dot.remove();

        }

    });

}

setInterval(randomSpark,250);

/* ==========================================
        AUTO HEARTS EVERY 25 SEC
========================================== */

setInterval(()=>{

    floatingHearts();

},25000);

/* ==========================================
        END PART 3D
========================================== */
/* =====================================================
                SCRIPT.JS
                  PART 3E
      MICROPHONE CANDLE BLOW DETECTION
=====================================================*/

/* ==========================================
            CAKE VARIABLES
========================================== */

const flame = document.getElementById("flame");

const micButton = document.getElementById("startMic");

const wishGranted = document.getElementById("wishGranted");

const cakeNext = document.getElementById("cakeNext");

let audioContext;
let analyser;
let microphone;
let dataArray;
let micListening = false;

/* ==========================================
        START MICROPHONE
========================================== */

if(micButton){

micButton.onclick = startMicrophone;

}

/* ==========================================
        MICROPHONE FUNCTION
========================================== */

async function startMicrophone(){

    if(micListening) return;

    try{

        const stream = await navigator.mediaDevices.getUserMedia({

            audio:true

        });

        audioContext = new AudioContext();
        if(audioContext.state === "suspended"){
            await audioContext.resume();
        }

        analyser = audioContext.createAnalyser();

        analyser.fftSize = 2048;

        microphone = audioContext.createMediaStreamSource(stream);

        microphone.connect(analyser);

        dataArray = new Uint8Array(analyser.frequencyBinCount);

        micListening = true;

        if(micButton){

            micButton.innerHTML =
            "🎤 Blow towards your microphone...";

        }

        detectBlow();

    }

    catch(error){

        alert("Microphone permission denied.");

    }

}

/* ==========================================
            DETECT BLOW
========================================== */
function detectBlow(){

    if(!micListening) return;

    analyser.getByteTimeDomainData(dataArray);

    let sum = 0;

    for(let i = 0; i < dataArray.length; i++){

        const value = (dataArray[i] - 128) / 128;

        sum += value * value;

    }

    const volume = Math.sqrt(sum / dataArray.length);

    // Lower threshold for mobile devices
    if(volume > 0.08){

        blowOutCandle();

        micListening = false;

        return;

    }

    requestAnimationFrame(detectBlow);

}
/* ==========================================
        BLOW OUT CANDLE
========================================== */

function blowOutCandle(){

    if(flame){

        flame.classList.add("off");

    }

    if(wishGranted){

        wishGranted.style.display = "block";

        gsap.fromTo(

            "#wishGranted",

            {

                scale:.4,

                opacity:0

            },

            {

                scale:1,

                opacity:1,

                duration:1,

                ease:"back.out(2)"

            }

        );

    }

    if(popSound){

        popSound.currentTime = 0;

        popSound.play();

    }

    launchCakeCelebration();

    if(cakeNext){

        cakeNext.style.display = "inline-flex";

    }

}

/* ==========================================
        CAKE CELEBRATION
========================================== */

function launchCakeCelebration(){

    confetti({

        particleCount:300,

        spread:180,

        startVelocity:60,

        origin:{y:.6}

    });

    floatingHearts();

    launchFireworks();

}

/* ==========================================
        FIREWORKS
========================================== */

function launchFireworks(){

    const duration = 5000;

    const end = Date.now() + duration;

    (function frame(){

        confetti({

            particleCount:5,

            angle:60,

            spread:80,

            origin:{x:0}

        });

        confetti({

            particleCount:5,

            angle:120,

            spread:80,

            origin:{x:1}

        });

        confetti({

            particleCount:6,

            spread:120,

            origin:{

                x:Math.random(),

                y:Math.random()*0.4

            }

        });

        if(Date.now() < end){

            requestAnimationFrame(frame);

        }

    })();

}

/* ==========================================
        NEXT TO VOICE
========================================== */

if(cakeNext){

cakeNext.onclick = ()=>{

    showScene(voiceScene);

};

}

/* ==========================================
        END PART 3E
========================================== */
/* =====================================================
                SCRIPT.JS
                  PART 3F
      VOICE PLAYER • VISUALIZER • VIDEO
=====================================================*/

/* ==========================================
            VOICE VARIABLES
========================================== */

const startSpeech = document.getElementById("startSpeech");

const voiceNext = document.getElementById("voiceNext");

const birthdayVideo = document.getElementById("birthdayVideo");

const videoNext = document.getElementById("videoNext");

const speechStatus = document.getElementById("speechStatus");

let recognitionStarted = false;

/* ==========================================
        SPEECH RECOGNITION
========================================== */

if(startSpeech){

startSpeech.onclick = ()=>{

    if(recognitionStarted) return;

    if(!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){

        speechStatus.innerHTML = "❌ Speech recognition not supported";

        return;

    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';

    recognition.continuous = false;

    recognition.interimResults = true;

    recognitionStarted = true;

    startSpeech.innerHTML = "🎤 Listening...";

    speechStatus.innerHTML = "🎤 Say 'Happy Birthday'...";

    recognition.onresult = (event)=>{

        const transcript = Array.from(event.results)

            .map(result => result[0].transcript)

            .join('');

        speechStatus.innerHTML = "🗣️ You said: " + transcript;

        if(transcript.toLowerCase().includes("happy birthday")){

            speechStatus.innerHTML = "✅ Happy Birthday detected! 🎉";

            startSpeech.innerHTML = "✅ Voice Recognized!";

            if(voiceNext){

                voiceNext.style.display = "inline-flex";

            }

            recognition.stop();

            recognitionStarted = false;

            launchFireworks();

        }

    };

    recognition.onerror = (event)=>{

        speechStatus.innerHTML = "❌ Error: " + event.error;

        startSpeech.innerHTML = "🎤 Start Listening";

        recognitionStarted = false;

    };

    recognition.onend = ()=>{

        if(recognitionStarted){

            speechStatus.innerHTML = "⏳ Still listening... try again";

            setTimeout(()=>{

                recognition.start();

            },500);

        }

    };

    recognition.start();

};

}

/* ==========================================
        GO TO VIDEO
========================================== */

if(voiceNext){

voiceNext.onclick=()=>{

    showScene(videoScene);

    startBirthdayVideo();

};

}

/* ==========================================
        PLAY VIDEO
========================================== */

function startBirthdayVideo(){

    if(birthdayVideo){
    birthdayVideo.currentTime=0;

    birthdayVideo.play();

    gsap.fromTo(

        "#birthdayVideo",

        {

            scale:.8,

            opacity:0

        },

        {

            scale:1,

            opacity:1,

            duration:1

        }

    );
    }

}

/* ==========================================
        VIDEO ENDED
========================================== */

if(birthdayVideo){
birthdayVideo.addEventListener("ended",()=>{

    if(videoNext){
        videoNext.style.display="inline-flex";
    }

});
}

/* ==========================================
        SKIP VIDEO
========================================== */

if(birthdayVideo){
birthdayVideo.addEventListener("dblclick",()=>{

    birthdayVideo.pause();

    if(videoNext){
        videoNext.style.display="inline-flex";
    }

});
}

/* ==========================================
        FINAL SCENE
========================================== */

if(videoNext){
videoNext.onclick=()=>{

    showScene(finalScene);

    finalCelebration();

};
}

/* ==========================================
        FINAL CELEBRATION
========================================== */

function finalCelebration(){

    bgMusic.volume=0.5;

    confetti({

        particleCount:500,

        spread:360,

        startVelocity:70,

        origin:{y:.6}

    });

    floatingHearts();

    launchFireworks();

    gsap.from(

        "#finalName",

        {

            y:80,

            opacity:0,

            duration:1

        }

    );

}

/* ==========================================
        END PART 3F
========================================== */
/* =====================================================
                SCRIPT.JS
                  PART 3G
      SECRET VAULT • FINAL SURPRISE • ENDING
=====================================================*/

/* ==========================================
            SECRET VAULT
========================================== */

const unlockGift = document.getElementById("unlockGift");

const secretPassword = document.getElementById("secretPassword");

const secretText = document.getElementById("secretText");

const vault = document.getElementById("vault");

const restartBtn = document.getElementById("restart");

const SECRET_CODE = "sam1234";

/* ==========================================
        UNLOCK SECRET
========================================== */

if(unlockGift){

unlockGift.onclick = ()=>{

    const code = secretPassword.value.trim();

    if(code === SECRET_CODE){

        if(unlockSound){

            unlockSound.currentTime = 0;

            unlockSound.play();

        }

        if(vault){
            vault.style.display = "block";
        }

        if(secretText){
            secretText.style.display = "block";
        }

        gsap.fromTo(

            "#vault",

            {

                scale:.4,

                opacity:0

            },

            {

                scale:1,

                opacity:1,

                duration:1,

                ease:"elastic.out(1,0.5)"

            }

        );

        confetti({

            particleCount:600,

            spread:360,

            startVelocity:70

        });

        floatingHearts();

        launchFireworks();

    }

    else{

        gsap.fromTo(

            "#secretPassword",

            {x:-10},

            {

                x:10,

                repeat:5,

                yoyo:true,

                duration:.08

            }

        );

        alert("❌ Wrong Secret Code");

    }

};

}

/* ==========================================
        RESTART
========================================== */

if(restartBtn){

restartBtn.onclick=()=>{

    gsap.to(

        "body",

        {

            opacity:0,

            duration:1,

            onComplete(){

                location.reload();

            }

        }

    );

};

}

/* ==========================================
        ENDING SCENE AUTO SHOW
========================================== */

// Show ending after secret is revealed or after some time
let endingTimer;

function showEnding(){

    showScene(endingScene);

    startEnding();

}

/* ==========================================
        ENDING ANIMATION
========================================== */

function startEnding(){

    createRosePetals();

    endingFireworks();

    const endingTitle = document.getElementById("endingTitle");

    const endingMessage = document.getElementById("endingMessage");

    if(endingTitle){
        gsap.from(

            "#endingTitle",

            {

                y:80,

                opacity:0,

                duration:1.2

            }

        );
    }

    if(endingMessage){
        gsap.from(

            "#endingMessage",

            {

                delay:.5,

                opacity:0,

                duration:2

            }

        );
    }

}

/* ==========================================
        ROSE PETALS
========================================== */

function createRosePetals(){

    const emojis=["🌹","🌸","🌺","💮"];

    for(let i=0;i<80;i++){

        setTimeout(()=>{

            const petal=document.createElement("div");

            petal.className="petal";

            petal.innerHTML=

            emojis[Math.floor(Math.random()*emojis.length)];

            petal.style.left=Math.random()*100+"vw";

            petal.style.fontSize=

            (Math.random()*20+20)+"px";

            petal.style.animationDuration=

            (Math.random()*4+5)+"s";

            document.body.appendChild(petal);

            setTimeout(()=>{

                petal.remove();

            },9000);

        },i*120);

    }

}

/* ==========================================
        ENDING FIREWORKS
========================================== */

function endingFireworks(){

    let end=Date.now()+9000;

    (function frame(){

        confetti({

            particleCount:8,

            spread:150,

            startVelocity:60,

            origin:{

                x:Math.random(),

                y:Math.random()*0.5

            }

        });

        if(Date.now()<end){

            requestAnimationFrame(frame);

        }

    })();

}

/* ==========================================
        END PART 3G
========================================== */
/* =====================================================
                SCRIPT.JS
                  PART 3H
        FINAL POLISH • RESTART
=====================================================*/

/* ==========================================
        SHOOTING STARS
========================================== */


function createShootingStar(){

    const star=document.createElement("div");

    star.className="shootingStar";

    star.style.left=
    Math.random()*100+"vw";

    star.style.top=
    Math.random()*50+"vh";

    star.style.animationDuration=
    (Math.random()*2+2)+"s";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },4000);

}


setInterval(createShootingStar,1500);

/* ==========================================
        GALAXY PARTICLES
========================================== */


function createGalaxyParticle(){

    const particle=document.createElement("div");

    particle.className="galaxyParticle";

    particle.style.left=
    Math.random()*100+"vw";

    particle.style.top=
    Math.random()*100+"vh";

    particle.style.animationDuration=
    (Math.random()*5+5)+"s";

    document.body.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },10000);

}


setInterval(createGalaxyParticle,500);

/* ==========================================
        MUSIC FADE CONTROL
========================================== */


function fadeMusic(volume,target){

let current=volume;

const fade=setInterval(()=>{

if(current < target){

current+=0.02;

}

else{

current-=0.02;

}

bgMusic.volume=
Math.max(
0,
Math.min(1,current)
);

if(Math.abs(current-target)<0.03){

clearInterval(fade);

bgMusic.volume=target;

}

},100);

}

document.addEventListener(
"visibilitychange",
()=>{

if(document.hidden){

bgMusic.volume=.05;

}

else{

bgMusic.volume=.35;

}

});

/* ==========================================
        BUTTON CLICK EFFECT
========================================== */


document.querySelectorAll("button")
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

gsap.fromTo(

btn,

{

scale:1

},

{

scale:1.15,

duration:.15,

yoyo:true,

repeat:1

}

);

});

});

/* ==========================================
        MOBILE OPTIMIZATION
========================================== */


function mobileOptimize(){

if(window.innerWidth<600){

document.body.classList.add(
"mobile"
);

}

}

mobileOptimize();

window.addEventListener(

"resize",

mobileOptimize

);

/* ==========================================
        SHOOTING STAR CSS
========================================== */

// Add shooting star styles dynamically
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .shootingStar {
        position: fixed;
        width: 3px;
        height: 3px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 10px white;
        animation: shootingStar linear forwards;
        z-index: 9998;
        pointer-events: none;
    }
    
    @keyframes shootingStar {
        0% {
            transform: translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: translate(200px, 200px);
            opacity: 0;
        }
    }
    
    .galaxyParticle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(255,255,255,0.8), transparent);
        border-radius: 50%;
        animation: galaxyFloat linear forwards;
        z-index: -2;
        pointer-events: none;
    }
    
    @keyframes galaxyFloat {
        0% {
            transform: scale(0);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.5);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
    
    .petal {
        position: fixed;
        bottom: -50px;
        pointer-events: none;
        animation: petalFall linear forwards;
        z-index: 9997;
    }
    
    @keyframes petalFall {
        0% {
            transform: translateY(0) rotate(0deg) scale(0.5);
            opacity: 1;
        }
        100% {
            transform: translateY(-120vh) rotate(720deg) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

/* ==========================================
        PROJECT COMPLETE
========================================== */


console.log(

"🎂 Birthday Adventure Ultimate Loaded Successfully ❤️"

);
