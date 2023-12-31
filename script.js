const button = document.getElementById('btn');
const audioElement = document.getElementById('audio');

function toggleButton() {
  button.disabled = !button.disabled;
}

// Speech Function

function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');
  // Speech parameters
  VoiceRSS.speech({
    key: '868dfa8c73224665b0d1cd9514bcf92a',
    src: jokeString,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Passing Joke to VoiceRSS API
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Error Here
  }
}

// Event Listeners from Enter Key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    getJokes();
  }
});

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
