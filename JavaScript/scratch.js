const d3 = require("d3")
const df = [12, 31, 22, 17, 25, 18, 29, 14, 9];

d3.select("body").selectAll("h2")
  .data(df)
  .enter()
  .append("h2")
  .text((observation) => observation);
