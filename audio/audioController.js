const audio = document.getElementById("myAudio");
const playPauseBtn = document.getElementById("playPauseBtn");
const volumeControl = document.getElementById("volumeControl");
const muteBtn = document.getElementById("muteBtn");
const currentTimeDisplay = document.getElementById("currentTime");
const durationTimeDisplay = document.getElementById("durationTime");
const progressBar = document.getElementById("progressBar");
const progressSlider = document.getElementById("progressSlider");
// Play/Pause toggle function
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

// Volume control
volumeControl.addEventListener("input", function () {
  audio.volume = this.value;
});

// Mute toggle function
function toggleMute() {
  audio.muted = !audio.muted;
  muteBtn.innerHTML = audio.muted
    ? '<i class="fas fa-volume-mute"></i>'
    : '<i class="fas fa-volume-up"></i>';
}

// Update time display
audio.addEventListener("loadedmetadata", function () {
  durationTimeDisplay.textContent = formatTime(audio.duration);
  progressSlider.max = audio.duration; // Set max value of progress slider to audio duration
});
audio.addEventListener("timeupdate", function () {
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  progressSlider.value = audio.currentTime; // Update progress slider value
});

// Slider input event to seek through audio
progressSlider.addEventListener("input", function () {
  audio.currentTime = progressSlider.value; // Seek to the selected time
});

// Load save time
window.addEventListener("load", function () {
  const savedTime = localStorage.getItem("audioCurrentTime");
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }
});

// Save current time on pause or before unloading
function saveCurrentTime() {
  localStorage.setItem("audioCurrentTime", audio.currentTime);
}

// Event listener for saving current time
audio.addEventListener("pause", saveCurrentTime);
window.addEventListener("beforeunload", saveCurrentTime); // Save time on page unload

// Update time display and progress bar
audio.addEventListener("loadedmetadata", function () {
  durationTimeDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function () {
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  progressBar.value = audio.currentTime / audio.duration; // Update progress bar
});
// Format time function
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
