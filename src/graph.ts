import * as d3 from "d3";
import _data from "./cyclist-data.json";

const data = _data.map((d) => ({
  ...d,
  Time: new Date(d.Seconds * 1000),
}));

export function setupGraph(container: HTMLDivElement) {
  // Declare the chart dimensions and margins.
  const width = 800;
  const height = 520;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 60;

  // Declare styles
  const styles = {
    xLabel: "-rotate-90 text-[11px]",
    dot: "dot stroke-slate-950 opacity-75",
    legend: "text-[10px]",
    legendRect: "w-[18px] h-[18px]",
  };

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

  // Declare color scale
  const color = d3.scaleOrdinal(d3.schemeDark2);

  // Create the SVG container.
  const svg = d3.create("svg").attr("width", width).attr("height", height);

  // Add the x-axis.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .attr("id", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  // Add the y-axis.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .attr("id", "y-axis")
    .call(d3.axisLeft(y).tickFormat((d) => d3.timeFormat("%M:%S")(d as Date)));

  // Add the y-axis label.
  svg
    .append("text")
    .attr("class", styles.xLabel)
    .text("Time in Minutes")
    .attr("x", "-150")
    .attr("y", "14");

  // Add dots
  svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .style("fill", (d) => color(String(d.Doping !== "")))
    .attr("r", 5)
    .attr("class", styles.dot)
    .attr("cx", (d) => x(d.Year))
    .attr("cy", (d) => y(d.Time))
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d) => d.Time.toString());

  // Add legend group
  const legendContainer = svg
    .append("g")
    .attr("id", "legend")
    .attr("class", styles.legend);

  // Add legend labels group
  const legend = legendContainer
    .selectAll("#legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "legend-label")
    .attr("transform", (_, i) => `translate(0,${height / 2 - i * 20})`);

  // Add a rect for each legend label
  legend
    .append("rect")
    .attr("x", width - marginRight - 18)
    .attr("class", styles.legendRect)
    .style("fill", color);

  // Add a text for each legend label
  legend
    .append("text")
    .attr("x", width - marginRight - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text((d) => `${d === "true" ? "Riders with" : "No"} doping allegations`);

  // Append SVG element to the container.
  container.append(svg.node()!);
}
