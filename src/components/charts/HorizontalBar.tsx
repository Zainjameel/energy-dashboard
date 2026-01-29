// @ts-nocheck
import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import type { BarRow } from "../../data/mock";
import { useResizeObserver } from "./useResizeObserver";

export default function HorizontalBar({     //Renders a horizontal bar chart
  data,                    //Array of data rows to plot
  valueLabel = "USD",     //Default value label is "USD"
}: {
  data: BarRow[];         //Array of data rows to plot
  valueLabel?: string;   //Label to show after values (e.g., "USD" or "kWh")
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);    //React ref pointing to <svg> . D3 uses this to draw
  const { setRef, size } = useResizeObserver<HTMLDivElement>();   //setRef → attach to wrapping <div> . size.width / size.height → live container size

  const sorted = useMemo(() => [...data].sort((a, b) => b.value - a.value), [data]);    //Sorts data descending by value

  useEffect(() => {
    const svg = d3.select(svgRef.current);//Selects the <svg> element using D3
    svg.selectAll("*").remove();//Clears previous drawing.  Prevents duplicate charts when re-rendering

    const width = size.width || 600;//Default width if size.width is undefined
    const height = size.height || 280;//Default height if size.height is undefined
    const margin = { top: 10, right: 16, bottom: 32, left: 160 };

    svg.attr("width", width).attr("height", height);//Sets SVG size to container size (or defaults)

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);//

    const y = d3
      .scaleBand<string>()//Creates a band scale for the y-axis
      .domain(sorted.map((d) => d.name))//Sets domain to the names from the sorted data
      .range([0, innerH])//Sets range to the inner height of the chart
      .padding(0.3);//Adds padding between bars

    const xMax = d3.max(sorted, (d) => d.value) ?? 0;//Finds the maximum value in the data for x-axis scaling

    const x = d3
      .scaleLinear()//Creates a linear scale for the x-axis
      .domain([0, xMax])//Sets the domain of the x-axis to [0, max value]
      .nice()// Rounds the domain to nice round numbers
      .range([0, innerW]);//Sets range to the inner width of the chart

    // x axis
    g.append("g")//Appends an SVG group element for the x-axis
      .attr("transform", `translate(0,${innerH})`)//Positions x-axis at the bottom of the chart
      .call(d3.axisBottom(x).ticks(5))//Creates the bottom axis using the x scale with 5 ticks
      .call((sel) => sel.selectAll("text").attr("fill", "rgba(230,237,243,.72)").attr("font-size", 10))//Styles the tick labels
      .call((sel) => sel.selectAll("path,line").attr("stroke", "rgba(255,255,255,.12)"));// Styles the axis lines

    // y axis
    g.append("g")//Appends an SVG group element for the y-axis
      .call(d3.axisLeft(y))//Creates the left axis using the y scale
      .call((sel) => sel.selectAll("text").attr("fill", "rgba(230,237,243,.72)").attr("font-size", 10))// Styles the tick labels
      .call((sel) => sel.selectAll("path,line").attr("stroke", "rgba(255,255,255,.12)"));// Styles the axis lines

    // bars
    g.selectAll("rect")//Draws the bars
      .data(sorted)//Binds sorted data to <rect> elements
      .enter()//<rect> elements are created for each data point
      .append("rect")//Appends a <rect> for each bar
      .attr("x", 0)//Positions bars at the left edge
      .attr("y", (d) => y(d.name) ?? 0)//Positions bars vertically based on y scale
      .attr("height", y.bandwidth())//Sets bar height based on y scale bandwidth
      .attr("width", (d) => x(d.value))//Sets bar width based on x scale
      .attr("rx", 5)//Rounds bar corners with radius 5
      .attr("fill", "#7aa2ff");//Fills bars with a blue color
      // bluish like screenshot 

    // value labels
    g.selectAll("text.value")//Draws value labels at the end of each bar
      .data(sorted)//Binds sorted data to text elements
      .enter()//<rect> elements are created for each data point
      .append("text")//Appends a <text> element for each label
      .attr("class", "value")//Sets class to "value"
      .attr("x", (d) => x(d.value) + 6)//Positions text slightly after the end of the bar
      .attr("y", (d) => (y(d.name) ?? 0) + y.bandwidth() / 2 + 4)//Centers text vertically on the bar
      .attr("fill", "rgba(230,237,243,.72)")//Sets text color
      .attr("font-weight", 500)//Sets medium font weight
      .attr("font-family", "Inter, sans-serif")//Sets font family
      .attr("font-size", 10)//Sets font size
      .text((d) => `${d.value.toLocaleString()} ${valueLabel}`);//Sets text to formatted value plus label
  }, [sorted, size.width, size.height, valueLabel]);//Dependencies for useEffect

  return (
    <div ref={setRef} className="chartWrap">
      <svg ref={svgRef} />
    </div>
  );
}