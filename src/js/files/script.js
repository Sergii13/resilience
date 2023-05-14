// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const allClickedElem = document.querySelectorAll(".elem-item");
if (allClickedElem.length > 0) {
  let indexActive = 0;
  let timer = null;
  allClickedElem.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      indexActive = index;
    });
  });
  timer = setInterval(() => {
    indexActive++;
    if (indexActive > allClickedElem.length - 1) {
      indexActive = 0;
    }
    allClickedElem[indexActive].click();
  }, 4000);
}

const allAudioWrap = document.querySelectorAll("[data-audio]");
if (allAudioWrap.length > 0) {
  allAudioWrap.forEach((itemAudio) => {
    const audioFile = itemAudio.querySelector("[data-audio-file]");
    const btnPlayStop = itemAudio.querySelector("[data-audio-play]");
    const currentTime = itemAudio.querySelector("[data-audio-current-time]");
    const allTime = itemAudio.querySelector("[data-audio-all-time]");
    const range = itemAudio.querySelector("[data-audio-range]");
    const sound = itemAudio.querySelector("[data-audio-sound]");

    const timeLine = itemAudio.querySelector("[data-audio-timeline]");
    const progress = itemAudio.querySelector("[data-audio-progress]");
    let isPlayed = false;
    let isMuted = false;

    if (sound) {
      sound.addEventListener("click", (e) => {
        e.preventDefault();
        if (isMuted) {
          audioFile.muted = false;
          sound.classList.remove("muted");
          isMuted = false;
        } else {
          audioFile.muted = true;
          sound.classList.add("muted");
          isMuted = true;
        }
      });
    }

    audioFile.addEventListener("loadedmetadata", () => {
      allTime.textContent = getTimeCodeFromNum(audioFile.duration);
      currentTime.textContent = getTimeCodeFromNum(audioFile.currentTime);
    });

    if (timeLine) {
      timeLine.addEventListener(
        "click",
        (e) => {
          const timelineWidth = window.getComputedStyle(timeLine).width;
          const timeToSeek =
            (e.offsetX / parseInt(timelineWidth)) * audioFile.duration;
          audioFile.currentTime = timeToSeek;
        },
        false
      );
    }

    if (btnPlayStop) {
      btnPlayStop.addEventListener("click", (e) => {
        e.preventDefault();
        isPlayed = !isPlayed;
        if (isPlayed) {
          itemAudio.classList.add("active");
          audioFile.play();
        } else {
          itemAudio.classList.remove("active");
          audioFile.pause();
        }
      });
    }
    setInterval(() => {
      progress.style.width =
        (audioFile.currentTime / audioFile.duration) * 100 + "%";
      currentTime.textContent = getTimeCodeFromNum(audioFile.currentTime);
    }, 500);
  });
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
