
const audio = new Audio("./src/music/song-of-war.mp3");
const volumeControl = document.getElementById("volumeControl");
const volumeIcon = document.getElementById("volumeIcon");
const volumeRange = document.getElementById("volumeRange");

volumeIcon.addEventListener("click", function () {
  if (audio.volume === 0) {
    audio.volume = volumeRange.value || 0.5; 
  } else {
    audio.volume = 0;
  }
  updateVolumeIcon();
});

volumeControl.addEventListener("mouseenter", function () {
  volumeRange.style.opacity = 1;
});

volumeControl.addEventListener("mouseleave", function () {
  volumeRange.style.opacity = 0;
});

function updateVolumeIcon() {
  const icon = document.querySelector(".material-symbols-sharp");
  if (audio.volume === 0) {
    icon.textContent = "volume_off";
  } else {
    volumeIcon.style.backgroundColor = "var(--transparent)";
    icon.textContent = "volume_up";
  }
}

volumeRange.addEventListener("input", function () {
  audio.volume = volumeRange.value;
  updateVolumeIcon();
});
const playBackgroundMusic = () => {
  audio.play();
  audio.autoplay = true;
};
export default playBackgroundMusic