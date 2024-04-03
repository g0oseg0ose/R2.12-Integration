window.addEventListener('load', () => {
  fetch('data.json')
      .then(response => response.json())
      .then((data) => {
          var dataPop = [0, 0, 0, 0];
          data.forEach((song) => {
              const popularity = song.popularity;
              if (popularity >= 0 && popularity < 25) {
                  dataPop[0]++;
              } else if (popularity >= 25 && popularity < 50) {
                  dataPop[1]++;
              } else if (popularity >= 50 && popularity < 75) {
                  dataPop[2]++;
              } else if (popularity >= 75 && popularity <= 100) {
                  dataPop[3]++;
              }

          });

          const ctxPopularity = document.getElementById('Popularity');
          new Chart(ctxPopularity, {
              type: 'pie',
              data: {
                  labels: ['0-25', '25-50', '50-75', '75-100'],
                  datasets: [{
                      label: 'Number of Songs',
                      data: dataPop,
                      backgroundColor: 'rgba(30, 215, 96, 0.2)',
                      borderColor: 'rgba(30, 215, 96,1)',
                      borderWidth: 1
                  }]
              }
          });
      });
});

window.addEventListener('load', () => {
  fetch('data.json')
      .then(response => response.json())
      .then((data) => {
          var date = [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0,0,0,0]; // Initialize the array to store counts for each year

          data.forEach((song) => {
              const releaseDate = new Date(song.album.release_date);
              const year = releaseDate.getFullYear();
              // Increment the count for the corresponding year in the date array
              if (year >= 1995 && year <= 2024) {
                  date[year - 1995]++; // Adjust the index based on the range of years
              }
          });

          const ctxYear = document.getElementById('year');
          new Chart(ctxYear, {
              type: 'bar',
              data: {
                  labels: ['1995', '1996', '1997', '1998', '1999', '2000','2001', '2002', '2003', '2004', '2005', '2006', '2007','2009', '2010', '2011', '2012', '2013', '2014', '2015','2016', '2017', '2018', '2019', '2020', '2021', '2022','2023', '2024'], // Assuming data for these years
                  datasets: [{
                      label: 'Number of song released that year',
                      data: date,
                      backgroundColor: 'rgba(30, 215, 96, 0.2)',
                      borderColor: 'rgba(30, 215, 96,1)',
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
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
};
