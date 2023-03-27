const sheetId = '2PACX-1vQDZUgLCtmyyQulx9km_rH9glT4PV6jQZFLnjhW_dPl-V-jAUkoG4JJ1D_I8gJXIwPSIKAxEleSs5s6';
const sheetName = 'Sheet1';

// Step 1: Fetch the data from Google Sheets API
fetch(`https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/values?alt=json`)
  .then(response => response.json())
  .then(data => {
    // Step 2: Extract the relevant data from the response
    const rows = data.feed.entry;
    const headers = Object.keys(rows[0]).filter(header => header.startsWith('gsx$'));
    
    // Step 3: Convert the data to a JSON object
    const items = rows.map(row => {
      const item = {};
      headers.forEach(header => {
        const key = header.replace('gsx$', '');
        item[key] = row[header].$t;
      });
      return item;
    });
    console.log('fetching google sheet');
    // Step 4: Do something with the JSON object (e.g. log it to console)
    console.log(items);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
