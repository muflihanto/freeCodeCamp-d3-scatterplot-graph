import * as d3 from "d3";
import _data from "./cyclist-data.json";

const data = _data.map((d) => ({
  ...d,
  Time: new Date(d.Seconds * 1000),
}));

export function setupGraph(container: HTMLDivElement) {
  // Declare the chart dimensions and margins.
  const width = 720;
  const height = 480;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => d.Year)! - 1,
      d3.max(data, (d) => d.Year)! + 1,
    ])
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.Time) as [Date, Date])
    .range([marginTop, height - marginBottom]);

  // Create the SVG container.
  const svg = d3.create("svg").attr("width", width).attr("height", height);

  // Add the x-axis.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  // Add the y-axis.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickFormat((d) => d3.timeFormat("%M:%S")(d as Date)));

  // Append SVG element to the container.
  container.append(svg.node()!);
}
