import  DonutChart, { type DonutSlice } from "./charts/DonutChart";

function toPercent(value: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

export default function EnergyByMonth({
  month,
  slices,
}: {
  month: string;
  slices: DonutSlice[];
}) {
  const total = slices.reduce((a, b) => a + b.value, 0);

  // Match the “picture” colors
  const colorMap: Record<string, string> = {
    Electricity: "#2f81f7",   // blue
    "Chilled Water": "#12b886", // green
    "Natural Gas": "#f59f00", // orange
    Steam: "#ff6b6b",         // red
  };

  return (
    <div className="energyMonthRow">
      <div className="donutBox">
        <DonutChart
          data={slices}
          centerTop={month}
          centerBottom="Energy Mix"
          colorMap={colorMap}
        />
      </div>

      <div className="legendBox">
        <div className="legendList">
          {slices.map((s) => (
            <div className="legendItem" key={s.label}>
              <span
                className="legendSwatch"
                style={{ background: colorMap[s.label] ?? "#2f81f7" }}
              />
              <span className="legendLabel">{s.label}</span>
              <span className="legendValue">{toPercent(s.value, total)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
