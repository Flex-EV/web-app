export const VehicleStatus = () => {
  const statuses = [
    { label: "Active Vehicles", count: 12, color: "bg-green-500" },
    { label: "Idle Vehicles", count: 5, color: "bg-blue-500" },
    { label: "In Service Vehicles", count: 3, color: "bg-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {statuses.map((status, index) => (
        <div
          key={index}
          className={`${status.color} p-6 rounded-lg text-white shadow-lg`}
        >
          <h3 className="text-lg font-semibold mb-2">{status.label}</h3>
          <p className="text-4xl font-bold">{status.count}</p>
        </div>
      ))}
    </div>
  );
};
