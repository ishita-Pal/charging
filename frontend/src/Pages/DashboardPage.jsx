import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  fetchStations,
  updateStation,
  deleteStation,
  createStation
} from '../services/stationService';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader
} from '@react-google-maps/api';
import './../Components/StationList.css';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const mapCenter = {
  lat: 28.6139,
  lng: 77.2090
};

const connectorTabs = ['All', 'Type1', 'Type2', 'CCS', 'CHAdeMO'];

const DashboardPage = () => {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [minPower, setMinPower] = useState('');
  const [maxPower, setMaxPower] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingStation, setEditingStation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:"AIzaSyBqCTi_KLU3nBWKZN5drAMw2b59onByNFk", // Replace with your key
  });

  const loadStations = async () => {
    try {
      const data = await fetchStations();
      setStations(data);
      setFilteredStations(data);
    } catch (err) {
      console.error('Failed to fetch stations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStations();
  }, []);

  useEffect(() => {
    let filtered = [...stations];

    if (activeTab !== 'All') {
      filtered = filtered.filter((s) => s.connectorType === activeTab);
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }

    if (minPower !== '') {
      filtered = filtered.filter((s) => parseFloat(s.powerOutput) >= parseFloat(minPower));
    }

    if (maxPower !== '') {
      filtered = filtered.filter((s) => parseFloat(s.powerOutput) <= parseFloat(maxPower));
    }

    setFilteredStations(filtered);
  }, [activeTab, statusFilter, minPower, maxPower, stations]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteStation(id);
          setStations((prev) => prev.filter((s) => s.id !== id));
          Swal.fire("Deleted!", "Station has been deleted.", "success");
        } catch (err) {
          console.error("Delete failed:", err);
          Swal.fire("Error", "Failed to delete the station.", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The station was not deleted.", "info");
      }
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const lat = parseFloat(editingStation.latitude);
  const lng = parseFloat(editingStation.longitude);
  const power = parseFloat(editingStation.powerOutput);

  // Coordinate validation
  if (isNaN(lat) || isNaN(lng)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Coordinates',
      text: 'Latitude and Longitude must be numbers.',
    });
    return;
  }

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Coordinates',
      text: 'Latitude must be between -90 and 90. Longitude must be between -180 and 180.',
    });
    return;
  }

  // Power output validation
  if (isNaN(power) || power <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Power Output',
      text: 'Power output must be a positive number.',
    });
    return;
  }

  try {
    const newStation = {
      name: editingStation.name,
      latitude: lat,
      longitude: lng,
      status: editingStation.status,
      powerOutput: power,
      connectorType: editingStation.connectorType
    };

    if (editingStation.id) {
      await updateStation(editingStation.id, newStation);
    } else {
      await createStation(newStation);
    }

    setShowModal(false);
    setEditingStation(null);
    await loadStations();

    Swal.fire({
      title: 'Saved!',
      text: 'Station information has been successfully saved.',
      icon: 'success',
      confirmButtonText: 'OK'
    });

  } catch (error) {
    console.error('Submit failed:', error.response?.data || error.message);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Failed to save the station.',
    });
  }
};


  if (loading || !isLoaded) {
    return <div className="loading">Loading stations and map...</div>;
  }

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Charging Stations</h1>
        <button
          className="add-button"
          onClick={() => {
            setEditingStation({
              name: '',
              latitude: '',
              longitude: '',
              powerOutput: '',
              connectorType: '',
              status: 'Active'
            });
            setShowModal(true);
          }}
        >
          Add Station
        </button>
      </header>

      <div className="tabs">
        {connectorTabs.map((type) => (
          <button
            key={type}
            className={`tab ${activeTab === type ? 'active' : ''}`}
            onClick={() => setActiveTab(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <input
          type="number"
          placeholder="Min Power (kW)"
          value={minPower}
          onChange={(e) => setMinPower(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Power (kW)"
          value={maxPower}
          onChange={(e) => setMaxPower(e.target.value)}
        />
      </div>

      <main className="main">
        <div className="station-grid">
          {filteredStations.map((station) => (
            <div key={station.id} className="station-card">
              <h2>{station.name}</h2>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={
                    station.status === 'Active'
                      ? 'status active'
                      : 'status inactive'
                  }
                >
                  {station.status}
                </span>
              </p>
              <p><strong>Power Output:</strong> {station.powerOutput} kW</p>
              <p><strong>Connector:</strong> {station.connectorType}</p>
              <p><strong>Latitude:</strong> {station.latitude}</p>
              <p><strong>Longitude:</strong> {station.longitude}</p>
              <div className="card-actions">
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditingStation({ ...station });
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(station.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="map-title">Map View</h2>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={5}
        >
          {filteredStations.map((station) => (
            <Marker
              key={station.id}
              position={{
                lat: parseFloat(station.latitude),
                lng: parseFloat(station.longitude)
              }}
              onClick={() => setSelectedStation(station)}
            />
          ))}
          {selectedStation && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedStation.latitude),
                lng: parseFloat(selectedStation.longitude)
              }}
              onCloseClick={() => setSelectedStation(null)}
            >
              <div>
                <h3>{selectedStation.name}</h3>
                <p>Status: {selectedStation.status}</p>
                <p>Power: {selectedStation.powerOutput} kW</p>
                <p>Connector: {selectedStation.connectorType}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </main>

      {showModal && editingStation && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{editingStation.id ? 'Edit Station' : 'Add Station'}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="text"
                value={editingStation.name}
                onChange={(e) =>
                  setEditingStation({ ...editingStation, name: e.target.value })
                }
                placeholder="Name"
                required
              />
              <input
                type="number"
                value={editingStation.latitude}
                onChange={(e) =>
                  setEditingStation({
                    ...editingStation,
                    latitude: e.target.value
                  })
                }
                placeholder="Latitude"
                required
              />
              <input
                type="number"
                value={editingStation.longitude}
                onChange={(e) =>
                  setEditingStation({
                    ...editingStation,
                    longitude: e.target.value
                  })
                }
                placeholder="Longitude"
                required
              />
              <input
                type="number"
                value={editingStation.powerOutput}
                onChange={(e) =>
                  setEditingStation({
                    ...editingStation,
                    powerOutput: e.target.value
                  })
                }
                placeholder="Power Output (kW)"
                required
              />
              <select
                value={editingStation.connectorType}
                onChange={(e) =>
                  setEditingStation({
                    ...editingStation,
                    connectorType: e.target.value
                  })
                }
                required
              >
                <option value="">Select Connector</option>
                <option value="Type1">Type 1</option>
                <option value="Type2">Type 2</option>
                <option value="CCS">CCS</option>
                <option value="CHAdeMO">CHAdeMO</option>
              </select>
              <select
                value={editingStation.status}
                onChange={(e) =>
                  setEditingStation({
                    ...editingStation,
                    status: e.target.value
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
