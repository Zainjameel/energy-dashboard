import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "./useResizeObserver";

export type DonutSlice = { label: string; value: number };

export default function DonutChart({
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
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { setRef, size } = useResizeObserver<HTMLDivElement>();

  const total = useMemo(() => d3.sum(data, (d) => d.value), [data]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = size.width || 520;
    const height = size.height || 280;

    svg.attr("width", width).attr("height", height);

    const radius = Math.min(width, height) / 2 - 18;

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3
      .pie<DonutSlice>()
      .sort(null)
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<DonutSlice>>()
      .innerRadius(radius * 0.62)
      .outerRadius(radius);

    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (d) => colorMap[d.data.label] ?? "#2f81f7")
      .attr("stroke", "rgba(255,255,255,.10)")
      .attr("stroke-width", 1);

    // Center text (like the picture)
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("y", -2)
      .attr("fill", "rgba(230,237,243,.92)")
      .attr("font-size", 16)
      .attr("font-weight", 700)
      .text(centerTop ?? "");

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("y", 18)
      .attr("fill", "rgba(230,237,243,.65)")
      .attr("font-size", 12)
      .text(centerBottom ?? `Total ${Math.round(total).toLocaleString()}`);
  }, [data, size.width, size.height, centerTop, centerBottom, colorMap, total]);

  return (
    <div ref={setRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} />
    </div>
  );
}
