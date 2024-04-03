// Fetch data from data.json
fetch('data.json')
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        // Call function to set track list
        setTrackList(data);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to set track list
function setTrackList(data) {
    // Get the template for the track card
    let template = document.getElementById('trackCard');

    // Loop through the songs data
    data.forEach(song => {
        // Clone the template
        const clone = template.content.cloneNode(true);

        // Get the artists' names in a string
        let artists = getDisplayArtists(song.artists);

        // Fill in the clone with song details
        clone.querySelector('.card-img-top').src = song.album.images[0].url;

        // Add event listener to the card
        clone.querySelector('.card').addEventListener('click', function() {
            // Call showInfo function when the card is clicked
            showInfo(song);
        });

        // Append the clone to the trackList container
        document.getElementById('trackList').appendChild(clone);
    });
}

// Function to show song info
function showInfo(song) {
    // Get the infoshow div
    const infoshow = document.getElementById('infoshow');

    // Toggle infoshow div's display
    if (infoshow.style.display === 'none') {
        // If currently hidden, display it
        infoshow.style.display = 'block';
    } else {
        // If currently displayed, hide it
        infoshow.style.display = 'none';
    }

    // Clear the contents of infoshow div
    infoshow.innerHTML = '';

    // Get the template for info
    let template = document.getElementById('info');

    // Clone the template
    const clone = template.content.cloneNode(true);

    // Fill in the clone with song details
    var firstThreeTracks = "";
    if (song.album.tracks.length > 0) {
        for (let i = 0; i < Math.min(song.album.tracks.length, 3); i++) {
            firstThreeTracks += song.album.tracks[i].name + ", ";
        }
        // Remove the trailing comma and space
        firstThreeTracks = firstThreeTracks.slice(0, -2);
    } else {
        firstThreeTracks = " ";
    }
    clone.querySelector('.cover').src = song.album.images[0].url;
    clone.querySelector('.card-title').textContent = song.name;
    clone.querySelector('.artist').textContent = 'Artist: ' + song.artists[0].name;
    clone.querySelector('.album').textContent = 'Album: ' + song.album.name;
    clone.querySelector('.genre').textContent = 'Genre: ' + song.artists[0].genres;
    clone.querySelector('.music').src = song.preview_url;
    clone.querySelector('.otherTracks').textContent = firstThreeTracks;

    // Append the clone to the infoshow div
    infoshow.appendChild(clone);
}


// Function to get a formatted string of artists' names
function getDisplayArtists(artists) {
    return artists.map(artist => artist.name).join(', ');
}
function msToMinutesAndSeconds(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function OpenLink() {
    window.location.href = "https://github.com/g0oseg0ose/R2.12-Integration";
}
