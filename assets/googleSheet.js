function initialize() {
  const sheetId = "1tRdogZyQuA4kBA6UhKLDwOTaOkAi2-gsrmSkFGuZxKI";
  const sheetName = "Sheet1";
  let tableData = [];
  let regions = [];
  const addSearchEventListener = () => {
    document.getElementById("searchBtn").addEventListener("click", () => {
      const searchInput = document.getElementById("searchText");
      const searchString = searchInput.value;
      const regionSelector = document.getElementById("selectedRegion");
      const region = regionSelector.value;
      searchInput.value = "";
      renderFilteredTiles(region, searchString);
    });
  };
  const setUpData = (callback) => {
    // Step 1: Fetch the data from Google Sheets API
    fetch(
      `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}`
    )
      .then((res) => res.text())
      .then((data) => {
        // Step 2: Extract the relevant data from the response
        let rep = JSON.parse(data.substr(47).slice(0, -2));
        const table = rep.table;
        const [headersRaw, ...tableDataRaw] = table.rows;
        const headers = headersRaw.c.map((col) => col.v);
        const getIndex = (header) => headers.indexOf(str);
        tableData = tableDataRaw.map((t) => t.c.map((col) => col.v));
        initRegion(tableData);
        addSearchEventListener();
        return callback(tableData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const initRegion = (data) => {
    let options = "<option selected value=''>Select</option>";
    regions = data
      .map((data) => data[2])
      .filter((el, i, ar) => i === ar.indexOf(el));
    regions.forEach((region) => {
      options += `<option value="${region}">${region}</option>`;
    });
    let regionContainer = document.getElementById("countryContainer");
    regionContainer.innerHTML = `<div class="row">
    <div class="col-6 col-sm-3">
    <label for="region">Country</label>
      <select name="region" class="form-select" aria-label="Default select example"  id="selectedRegion">
      ${options}
      </select>
    </div>
  </div>`;
    const regionSelector = document.getElementById("selectedRegion");
    if (regionSelector) {
      regionSelector.addEventListener("change", function () {
        renderFilteredTiles(this.value);
      });
    }
  };
  const renderTiles = (tableData) => {
    const listDiv = document.getElementById("productList");
    if (tableData.length > 0) {
      const iFrames = tableData
        .filter((f) => f[0].startsWith("<iframe "))
        .map((el) => {
          const frameDiv = document.createElement("div");
          frameDiv.setAttribute(
            "class",
            "col-6 col-sm-3 col-md-2 text-center "
          );
          frameDiv.innerHTML = `${el[0]}`;
          return frameDiv;
        });

      if (listDiv) {
        listDiv.innerHTML = "";
        iFrames.forEach((frame) => {
          listDiv.appendChild(frame);
        });
      }
    } else {
      listDiv.innerHTML = ` <h4> No Item </h4>`;
    }
  };

  const renderFilteredTiles = (region = "", searchString = "") => {
    let data = [];
    if (region !== "") {
      data = tableData.filter((row) => row[2] === region);
    } else {
      data = tableData;
    }
    if (searchString !== "") {
      data = data.filter((row) => row[1].toLowerCase().includes(searchString));
    }
    renderTiles(data);
  };

  return { setUpData, renderTiles, renderFilteredTiles };
}

function main() {
  const appInit = initialize();
  appInit.setUpData(appInit.renderTiles);
}

main();
