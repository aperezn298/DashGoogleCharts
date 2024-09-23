// Cargar la librería de Google Charts
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Leer el JSON desde la URL
    fetch('https://raw.githubusercontent.com/aperezn298/DatasetsPUJC/refs/heads/main/android_games_sales_update.json')
        .then(response => response.json())
        .then(jsonData => {
            // Inicializar las variables para sumar las ventas por región
            let totalUSSales = 0;
            let totalEUSales = 0;
            let totalJPSales = 0;

            // Sumar las ventas en cada región
            jsonData.forEach(game => {
                totalUSSales += game.US_Sales;
                totalEUSales += game.EU_sales;
                totalJPSales += game.JP_sales;
            });

            // Crear un DataTable para las ventas por región
            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Región');
            data.addColumn('number', 'Ventas');
            data.addRows([
                ['Estados Unidos', totalUSSales],
                ['Europa', totalEUSales],
                ['Japón', totalJPSales]
            ]);

            // Configuración del gráfico de pastel
            const options = {
                // title: 'Participación de Ventas por Región',
                title: ' ',
                pieHole: 0.4, // Si quieres un gráfico de dona, puedes ajustar este valor
                height: 400,
                width: '100%',
                slices: {
                    0: { color: '#3366CC' },  // Color para US
                    1: { color: '#DC3912' },  // Color para EU
                    2: { color: '#FF9900' }   // Color para JP
                }
            };

            // Dibujar el gráfico de pastel
            const chart = new google.visualization.PieChart(document.getElementById('graficaQuinta'));
            chart.draw(data, options);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}