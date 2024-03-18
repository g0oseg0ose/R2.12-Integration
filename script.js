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
        clone.querySelector('.card-title').textContent = song.name;
        clone.querySelector('.artist').textContent ='Artist: ' + song.artists[0].name;
        clone.querySelector('.album').textContent = 'Album: ' + song.album.name;
        clone.querySelector('.tps').textContent = 'Duration: ' + msToMinutesAndSeconds(song.duration_ms);
        clone.querySelector('.genre').textContent = 'Genre: ' + song.artists[0].genres;
        clone.querySelector('.card-img-top').src = song.album.images[0].url;

        // Append the clone to the trackList container
        document.getElementById('trackList').appendChild(clone);
    });
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

