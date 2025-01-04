function renderChart(i) {
  const ctx = document.getElementById('myChart');
  Chart.defaults.font.family = 'Pokemon Classic';
  Chart.defaults.font.size = '16';
  Chart.defaults.color = 'rgb(0, 0, 0)';
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'],
          datasets: [{
              data: [i.HP, i.ATK, i.DEF, i.SPA, i.SPD, i.SPE],
              borderWidth: 2,
              barPercentage: 0.5,
              categoryPercentage:1.5,
              borderColor: [
                  'rgb(0, 0, 0)'
              ],
              backgroundColor: [
                  'rgba(255, 0, 0, 0.8)',
                  'rgba(240,128,48, 0.8)',
                  'rgba(248,208,48, 0.8)',
                  'rgba(104,144,240, 0.8)',
                  'rgba(120,200,80, 0.8)',
                  'rgba(248,88,136, 0.8)',
              ],
          }]
      },
      options: {
          labels: {
              font: {
                  weight: 'bold',
                  family:'Pokemon Classic'
              }
          },
          indexAxis: 'y',
          scales: {
              x: {
                  display: false,
                  startsAtZero: true,
                  max: 250
              },
              y: {
                  startsAtZero: true,
              },

          },
          plugins: {
              datalabels: {
                  color: 'black',
                  anchor: 'start',
                  align: 'end',
                  font: {
                      family: 'Pokemon Classic',
                      size: 16,
                  }
              },
              legend: {
                display: false,
                labels: {
                    font: {
                        family: 'Pokemon Classic',
                    },
                },
            },
          }
      },
      plugins: [ChartDataLabels]
  });
}
