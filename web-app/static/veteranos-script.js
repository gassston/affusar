document.addEventListener('DOMContentLoaded', function() {
    const tablesContainer = document.querySelector('.tables-container');
    const dataFilePath = '/data/veteranos.json';

    fetch(dataFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(allTablesData => {
            if (allTablesData && Array.isArray(allTablesData)) {
                allTablesData.forEach(tableData => {
                    if (tableData.Table && tableData.Data && Array.isArray(tableData.Data)) {
                        const table = document.createElement('table');
                        table.id = tableData.Table.toLowerCase().replace(/ /g, '-');

                        // Create the special row above the table
                        const captionRow = document.createElement('caption');
                        captionRow.textContent = `Fecha ${tableData.Table.split(' ')[1]}`;
                        table.appendChild(captionRow);

                        const thead = document.createElement('thead');
                        const headerRow = document.createElement('tr');
                        [
                            'Fecha',
                            'Local',
                            'Goles Local',
                            'Visitante',
                            'Goles Visitante',
                            'Zona',
                            'Cancha',
                            'Arbitro 1',
                            'Arbitro 2'
                        ].forEach(headerText => {
                            const th = document.createElement('th');
                            th.textContent = headerText;
                            headerRow.appendChild(th);
                        });
                        thead.appendChild(headerRow);
                        table.appendChild(thead);

                        const tbody = document.createElement('tbody');
                        tableData.Data.forEach(match => {
                            const row = tbody.insertRow();

                            const fechaCell = row.insertCell();
                            fechaCell.textContent = match.Fecha;
                            const localCell = row.insertCell();
                            localCell.textContent = match.Local;
                            const golesLocalCell = row.insertCell();
                            golesLocalCell.textContent = match.GL;
                            const visitanteCell = row.insertCell();
                            visitanteCell.textContent = match.Visitante;
                            const golesVisitanteCell = row.insertCell();
                            golesVisitanteCell.textContent = match.GV;
                            const zonaCell = row.insertCell();
                            zonaCell.textContent = match.Zona;
                            const canchaCell = row.insertCell();
                            canchaCell.textContent = match.Cancha;
                            const arbitro1Cell = row.insertCell();
                            arbitro1Cell.textContent = match['Arbitro 1'];
                            const arbitro2Cell = row.insertCell();
                            arbitro2Cell.textContent = match['Arbitro 2'];
                        });
                        table.appendChild(tbody);

                        tablesContainer.appendChild(table);
                    } else {
                        console.warn(`'Table', 'Data' not found or 'Data' is not an array in a table entry.`);
                    }
                });
            } else {
                console.error('Data from data.json is not an array or is empty.');
            }
        })
        .catch(error => {
            console.error('Could not fetch or parse data from data.json:', error);
        });
});