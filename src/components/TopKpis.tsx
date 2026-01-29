import  Card from "./Card";
import { kpis } from "../data/mock";

function formatUsd(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) + " USD";
}
function formatKwh(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) + " kWh";
}

export default function TopKpis() {
  return (
    <div className="kpis">
      <Card title="Projected Energy Cost Savings" className="kpiCard" right="">
        <div className="kpiValue">{formatUsd(kpis.projectedSavingsUsd)}</div>
        <div className="kpiMeta">Resource Type: All</div>
      </Card>

      <Card title="Energy Cost to Date" className="kpiCard" right="">
        <div className="kpiValue">{formatKwh(kpis.energyCostToDateKwh)}</div>
        <div className="kpiMeta">Central Utility Plant</div>
      </Card>

      <Card title="Successfully Actioned Insights" className="kpiCard" right="">
        <div className="kpiValue">{kpis.successfullyActioned}</div>
        <div className="kpiMeta">Completed</div>
      </Card>

      <Card title="Unsuccessfully Actioned Insights" className="kpiCard" right="">
        <div className="kpiValue">{kpis.unsuccessfullyActioned}</div>
        <div className="kpiMeta">Attempted</div>
      </Card>
    </div>
  );
}
