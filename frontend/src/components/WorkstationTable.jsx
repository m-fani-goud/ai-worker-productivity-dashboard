export default function WorkstationTable({ stations }) {

  if (!stations) return <p>Loading workstations...</p>;

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Workstation Metrics</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Occupancy Time</th>
            <th>Utilization</th>
            <th>Units</th>
            <th>Throughput</th>
          </tr>
        </thead>

        <tbody>
          {stations.map(s => (
            <tr key={s.stationId}>
              <td>{s.name}</td>
              <td>{Math.round(s.occupancyTime)}</td>
              <td>{(s.utilization * 100).toFixed(1)}%</td>
              <td>{s.unitsProduced}</td>
              <td>{s.throughputRate.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse"
  }
};