// @ts-nocheck
import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "./useResizeObserver";

export type DonutSlice = { label: string; value: number };  //Defines one slice of the donut

export default function DonutChart({
  /*
data → array of donut slices
centerTop → bold text in the center
centerBottom → lighter text under it
colorMap → maps labels to colors
  */
  data,
  centerTop,
  centerBottom,
  colorMap,
}: {
  data: DonutSlice[];
  centerTop?: string;
  centerBottom?: string;
  colorMap: Record<string, string>;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);              //React ref pointing to <svg> . D3 uses this to draw  
  const { setRef, size } = useResizeObserver<HTMLDivElement>();   //setRef → attach to wrapping <div> . size.width / size.height → live container size  

  const total = useMemo(() => d3.sum(data, (d) => d.value), [data]);

  useEffect(() => {                                                 //Runs when:data changes size changes. labels/colors change. 
                                                                    //   This is where D3 mutates the SVG
    const svg = d3.select(svgRef.current);                          //Selects the <svg> element using D3
    svg.selectAll("*").remove();                                    //Clears previous drawing.  Prevents duplicate charts when re-rendering

    const width = size.width || 520;
    const height = size.height || 280;

    svg.attr("width", width).attr("height", height);                 //Sets SVG size to container size (or defaults)

    const radius = Math.min(width, height) / 2 - 18;                 //Calculate donut radius based on size

    const g = svg  
      .append("g")   //Appends a <g> element to the SVG
      .attr("transform", `translate(${width / 2},${height / 2})`);  //Creates a <g> element centered in the SVG.  All drawing happens inside this group.
                                                                    //transform is an SVG instruction that says:“Move this thing somewhere else.”

    const pie = d3
      .pie<DonutSlice>()
      .sort(null)
      .value((d) => d.value);                                   //Creates a pie layout generator.  This computes start/end angles for each slice.

    const arc = d3
      .arc<d3.PieArcDatum<DonutSlice>>()
      .innerRadius(radius * 0.62)
      .outerRadius(radius);                                    //Creates an arc generator for donut slices.  Inner radius > 0 makes it a donut.

    g.selectAll("path")//Draws the donut slices
      .data(pie(data))//Binds pie-processed data to <path> elements
      .enter()//<path> elements are created for each data point
      .append("path")//Appends a <path> for each slice
      .attr("d", arc as any)//Uses arc generator to define the "d" attribute (the shape)
      .attr("fill", (d) => colorMap[d.data.label] ?? "#2f81f7")//Fills each slice with color from colorMap, defaults to blue
      .attr("stroke", "rgba(255,255,255,.10)")//Adds a light stroke around each slice
      .attr("stroke-width", 1);  //Stroke width of 1 pixel
       //Draws one <path> per slice.  Uses arc generator to create the "d" attribute.  Fills with color from colorMap.

     
    g.append("text")//Adds centerTop text
      .attr("text-anchor", "middle")//Centers text horizontally
      .attr("y", -2)//Positions text slightly above center
      .attr("fill", "rgba(230,237,243,.92)")//Sets text color
      .attr("font-size", 16)//Sets font size
      .attr("font-weight", 700)//Sets bold font
      .text(centerTop ?? "");//Adds centerTop text if provided

    g.append("text")//Adds centerBottom text
      .attr("text-anchor", "middle")//Centers text horizontally
      .attr("y", 18)//Positions text slightly below center
      .attr("fill", "rgba(230,237,243,.65)")//Lighter color for less emphasis
      .attr("font-size", 12)//Smaller font size
      .text(centerBottom ?? `Total ${Math.round(total).toLocaleString()}`);//Adds centerBottom text if provided, else shows total value
  }, [data, size.width, size.height, centerTop, centerBottom, colorMap, total]);        //Dependencies for useEffect

  return (
    <div ref={setRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} />
    </div>
  );
}
