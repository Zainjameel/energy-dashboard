// @ts-nocheck
import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import type { MonthlyInsight } from "../../data/mock";
import { useResizeObserver } from "./useResizeObserver";

export default function StackedMonthlyBars({
  data,
}: {
  data: MonthlyInsight[];
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { setRef, size } = useResizeObserver<HTMLDivElement>();

  const stacked = useMemo(() => {
    // d3.stack wants numeric keys
    const keys = ["success", "unsuccess"] as const;
    const series = d3
      .stack<MonthlyInsight>()
      .keys(keys as unknown as string[])(data as any);
    return { series, keys };
  }, [data]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = size.width || 800;
    const height = size.height || 280;

    const margin = { top: 18, right: 16, bottom: 40, left: 44 };
    svg.attr("width", width).attr("height", height);

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand<string>()
      .domain(data.map((d) => d.month))
      .range([0, innerW])
      .padding(0.25);

    const yMax = d3.max(data, (d) => d.success + d.unsuccess) ?? 0;

    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([innerH, 0]);

    // axes
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).tickValues(x.domain().filter((_, i) => i % 2 === 0)))
      .call((sel) => sel.selectAll("text").attr("fill", "rgba(230,237,243,.72)").attr("font-size", 10))
      .call((sel) => sel.selectAll("path,line").attr("stroke", "rgba(255,255,255,.12)"));

    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .call((sel) => sel.selectAll("text").attr("fill", "rgba(230,237,243,.72)").attr("font-size", 10))
      .call((sel) => sel.selectAll("path,line").attr("stroke", "rgba(255,255,255,.12)"));

    // grid
    g.append("g")
      .attr("opacity", 0.25)
      .call(
        d3
          .axisLeft(y)
          .tickSize(-innerW)
          .tickFormat(() => "")
          .ticks(5)
      )
      .call((sel) => sel.selectAll("line").attr("stroke", "rgba(255,255,255,.12)"))
      .call((sel) => sel.selectAll("path").remove());

    const color = d3
      .scaleOrdinal<string>()
      .domain(["success", "unsuccess"])
      .range(["#12b886", "#f59f00"]); // green + orange like screenshot

    const groups = g
      .selectAll("g.layer")
      .data(stacked.series)
      .enter()
      .append("g")
      .attr("class", "layer")
      .attr("fill", (d: any) => color(d.key));

    groups
      .selectAll("rect")
      .data((d: any) => d.map((v: any) => ({ key: d.key, v })))
      .enter()
      .append("rect")
      .attr("x", (_d: any, i: number) => x(data[i].month) ?? 0)
      .attr("width", x.bandwidth())
      .attr("y", (d: any) => y(d.v[1]))
      .attr("height", (d: any) => Math.max(0, y(d.v[0]) - y(d.v[1])))
      .attr("rx", 4);

    // legend
    const legend = g.append("g").attr("transform", `translate(0, ${-6})`);
    const items = [
      { label: "Successfully Actioned", key: "success" },
      { label: "Unsuccessfully Actioned", key: "unsuccess" },
    ];
    const li = legend.selectAll("g").data(items).enter().append("g").attr("transform", (_d, i) => `translate(${i * 180},0)`);

    li.append("rect").attr("width", 10).attr("height", 10).attr("rx", 2).attr("fill", (d) => color(d.key));
    li.append("text")
      .attr("x", 14)
      .attr("y", 9)
      .attr("fill", "rgba(230,237,243,.72)")
      .attr("font-size", 11)
      .text((d) => d.label);
  }, [data, size.height, size.width, stacked.series]);

  return (
    <div ref={setRef} className="chartWrap">
      <svg ref={svgRef} />
    </div>
  );
}