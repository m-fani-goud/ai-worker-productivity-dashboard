export default function FactorySummary({ data }) {
  if (!data) return <p>Loading factory data...</p>;

  return (
    <div style={styles.container}>
      <h2>Factory Summary</h2>

      <div style={styles.grid}>
        <Card title="Total Production" value={data.totalProduction} />
        <Card
          title="Total Active Time (sec)"
          value={Math.round(data.totalActiveTime)}
        />
        <Card
          title="Avg Utilization"
          value={(data.avgUtilization * 100).toFixed(1) + "%"}
        />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: 30,
  },
  grid: {
    display: "flex",
    gap: 20,
  },
  card: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 10,
    width: 200,
    background: "#f9f9f9",
  },
};