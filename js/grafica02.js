// Cargar la librería de Google Charts
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Leer el JSON desde la URL
    fetch('https://raw.githubusercontent.com/aperezn298/DatasetsPUJC/refs/heads/main/android_games_sales_update.json')
        .then(response => response.json())
        .then(jsonData => {
            // Convertir el JSON a una matriz de datos
            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Category');
            data.addColumn('number', 'Global Sales');

            // Agregar datos al DataTable
            const categoryMap = {};

            jsonData.forEach(game => {
                const category = game.category;
                const globalSales = game.Global_sales;

                if (!categoryMap[category]) {
                    categoryMap[category] = 0;
                }
                categoryMap[category] += globalSales;
            });

            for (const category in categoryMap) {
                data.addRow([category, categoryMap[category]]);
            }

            // Configuración del gráfico
            const options = {
                // title: 'Comparación de Ventas Globales por Categoría',
                title: ' ',
                legend: { position: 'none' },
                hAxis: { title: 'Ventas Globales' },
                vAxis: { title: 'Categoría' },
                bars: 'vertical',
                height: 400,
                width: '100%',
            };

            // Dibujar el gráfico
            const chart = new google.visualization.BarChart(document.getElementById('graficaDos'));
            chart.draw(data, options);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}