// Cargar la librería de Google Charts
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Leer el JSON desde la URL
    fetch('https://raw.githubusercontent.com/aperezn298/DatasetsPUJC/refs/heads/main/android_games_sales_update.json')
        .then(response => response.json())
        .then(jsonData => {
            // Crear un DataTable para el crecimiento por categoría
            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Categoría');
            data.addColumn('number', 'Crecimiento 30 días');
            data.addColumn('number', 'Crecimiento 60 días');

            // Mapa para acumular el crecimiento por categoría
            const categoryMap = {};

            jsonData.forEach(game => {
                const category = game.category;
                const growth30 = game.growth_30_days;
                const growth60 = game.growth_60_days;

                if (!categoryMap[category]) {
                    categoryMap[category] = { growth30: 0, growth60: 0 };
                }

                categoryMap[category].growth30 += growth30;
                categoryMap[category].growth60 += growth60;
            });

            // Agregar los datos al DataTable
            for (const category in categoryMap) {
                data.addRow([category, categoryMap[category].growth30, categoryMap[category].growth60]);
            }

            // Configuración del gráfico
            const options = {
                // title: 'Crecimiento de Juegos por Categoría en 30 y 60 Días',
                title: ' ',
                hAxis: { title: 'Categoría' },
                vAxis: { title: 'Crecimiento' },
                height: 400,
                width: '100%',
                legend: { position: 'bottom' },
                series: {
                    0: { color: '#FF5733' }, // Línea para crecimiento en 30 días
                    1: { color: '#33A1FF' }  // Línea para crecimiento en 60 días
                },
                curveType: 'function' // Habilitar curvas en las líneas
            };

            // Dibujar el gráfico de líneas
            const chart = new google.visualization.LineChart(document.getElementById('graficaSiete'));
            chart.draw(data, options);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}