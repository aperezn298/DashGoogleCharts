// Cargar la librería de Google Charts
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Leer el JSON desde la URL
    fetch('https://raw.githubusercontent.com/aperezn298/DatasetsPUJC/refs/heads/main/android_games_sales_update.json')
        .then(response => response.json())
        .then(jsonData => {
            // Inicializar las variables para sumar las ventas de juegos pagos y gratuitos
            let totalPaidSales = 0;
            let totalFreeSales = 0;

            // Sumar las ventas globales según si el juego es pago o gratuito
            jsonData.forEach(game => {
                if (game.paid) {
                    totalPaidSales += game.Global_sales;
                } else {
                    totalFreeSales += game.Global_sales;
                }
            });

            // Crear un DataTable para las ventas según el tipo de juego (pago o gratuito)
            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Tipo de Juego');
            data.addColumn('number', 'Ventas');
            data.addRows([
                ['Juegos Pagos', totalPaidSales],
                ['Juegos Gratuitos', totalFreeSales]
            ]);

            // Configuración del gráfico de pastel
            const options = {
                // title: 'Participación de Ventas según Juegos Pagos y Gratuitos',
                title: ' ',
                pieHole: 0.4, // Para gráfico de dona
                height: 400,
                width: '100%',
                slices: {
                    0: { color: '#1E90FF' },  // Color para Juegos Pagos
                    1: { color: '#32CD32' }   // Color para Juegos Gratuitos
                }
            };

            // Dibujar el gráfico de pastel
            const chart = new google.visualization.PieChart(document.getElementById('graficaSexta'));
            chart.draw(data, options);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}