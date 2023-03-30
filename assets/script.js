import init from "./googleSheet.js";

function main() {
  const appInit = init();
  appInit.setUpData(appInit.renderTiles);
}

main();
