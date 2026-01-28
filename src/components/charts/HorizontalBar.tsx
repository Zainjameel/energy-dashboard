import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import type { BarRow } from "../../data/mock";
import { useResizeObserver } from "./useResizeObserver";

export default function HorizontalBar({
  data,
  valueLabel = "USD",
}: {
  data: BarRow[];
  valueLabel?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { setRef, size } = useResizeObserver<HTMLDivElement>();

  const sorted = useMemo(() => [...data].sort((a, b) => b.value - a.value), [data]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = size.width || 600;
    const height = size.height || 280;
    const margin = { top: 10, right: 16, bottom: 32, left: 160 };

    svg.attr("width", width).attr("height", height);

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3
      .scaleBand<string>()
      .domain(sorted.map((d) => d.name))
      .range([0, innerH])
      .padding(0.3);

    const xMax = d3.max(sorted, (d) => d.value) ?? 0;

    const x = d3
      .scaleLinear()
      .domain([0, xMax])
      .nice()
      .range([0, innerW]);

    // x axis
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(5))
      .call((sel) => sel.selectAll("text").attr("fill", "rgba(230,237,243,.72)").attr("font-size", 10))
      .call((sel) => sel.selectAll("path,line").attr("stroke", "rgba(255,255,255,.12)"));

    // y axis
    g.append("g")
      .call(d3.axisLeft(y))
      .call((sel) => sel.selectAll("text").attr("fill", "rgba(230,237,243,.72)").attr("font-size", 10))
      .call((sel) => sel.selectAll("path,line").attr("stroke", "rgba(255,255,255,.12)"));

    // bars
    g.selectAll("rect")
      .data(sorted)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d) => y(d.name) ?? 0)
      .attr("height", y.bandwidth())
      .attr("width", (d) => x(d.value))
      .attr("rx", 5)
      .attr("fill", "#7aa2ff"); // bluish like screenshot

    // value labels
    g.selectAll("text.value")
      .data(sorted)
      .enter()
      .append("text")
      .attr("class", "value")
      .attr("x", (d) => x(d.value) + 6)
      .attr("y", (d) => (y(d.name) ?? 0) + y.bandwidth() / 2 + 4)
      .attr("fill", "rgba(230,237,243,.72)")
      .attr("font-size", 10)
      .text((d) => `${d.value.toLocaleString()} ${valueLabel}`);
  }, [sorted, size.width, size.height, valueLabel]);

  return (
    <div ref={setRef} className="chartWrap">
      <svg ref={svgRef} />
    </div>
  );
}