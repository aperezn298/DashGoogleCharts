// Cargar la librería de Google Charts
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Leer el JSON desde la URL
    fetch('https://raw.githubusercontent.com/aperezn298/DatasetsPUJC/refs/heads/main/android_games_sales_update.json')
        .then(response => response.json())
        .then(jsonData => {
            // Crear un DataTable con tres columnas: Categoría, Calificación de Usuarios, Calificación de Críticos
            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Categoría');
            data.addColumn('number', 'Calificación Usuarios');
            data.addColumn('number', 'Calificación Críticos');

            // Mapa para acumular las calificaciones por categoría
            const categoryMap = {};

            jsonData.forEach(game => {
                const category = game.category;
                const userRating = game.User_rating;
                const criticRating = game.Critic_Rating;

                if (!categoryMap[category]) {
                    categoryMap[category] = { userRatingTotal: 0, criticRatingTotal: 0, count: 0 };
                }

                categoryMap[category].userRatingTotal += userRating;
                categoryMap[category].criticRatingTotal += criticRating;
                categoryMap[category].count++;
            });

            // Calcular los promedios por categoría y agregarlos al DataTable
            for (const category in categoryMap) {
                const averageUserRating = categoryMap[category].userRatingTotal / categoryMap[category].count;
                const averageCriticRating = categoryMap[category].criticRatingTotal / categoryMap[category].count;

                data.addRow([category, averageUserRating, averageCriticRating]);
            }

            // Configuración del gráfico
            const options = {
                // title: 'Comparación de Calificaciones de Usuarios y Críticos por Categoría',
                title: ' ',
                hAxis: { title: 'Categoría' },
                vAxis: { title: 'Calificación Promedio' },
                height: 400,
                width: '100%',
                legend: { position: 'bottom' },
                bars: 'vertical',
                series: {
                    0: { color: '#1f77b4' }, // Color para User_rating
                    1: { color: '#ff7f0e' }  // Color para Critic_Rating
                },
                bar: { groupWidth: '75%' } // Ancho de las barras
            };

            // Dibujar el gráfico de barras
            const chart = new google.visualization.ColumnChart(document.getElementById('graficaCuatro'));
            chart.draw(data, options);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}