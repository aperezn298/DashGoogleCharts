google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    fetch('https://raw.githubusercontent.com/aperezn298/DatasetsPUJC/refs/heads/main/android_games_sales_update.json')
        .then(response => response.json())
        .then(jsonData => {
            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Categoría');
            data.addColumn('number', 'Calificación Promedio');

            const categoryMap = {};

            jsonData.forEach(game => {
                const category = game.category;
                const averageRating = game['average rating'];

                if (!categoryMap[category]) {
                    categoryMap[category] = [];
                }
                categoryMap[category].push(averageRating);
            });

            for (const category in categoryMap) {
                const ratings = categoryMap[category];
                const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
                data.addRow([category, avg]);
            }

            const options = {
                // title: 'Distribución de Calificaciones Promedio por Categoría',
                title: ' ',
                legend: { position: 'none' },
                hAxis: { title: 'Categoría', slantedText: true, slantedTextAngle: 45 },
                vAxis: { title: 'Calificación Promedio' },
                height: 400,
                width: '100%',
            };

            const chart = new google.visualization.ColumnChart(document.getElementById('graficaUno'));
            chart.draw(data, options);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}