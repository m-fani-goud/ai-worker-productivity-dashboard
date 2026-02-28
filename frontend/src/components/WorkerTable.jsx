export default function WorkerTable({ workers }) {
  if (!workers) return <p>Loading workers...</p>;

  return (
    <div>
      <h2>Worker Metrics</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Active Time</th>
            <th>Idle Time</th>
            <th>Utilization</th>
            <th>Units</th>
            <th>Units/Hour</th>
          </tr>
        </thead>

        <tbody>
          {workers.map((w) => (
            <tr key={w.workerId}>
              <td>{w.name}</td>
              <td>{Math.round(w.activeTime)}</td>
              <td>{Math.round(w.idleTime)}</td>
              <td>{(w.utilization * 100).toFixed(1)}%</td>
              <td>{w.unitsProduced}</td>
              <td>{w.unitsPerHour.toFixed(2)}</td>
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
    borderCollapse: "collapse",
  },
};