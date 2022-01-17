const videoBox = document.getElementsByClassName("videoBox")[0];
const video = document.getElementById("video");
const controller = document.getElementById("controller");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const volIcon = document.getElementById("volIcon");
const volIconMute = document.getElementById("volIconMute");
const volBar = document.getElementById("volBar");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");
const fullScreen = document.getElementById("fullScreen");

fullScreen.addEventListener('click', ()=>{

    videoBox.requestFullscreen();

})


progress.addEventListener('click', function(e){
    var percent = e.offsetX / this.offsetWidth;
    progress.value = percent*100;
    video.currentTime = percent * video.duration;
})


playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", () => {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

videoBox.addEventListener("mouseover", () => {
    controller.classList.remove('hide');
});

videoBox.addEventListener("mouseleave", () => {
    controller.classList.add('hide');
});

window.addEventListener('keydown', (e)=>{

    let inputKey = e.key;

    switch (inputKey) {
        case 'ArrowLeft':
            video.currentTime -= 5;
            break;
        case 'ArrowRight':
            video.currentTime += 5;
            break;
        case 'ArrowUp':         
        // 型別要轉成數字，否則input range的value是字串相加會出問題
            if (Number(video.volume) >= 1) {
                video.volume = 1;
                volBar.value = 1;
            } else {
                volBar.value = Number(volBar.value) + 0.05;
                video.volume = volBar.value;
            }
            break;
        case 'ArrowDown':
            if (Number(volBar.value) <= 0) {
                video.volume = 0;
                volBar.value = 0;
            } else {
                volBar.value = Number(volBar.value) - 0.05;
                video.volume = volBar.value;
            }
            break;
        default:
            console.log('沒有符合的條件');
    }


})

video.addEventListener("click", () => {
  if (pauseBtn.classList[0] !== "hide") {
    video.pause();
    playBtn.classList.remove("hide");
    pauseBtn.classList.add("hide");
  } else {
    video.play();
    playBtn.classList.add("hide");
    pauseBtn.classList.remove("hide");
  }
});

stopBtn.addEventListener("click", () => {
  video.pause();
  video.currentTime = 0;
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

video.addEventListener("playing", function () {
  let duration = video.duration;
  durationTime.innerText =
    ("0" + Math.floor(duration / 60)).slice(-2) +
    ":" +
    ("0" + Math.floor(duration % 60)).slice(-2);
  playing();
});

volIcon.addEventListener("click", () => {
    volBar.value = 0;
    video.volume = 0;
    volIcon.classList.add('hide');
    volIconMute.classList.remove('hide');
});

volIconMute.addEventListener("click", () => {
    volBar.value = 0.5;
    video.volume = 0.5;
    volIcon.classList.remove('hide');
    volIconMute.classList.add('hide');
  });

volBar.addEventListener("input", volSetting);

function volSetting() {
  video.volume = volBar.value;
  console.log(Number(volBar.value))
//   volBar.value = video.volume;
}

function playing() {
  let percent = (video.currentTime / video.duration) * 100;

  if (percent <= 100) {
    timer = setTimeout(() => {
      if (progress.value < 100) {
        let min = Math.floor(video.currentTime / 60);
        let second;
        if (Math.floor(video.currentTime / 60) == 60) {
          second = "00";
        } else {
          second = Math.floor(video.currentTime % 60);
        }

        progress.value = percent;
        currentTime.innerText =
          ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
        playing();
      } else {
        progress.value = 0;
        currentTime.innerText = "00:00";
        pause.classList.add("hide");
        start.classList.remove("hide");
        clearTimeout(timer);
      }
    }, 0);
  }
}
