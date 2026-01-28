export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">Dashboards</div>

      <div className="navGroupTitle">Operational</div>
      <div className="navItem">
        <span>📌</span> <span className="navText">KPI</span>
      </div>

      <div className="navItem active">
        <span>📊</span> <span className="navText">Financial and Energy Impacts</span>
      </div>

      <div className="navItem">
        <span>🧊</span> <span className="navText">Comfort</span>
      </div>

      <div className="navItem">
        <span>🌿</span> <span className="navText">Sustainability</span>
      </div>

      <div className="navItem">
        <span>🔥</span> <span className="navText">Thermal Energy Consumption</span>
      </div>
    </aside>
  );
}