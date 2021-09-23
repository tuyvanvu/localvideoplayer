let thayvideo = 0;
(function localFileVideoPlayer() {
  "use strict";
  var URL = window.URL || window.webkitURL;
  var displayMessage = function (message, isError) {
    var element = document.querySelector("#message");
    element.innerHTML = message;
    element.className = isError ? "error" : "info";
  };
  const videoInput = document.getElementById("txtVideoInput");
  var playSelectedFile = function (event) {
    var file = videoInput.files[0];
    var type = file.type;
    var videoNode = document.querySelector("video");
    if (thayvideo++ === 0) videoNode.volume = 0.3;
    var canPlay = videoNode.canPlayType(type);
    if (canPlay === "") canPlay = "no";
    var message = file.name;
    var isError = canPlay === "no";
    displayMessage(message, isError);
    document.title = message;

    if (isError) {
      return;
    }

    var fileURL = URL.createObjectURL(file);
    videoNode.src = fileURL;
  };
  videoInput.addEventListener("change", playSelectedFile, false);
})();

document.getElementById("btnFlag").addEventListener("click", () => {
  let btnFlag = document.getElementById("btnFlag");
  console.log("text", btnFlag.innerText);
  if (btnFlag.innerText === "Stop") {
    console.log("go here");
    document.querySelector("video").pause();
    btnFlag.innerText = "Start";
  } else {
    document.querySelector("video").play();
    btnFlag.innerText = "Stop";
  }
});

function handleChange(eve, val) {
  "use strict";
  let videoVolumn = document.getElementById("videoVolumn");
  let videoSpeed = document.getElementById("videoSpeed");

  const videoNode = document.querySelector("video");

  console.log(
    "hello from method",
    eve,
    "with value",
    val || parseInt(videoNode.volume * 100)
  );
  switch (eve) {
    case "speed":
      if (val) {
        videoNode.playbackRate = parseFloat(val);
        videoSpeed.innerHTML = videoNode.playbackRate;
      }
      break;
    case "volumn":
      if (val) {
        const value = parseFloat(val) * 0.01;
        videoNode.volume = value;
        videoVolumn.innerHTML = parseInt(videoNode.volume * 100);
      }
      break;
  }
  videoNode.focus();
}

const speedcontainer = document.querySelector(".speedcontainer");
const soundcontainer = document.querySelector(".soundcontainer");

(function changeVolumnSpeed() {
  const videoNode = document.querySelector("video");
  document.getElementById("btnSoundPlus").addEventListener("click", (e) => {
    if (videoNode.volume < 100) {
      videoNode.volume = videoNode.volume + 0.01;
      videoVolumn.innerHTML = parseInt(videoNode.volume * 100);
    }
  });
  document.getElementById("btnSoundMinus").addEventListener("click", (e) => {
    if (videoNode.volume > 0) {
      videoNode.volume = videoNode.volume.toString() - 0.01;
      videoVolumn.innerHTML = parseInt(videoNode.volume * 100);
    }
  });
})();

for (let btn of speedcontainer.children) {
  if (btn.id !== "btnSpeedPlus" || btn.id !== "btnSpeedMinus") {
    btn.addEventListener("click", () => {
      handleChange("speed", parseFloat(btn.textContent) || 1);
    });
  }
}
for (let btn2 of soundcontainer.children) {
  if (btn2.id !== "btnSoundPlus" || btn2.id !== "btnSoundMinus") {
    btn2.addEventListener("click", () => {
      handleChange("volumn", parseFloat(btn2.textContent));
    });
  }
}
(function setUpvideo() {
  const videoNode = document.querySelector("video");
  const all = document.querySelector(".all");
  videoNode.addEventListener("keydown", (e) => {
    handleTimeClick(e);
  });

  videoNode.addEventListener("play", () => {
    videoNode.focus();
  });
  all.addEventListener("click", (e) => {
    if (e.target.tagName != "INPUT") videoNode.focus();
  });
  all.addEventListener("doubleclick", () => {
    videoNode.requestFullscreen();
  });
})();
let currtime = 0;
function handleTimeClick(e) {
  const videoNode = document.querySelector("video");
  const durationpercentage = videoNode.duration * 0.01;

  let key = e.key,
    keycode = e.keyCode;
  if (key || keycode) {
    if (key === "VK_LEFT" || keycode === 37) {
      //không đè đc event mặc định của video tag nên làm thế này để tua
      videoNode.currentTime = videoNode.currentTime + durationpercentage;
      videoNode.currentTime =
        videoNode.currentTime > 5 ? (videoNode.currentTime - 5).toString() : 0;
    }
    if (key === "VK_RIGHT" || keycode === 39) {
      videoNode.currentTime = videoNode.currentTime - durationpercentage;
      console.log("event", e);
      videoNode.currentTime =
        videoNode.currentTime < videoNode.duration - 5
          ? (videoNode.currentTime + 5).toString()
          : videoNode.duration.toString();
    }

    if (key === "d" || key === "D" || keycode === "d" || keycode === "D") {
      videoNode.currentTime =
        videoNode.currentTime + 5 > videoNode.duration
          ? videoNode.duration
          : videoNode.currentTime + 5;
    }
    if (key === "a" || key === "A" || keycode === "a" || keycode === "A") {
      videoNode.currentTime =
        videoNode.currentTime - 5 < 0 ? 0 : videoNode.currentTime - 5;
    }
    if (key === "f" || key === "F" || keycode === "f" || keycode === "F") {
      if (videoNode !== document.fullscreenElement)
        videoNode.requestFullscreen();
      else document.exitFullscreen();
    }
  }
}
let counter = 0;
(function darkMode() {
  // let body = document.querySelector("body");
  // let all = document.querySelector(".all");
  let btnSun = document.querySelector(".sun");
  let btnMoon = document.querySelector(".moon");
  btnSun.addEventListener("click", () => {
    counter++;
    if (counter > 13) {
      counter = 0;
      alert("Ấn ít thôi");
    }
    if (btnSun.classList.contains("hidestuff")) {
      btnSun.classList.remove("hidestuff");
      btnMoon.classList.add("hidestuff");
    } else {
      document.querySelector(".all").style.backgroundColor = "#203040";
      document.body.style.backgroundColor = "#121312";
      btnMoon.classList.remove("hidestuff");
      btnSun.classList.add("hidestuff");
    }
  });
  btnMoon.addEventListener("click", () => {
    counter++;
    if (counter > 13) {
      counter = 0;
      alert("Ấn ít thôi");
    }
    if (btnMoon.classList.contains("hidestuff")) {
      btnMoon.classList.remove("hidestuff");
      btnSun.classList.add("hidestuff");
    } else {
      document.body.style.backgroundColor = "rgb(96, 189, 3)";
      document.querySelector(".all").style.backgroundColor = "lawngreen";

      btnSun.classList.remove("hidestuff");
      btnMoon.classList.add("hidestuff");
    }
  });
})();
(function sth1() {
  const txtText = document.getElementById("txtText");
  txtText.addEventListener("click", () => {
    txtText.focus();
  });
  txtText.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      if (txtText.value && parseInt(txtText.value)) {
        document.querySelector("video").volume = parseInt(txtText.value) * 0.01;
        videoVolumn.innerHTML = parseInt(
          document.querySelector("video").volume * 100
        );
        txtText.value = "";
      } else {
        console.log("Nhập cái gì v trời?", txtText.value);
      }
    }
  });
})();
