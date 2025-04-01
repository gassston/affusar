document.addEventListener('DOMContentLoaded', function() {
    const tablesContainer = document.querySelector('.tables-container');
    const dataFilePaths = [
        '/data/elite.json',
        '/data/a1.json',
        '/data/a2_zona_1.json',
        '/data/a2_zona_2.json',
        '/data/femenino.json',
        '/data/senior.json',
        '/data/veteranos.json'
    ];

    const fetchPromises = dataFilePaths.map(filePath =>
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} for ${filePath}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(`Error fetching data from ${filePath}:`, error);
                return null;
            })
    );

    Promise.all(fetchPromises)
        .then(allData => {
            const validData = allData.filter(data => data !== null && data !== undefined);
            if (validData.length === 0) {
                tablesContainer.textContent = 'No data loaded.';
                return;
            }
            createTablesForToday(validData, dataFilePaths);
        })
        .catch(error => {
            console.error('Error processing all data:', error);
            tablesContainer.textContent = 'Error loading data.';
        });

    function getArgentinaDate() {
        const now = new Date();
        const utcTimestamp = Math.floor(now.getTime() / 1000.0);
        const argentinaOffsetSeconds = -3 * 60 * 60;
        const argentinaTimestamp = utcTimestamp + argentinaOffsetSeconds;
        return new Date(argentinaTimestamp * 1000);
    }

    function createTablesForToday(allData, filePaths) {
        const todayArgentina = getArgentinaDate();
        const todayString = todayArgentina.toISOString().split('T')[0];
        let hasMatches = false;
        tablesContainer.innerHTML = '';

        allData.forEach((data, index) => {
            if (!data || !Array.isArray(data)) return;
            const filePath = filePaths[index];
            const fileName = filePath.split('/').pop().split('.')[0].toUpperCase();

            data.forEach(tableData => {
                if (!tableData || !tableData.Data || !Array.isArray(tableData.Data)) return;
                const filteredData = tableData.Data.filter(match => {
                    if (!match || !match.Fecha) return false;
                    const matchDateParts = match.Fecha.split(' ')[0].split('/');
                    const matchDateFormatted = `${matchDateParts[2]}-${matchDateParts[1]}-${matchDateParts[0]}`;
                    return matchDateFormatted === todayString;
                });

                if (filteredData.length > 0) {
                    hasMatches = true;
                    const table = document.createElement('table');
                    const caption = document.createElement('caption');
                    caption.textContent = fileName;
                    table.appendChild(caption);
                    const thead = document.createElement('thead');
                    const tbody = document.createElement('tbody');
                    const validKeys = new Set();

                    filteredData.forEach(match => {
                        Object.keys(match).forEach(key => {
                            if (match[key] && match[key].toString().trim() !== '') {
                                validKeys.add(key);
                            }
                        });
                    });

                    const orderedKeys = Array.from(validKeys);
                    const headerRow = document.createElement('tr');
                    orderedKeys.forEach(headerText => {
                        const th = document.createElement('th');
                        th.textContent = headerText;
                        headerRow.appendChild(th);
                        if (headerText === 'Local' || headerText === 'Visitante') {
                            const thLogo = document.createElement('th');
                            thLogo.textContent = '';
                            headerRow.appendChild(thLogo);
                        }
                    });
                    thead.appendChild(headerRow);
                    table.appendChild(thead);

                    filteredData.forEach(match => {
                        const row = tbody.insertRow();
                        orderedKeys.forEach(key => {
                            const cell = row.insertCell();
                            cell.textContent = match[key] || '';
                            if (key === 'Local' || key === 'Visitante') {
                                const logoCell = row.insertCell();
                                const teamName = match[key];
                                const img = document.createElement('img');
                                img.src = `/logos/logo_${teamName.replace(/\s+/g, '_').toLowerCase()}.png`;
                                img.alt = teamName;
                                img.style.width = '40px';
                                img.style.height = '40px';
                                logoCell.appendChild(img);
                            }
                        });
                    });
                    table.appendChild(tbody);
                    tablesContainer.appendChild(table);
                }
            });
        });

        if (!hasMatches) {
            tablesContainer.textContent = 'No matches scheduled for today.';
        }
    }
});