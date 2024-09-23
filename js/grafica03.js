// Cargar la librería de Google Charts
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Leer el JSON desde la URL
    fetch('https://raw.githubusercontent.com/aperezn298/DatasetsPUJC/refs/heads/main/android_games_sales_update.json')
        .then(response => response.json())
        .then(jsonData => {
            // Crear un DataTable con dos columnas para el crecimiento de 30 y 60 días
            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Juego');
            data.addColumn('number', 'Crecimiento 30 días');
            data.addColumn('number', 'Crecimiento 60 días');

            // Agregar los datos de crecimiento de instalaciones
            jsonData.forEach(game => {
                const title = game.title;
                const installs_30_days = game.growth_30_days;
                const installs_60_days = game.growth_60_days;

                // Agregar una fila con las instalaciones de 30 y 60 días
                data.addRow([title, installs_30_days, installs_60_days]);
            });

            // Configuración del gráfico de líneas
            const options = {
                // title: 'Crecimiento de Instalaciones en 30 y 60 días',
                title: ' ',
                hAxis: { title: 'Juegos' },
                vAxis: { 
                    title: 'Crecimiento de Instalaciones',
                    ticks: [0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000], // Ticks personalizados
                    viewWindow: {
                        min: 0, // Comienza en 0
                    },
                },
                height: 400,
                width: '100%',
                legend: { position: 'bottom' },
                series: {
                    0: { lineWidth: 3, color: '#FF5733' }, 
                    1: { lineWidth: 3, color: '#33A1FF' }
                }
            };

            // Dibujar el gráfico
            const chart = new google.visualization.LineChart(document.getElementById('graficaTres'));
            chart.draw(data, options);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}