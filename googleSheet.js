const sheetId = "1tRdogZyQuA4kBA6UhKLDwOTaOkAi2-gsrmSkFGuZxKI";
const sheetName = "Sheet1";

// Step 1: Fetch the data from Google Sheets API
// fetch(`https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/values?alt=json`)
fetch(
  `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}`
  // `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}&range=${sheetRange}`
)
  .then((res) => res.text())
  .then((data) => {
    // Step 2: Extract the relevant data from the response
    let rep = JSON.parse(data.substr(47).slice(0, -2));
    const table = rep.table;
    const [headersRaw, ...tableDataRaw] = table.rows;
    const headers = headersRaw.c.map((col) => col.v);
    const tableData = tableDataRaw.map((t) => t.c.map((col) => col.v));

    const iFrames = tableData
      .filter((f) => f[0].startsWith("<iframe "))
      .map((el) => {
        const frameDiv = document.createElement("div");
        frameDiv.setAttribute("class", "col-6 col-sm-2 text-center ");
        frameDiv.innerHTML = `${el[0]}`;
        return frameDiv;
      });

    const listDiv = document.getElementById("productList");
    if (listDiv) {
      iFrames.forEach((frame) => {
        listDiv.appendChild(frame);
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
