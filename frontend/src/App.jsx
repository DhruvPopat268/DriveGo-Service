import React, { useState } from 'react';
import { MapPin, Clock, Navigation, Calculator } from 'lucide-react';
import './App.css';

const TravelCostCalculator = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHours, setSelectedHours] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [adminCommissionPercent, setAdminCommissionPercent] = useState('');
  const [gstPercent, setGstPercent] = useState('18');
  const [costPerMinute, setCostPerMinute] = useState('2'); // New field

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata',
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
  ];

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time12 = new Date(2024, 0, 1, hour, minute).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push(time12);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const calculateCost = () => {
    if (!selectedHours) return { baseCost: 0, gst: 0, adminCommission: 0, total: 0 };

    const hours = parseInt(selectedHours);
    const minutes = hours * 60;
    const ratePerMinute = parseFloat(costPerMinute) || 0;
    const baseCost = minutes * ratePerMinute;

    const gstPercentValue = parseFloat(gstPercent) || 0;
    const gst = baseCost * (gstPercentValue / 100);

    const commissionPercentValue = parseFloat(adminCommissionPercent) || 0;
    const adminCommission = baseCost * (commissionPercentValue / 100);

    const total = baseCost + gst + adminCommission;

    return {
      baseCost,
      gst,
      adminCommission,
      total,
      gstPercent: gstPercentValue
    };
  };

  const cost = calculateCost();

  return (
    <div className="calculator-container">
      <div className="max-width-container">
        <div className="header">
          <h1>
            <Navigation className="header-icon" />
            driverGo
          </h1>
          <p>Calculate your travel expenses with GST included</p>
        </div>

        <div className="form-card">
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">
                <MapPin className="input-icon" style={{ color: '#3b82f6' }} />
                SELECT CITY
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="form-select city-input"
              >
                <option value="">Choose a city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">
                <Clock className="input-icon" style={{ color: '#10b981' }} />
                TRAVEL HOURS
              </label>
              <select
                value={selectedHours}
                onChange={(e) => setSelectedHours(e.target.value)}
                className="form-select hours-input"
              >
                <option value="">Select hours</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>{hour} hour{hour > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="input-label">
                <Clock className="input-icon" style={{ color: '#f59e0b' }} />
                DEPARTURE TIME
              </label>
              <select
                value={departTime}
                onChange={(e) => setDepartTime(e.target.value)}
                className="form-select time-input"
              >
                <option value="">Select time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="customization-section">
            <h3 className="section-title">
              <Calculator className="input-icon" style={{ color: '#667eea' }} />
              Customization
            </h3>
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Cost per Minute (₹)</label>
                <input
                  type="number"
                  value={costPerMinute}
                  onChange={(e) => setCostPerMinute(e.target.value)}
                  placeholder="2"
                  min="0"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">GST (%)</label>
                <input
                  type="number"
                  value={gstPercent}
                  onChange={(e) => setGstPercent(e.target.value)}
                  placeholder="18 for 18%"
                  min="0"
                  max="100"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Admin Commission (%)</label>
                <input
                  type="number"
                  value={adminCommissionPercent}
                  onChange={(e) => setAdminCommissionPercent(e.target.value)}
                  placeholder="10 for 10%"
                  min="0"
                  max="100"
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="cost-card">
          <div className="cost-header">
            <Calculator style={{ width: '32px', height: '32px' }} />
            <h2 className="cost-title">Cost Breakdown</h2>
          </div>

          {selectedHours ? (
            <div>
              <div className="trip-details">
                <h3>Trip Details</h3>
                <div className="trip-grid">
                  <div className="trip-item"><div className="trip-label">City:</div><div className="trip-value">{selectedCity || 'Not selected'}</div></div>
                  <div className="trip-item"><div className="trip-label">Duration:</div><div className="trip-value">{selectedHours} hour{selectedHours > 1 ? 's' : ''}</div></div>
                  <div className="trip-item"><div className="trip-label">Distance:</div><div className="trip-value">{kilometers || 'Not entered'} KM</div></div>
                  <div className="trip-item"><div className="trip-label">Departure:</div><div className="trip-value">{departTime || 'Not selected'}</div></div>
                </div>
              </div>

              <div className="cost-breakdown">
                <h3>Cost Calculation</h3>
                <div className="cost-item">
                  <span className="cost-label">Base Cost ({selectedHours * 60} minutes × ₹{costPerMinute}/min)</span>
                  <span className="cost-value">₹{cost.baseCost.toFixed(2)}</span>
                </div>

                <div className="cost-item">
                  <span className="cost-label">GST ({cost.gstPercent}%)</span>
                  <span className="cost-value">₹{cost.gst.toFixed(2)}</span>
                </div>

                {adminCommissionPercent && parseFloat(adminCommissionPercent) > 0 && (
                  <div className="cost-item">
                    <span className="cost-label">Admin Commission ({adminCommissionPercent}%)</span>
                    <span className="cost-value">₹{cost.adminCommission.toFixed(2)}</span>
                  </div>
                )}

                <div className="cost-item total-amount">
                  <span className="cost-label">Total Amount</span>
                  <span className="cost-value">₹{cost.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="rate-info">
                <div className="rate-info-text">
                  <strong>Rate Structure:</strong> ₹{costPerMinute} per minute + {gstPercent || 0}% GST
                  {adminCommissionPercent && parseFloat(adminCommissionPercent) > 0 && (
                    <span> + {adminCommissionPercent}% admin commission</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <Clock className="empty-icon" />
              <p className="empty-title">Select travel hours to calculate cost</p>
              <p className="empty-description">Fill in the form above to see your travel cost breakdown</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelCostCalculator;
