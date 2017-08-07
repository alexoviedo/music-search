let results = document.querySelector('.results');
let audio = document.querySelector("#audio");
let inputValue = document.querySelector("#inputBox");

// Event listener for submit button
document.querySelector('#submit').addEventListener('click', () => {
  // Rearranges input into iTunes API format with + between words
  let plusInputValue = inputValue.value.split(" ").join("+")
  // Fetches results from iTunes API
  fetch(`https://itunes.apple.com/search?term==${plusInputValue}&media=music`)
    .then((response) => {
      // Parses response
      return response.json().then((request) => {
        for (let i = 0; i < request.results.length; i++) {

          // Results in body using innerHTML to dynamically generate the page
          results.innerHTML += `
    <div class="artistNames">
    <img class="pic" src="${request.results[i].artworkUrl100}"></img>
      <div style="display: none" class="audioPreview">${request.results[i].previewUrl}</div>
      <div id="artistName">${request.results[i].artistName}</div>
      <div id="trackName">${request.results[i].trackName}</div>
  </div>`
          //==========================End of results innerHTML=========================================

          // Event listener for click on results


          results.addEventListener("click", (resultSelect) => {
            if (resultSelect.target.matches(".pic")) {
              let resultsSelectTarget = resultSelect.target.parentElement
              audio.src = resultsSelectTarget.querySelectorAll(".audioPreview")[i].innerHTML
              // Init audio playing
              audio.play()

              // Targets HTML and displays song information
              let artistName = resultsSelectTarget.querySelector('#artistName').innerHTML
              let trackName = resultsSelectTarget.querySelector('#trackName').innerHTML
              document.querySelector('#artistSong').innerHTML = `&nbsp &nbsp &nbsp &nbsp Now Playing: ${artistName} - ${trackName}`
            }
          })
        }
      // End of for loop
      })
    })
    // End of fetch .then statment
})
// End of event listener click on search button
