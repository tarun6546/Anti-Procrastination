// Get the start and stop buttons
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');

// Get the timer container and timer text
const timerContainer = document.getElementById('timer-container');
const timerText = document.getElementById('timer');

// Set the timer duration (in minutes)
const timerDuration = 25;

// Set the distracting websites to block
const distractingWebsites = ['facebook.com', 'twitter.com', 'youtube.com'];

// Function to start the timer
function startTimer() {
  // Hide the start button and show the stop button
  startButton.style.display = 'none';
  stopButton.style.display = 'block';

  // Set the timer text to the duration
  timerText.textContent = `${timerDuration}:00`;

  // Start the timer
  let seconds = timerDuration * 60;
  const intervalId = setInterval(() => {
    seconds--;
    const minutes = Math.floor(seconds / 60);
    const secondsText = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    timerText.textContent = `${minutes}:${secondsText}`;
    if (seconds === 0) {
      clearInterval(intervalId);
      stopTimer();
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  // Show the start button and hide the stop button
  startButton.style.display = 'block';
  stopButton.style.display = 'none';

  // Reset the timer text
  timerText.textContent = '00:00:00';
}

// Function to block distracting websites
function blockDistractingWebsites() {
  // Get the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];

    // Check if the current tab is a distracting website
    if (distractingWebsites.includes(currentTab.url)) {
      // Block the website
      chrome.tabs.update(currentTab.id, { url: 'https://www.google.com' });
    }
  });
}

// Add event listeners to the start and stop buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);

// Add event listener to block distracting websites
chrome.tabs.onUpdated.addListener(blockDistractingWebsites);