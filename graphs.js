window.addEventListener('load', () => {
    d3.json('data.json').then((data) => {
        data.forEach((song) => {
            var popularityCategory4 = [];
            var popularityCategory3 = [];
            var popularityCategory2 = [];
            var popularityCategory1 = [];

            for (let i = 0; i < songs.length; i++) {
                const popularity = songs[i].popularity;
                if (popularity >= 0 && popularity < 25) {
                    popularityCategory4.push(songs[i]);
                } else if (popularity >= 25 && popularity < 50) {
                    popularityCategory3.push(songs[i]);
                } else if (popularity >= 50 && popularity < 75) {
                    popularityCategory2.push(songs[i]);
                } else if (popularity >= 75 && popularity <= 100) {
                    popularityCategory1.push(songs[i]);
                }
            }
        });
    });
});

const config = {
    type: 'polarArea',
    data: {},
    options: {},
    plugins: []
  }