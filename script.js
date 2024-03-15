window.addEventListener('load', () => {
    fetch('data.json')
    .then(response => response.json())
        .then((data) => {
        data.forEach((song) => {
            var card = document.createElement('div');
            card.classList.add('card', 'mb-3');

            var row = document.createElement('div');
            row.classList.add('row', 'g-0');
            card.appendChild(row);

            var imageCol = document.createElement('div');
            imageCol.classList.add('col-md-4', 'd-flex', 'justify-content-center', 'align-items-center');
            var image = document.createElement('img');
            image.src = song.album.images[0].url; // Assuming the first image is used
            image.classList.add('img-fluid', 'rounded-start');
            image.alt = 'album-display';
            imageCol.appendChild(image);
            row.appendChild(imageCol);

            var infoCol = document.createElement('div');
            infoCol.classList.add('col-md-8');
            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            infoCol.appendChild(cardBody);

            var title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = song.name;
            cardBody.appendChild(title);

            var infoList = document.createElement('ul');
            infoList.classList.add('list-group', 'list-group-flush');

            var artistItem = document.createElement('li');
            artistItem.classList.add('list-group-item');
            artistItem.textContent = 'Artist: ' + song.artists[0].name;
            infoList.appendChild(artistItem);

            var albumItem = document.createElement('li');
            albumItem.classList.add('list-group-item');
            albumItem.textContent = 'Album: ' + song.album.name;
            infoList.appendChild(albumItem);

            var durationItem = document.createElement('li');
            durationItem.classList.add('list-group-item');
            durationItem.textContent = 'Duration: ' + msToMinutesAndSeconds(song.duration_ms);
            infoList.appendChild(durationItem);

            var albumGenre = document.createElement('li');
            albumGenre.classList.add('list-group-item');
            albumGenre.textContent = 'Genre: ' + song.artists[0].genres;
            infoList.appendChild(albumGenre);

            card.addEventListener('click', () => {
                var title = document.createElement('h5');
                title.classList.add('card-title');
                title.textContent = song.name;

                var audio = document.createElement('audio');
                audio.setAttribute('controls', '');
                var source = document.createElement('source');
                source.setAttribute('src', song.preview_url);
                source.setAttribute('type', 'audio/mpeg');
                audio.appendChild(source);

                // Clear the existing content in listenSong
                document.getElementById('listenSong').innerHTML = '';
                document.getElementById('listenSong').appendChild(title);
                document.getElementById('listenSong').appendChild(audio);
            });

            card.addEventListener('click', () => {   
                var title = document.createElement('h5');
                title.classList.add('card-title');
                title.textContent = "From the album";
                cardBody.appendChild(title);

                var firstThreeTracks = "";
                for (let i = 0; i < 3; i++) {
                    firstThreeTracks += song.album.tracks[i].name + ", ";
                }
                // Remove the trailing comma and space
                firstThreeTracks = firstThreeTracks.slice(0, -2);
            
                var otherTracks = document.createElement('h6');
                otherTracks.textContent = firstThreeTracks;

                document.getElementById('album').innerHTML = '';
                document.getElementById('album').appendChild(title);
                document.getElementById('album').appendChild(otherTracks);
            });

            cardBody.appendChild(infoList);
            row.appendChild(infoCol);

            document.getElementById('songList').appendChild(card);
        });
    });
});

function msToMinutesAndSeconds(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
