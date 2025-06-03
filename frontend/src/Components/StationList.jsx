import { useEffect, useState } from 'react';
import { fetchStations } from '../services/stationService';

const StationList = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchStations()
      .then(setStations)
      .catch((err) => {
        console.error('Error fetching stations:', err);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Charging Stations</h2>
      <ul className="space-y-4">
        {stations.map(station => (
          <li key={station.id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{station.name}</h3>
            <p>Status: {station.status}</p>
            <p>Power Output: {station.powerOutput} kW</p>
            <p>Location: ({station.latitude}, {station.longitude})</p>
            <p>Connector Type: {station.connectorType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StationList;
