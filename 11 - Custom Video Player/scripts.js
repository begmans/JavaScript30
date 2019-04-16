/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build our functions */
 function togglePlay(evt) {
     if (video.paused) {
        video.play();
     } else {
         video.pause();
         
     }
 }

 function updateButton() {
     const icon = (this.paused) ? '►' : '❚ ❚';
     toggle.textContent = icon;
 }

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
 
function updateRange() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percentage = 100 * (video.currentTime / video.duration);
    progressBar.style.flexBasis = `${percentage}%`;
}

function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}
/* Hook up th event listeners */

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(skipButton => skipButton.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener('change', updateRange))
ranges.forEach(range => range.addEventListener('mousemove', updateRange));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => {if (mousedown) scrub(e);});