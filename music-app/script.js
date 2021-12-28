const title = document.getElementById("titleBox");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const rewind = document.getElementById("rewind");
const foward = document.getElementById("foward");
const voice = document.getElementById("voice");
const volumeValue = document.getElementById("volumeValue");
const volumeValueLabel = document.getElementById("volumeValueLabel");
const musicProgress = document.getElementById("musicProgress");
const getDuration = document.getElementById("duration");
var timer;

start.addEventListener("click", function () {
    voice.play();
    start.classList.add("hide");
    pause.classList.remove("hide");

});

pause.addEventListener("click", function () {
    voice.pause();
    pause.classList.add("hide");
    start.classList.remove("hide");
    clearTimeout(timer);
});

rewind.addEventListener("click", function () {
    voice.currentTime -= 5;
});

foward.addEventListener("click", function () {
    voice.currentTime += 5;
});

function volChange() {
    volumeValueLabel.innerText = volumeValue.value;
    voice.volume = volumeValue.value / 100;
}

function dragProgress() {
    voice.currentTime = (voice.duration / 100) * musicProgress.value;
}

voice.addEventListener("playing", function () {
    let duration = voice.duration;
    durationTime.innerText =
        ("0" + Math.floor(duration / 60)).slice(-2) +
        ":" +
        ("0" + Math.floor(duration % 60)).slice(-2);
    playing();
});

function playing() {
    let percent = Math.floor((voice.currentTime / voice.duration) * 100);
    if (percent <= 100) {
        timer = setTimeout(() => {
            if (musicProgress.value < 100) {
                let min = Math.floor(voice.currentTime / 60);
                let second;
                if (Math.floor(voice.currentTime / 60) == 60) {
                    second = "00";
                } else {
                    second = Math.floor(voice.currentTime % 60);
                }

                musicProgress.value = percent;
                currentTime.innerText =
                    ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
                playing();
            } else {
                musicProgress.value = 0;
                currentTime.innerText = "00:00";
                pause.classList.add("hide");
                start.classList.remove("hide");
                clearTimeout(timer);
            }
        }, 100);
    }
}