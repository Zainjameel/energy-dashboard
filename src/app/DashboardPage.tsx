// @ts-nocheck
import { useState } from "react";     //Pulls React’s useState hook   I use this to store UI state (which month is selected)
import Sidebar from "../components/Sidebar";
import TopKpis from "../components/TopKpis";
import Card from "../components/Card";
import StackedMonthlyBars from "../components/charts/StackedMonthlyBars";
import HorizontalBar from "../components/charts/HorizontalBar";
import EnergyByMonth from "../components/EnergyByMonth";
import { byAssignee, byCreator, monthly, topInsights, energyByTypeForMonth } from "../data/mock";



export default function DashboardPage() {

  const months = Object.keys(energyByTypeForMonth);    //Object.keys → returns all month names  This avoids hardcoding months 
  const [selectedMonth, setSelectedMonth] = useState(months[0])  //React state: selectedMonth → current month setSelectedMonth →
                                                                 //  function to change it Default value = first month in the ataset 
                                                                 //  This is what drives the dropdown + EnergyByMonth chart
  return (
    <div className="layout">
      <Sidebar />         

      <main className="main">
        <div className="headerRow">
          <div>
            <div className="hTitle">
              Financial and Energy Impacts Dashboard
            </div>
            <div className="hSub">{months[0] } → {months[months.length-1]} </div>
          </div>

          <span className="badge">
            <span className="badgeDot" />
            Willow Copilot
          </span>
        </div>

        <TopKpis />

        <div className="grid" style={{ marginTop: 14 }}>
          <Card
            title="Energy by Month"
            className="span-7"
            right={
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="monthSelect"
              >
                {months.map((m) => (
                  <option key={m} value={m} style={{ color: "#cc1212" }}>
                    {m}
                  </option>
                ))}
              </select>
            }
          >
            <EnergyByMonth
              month={selectedMonth}
              slices={energyByTypeForMonth[selectedMonth]}
            />
          </Card>

          <Card title="Insights Actioned" className="span-5">
            <StackedMonthlyBars data={monthly} />
          </Card>

          <Card title="Projected Energy Cost Savings by Ticket Creator (USD)" className="span-6">
            <HorizontalBar data={byCreator} valueLabel="USD" />
          </Card>

          <Card title="Projected Energy Cost Savings by Ticket Assignee (USD)" className="span-6">
            <HorizontalBar data={byAssignee} valueLabel="USD" />
          </Card>

          <Card title="Top Successfully Actioned Insights (USD)" className="span-12">
            <div style={{ overflow: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Insight Name</th>
                    <th>Twin</th>
                    <th>Projected Savings (USD)</th>
                    <th>Creator</th>
                    <th>Assignee</th>
                    <th>Date Ticket Closed/Completed</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {topInsights.map((r, idx) => (
                    <tr key={idx}>
                      <td>{r.insightName}</td>
                      <td className="muted">{r.twin}</td>
                      <td>{r.projectedSavingsUsd.toLocaleString()}</td>
                      <td className="muted">{r.creator}</td>
                      <td className="muted">{r.assignee || "-"}</td>
                      <td className="muted">{r.dateClosed}</td>
                      <td className="muted">{r.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}