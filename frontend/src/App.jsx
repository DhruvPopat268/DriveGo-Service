import React, { useState } from 'react';
import { MapPin, Clock, Navigation, Calculator } from 'lucide-react';
import './App.css'

const TravelCostCalculator = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHours, setSelectedHours] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [extraChargePercent, setExtraChargePercent] = useState('');
  const [gstPercent, setGstPercent] = useState('18');

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
    if (!selectedHours) return { baseCost: 0, gst: 0, extraCharge: 0, total: 0 };
    
    const hours = parseInt(selectedHours);
    const minutes = hours * 60;
    const baseCost = minutes * 2; // ₹2 per minute
    const gstPercentValue = parseFloat(gstPercent) || 0;
    const gst = baseCost * (gstPercentValue / 100); // Customizable GST
    
    // Calculate extra charge based on base cost
    const extraChargePercentValue = parseFloat(extraChargePercent) || 0;
    const extraCharge = baseCost * (extraChargePercentValue / 100);
    
    // Total = Base Cost + GST + Extra Charges
    const total = baseCost + gst + extraCharge;
    
    return {
      baseCost,
      gst,
      extraCharge,
      total,
      gstPercent: gstPercentValue
    };
  };

  const cost = calculateCost();

  return (
    <div className="calculator-container">
      <div className="max-width-container">
        {/* Header */}
        <div className="header">
          <h1>
            <Navigation className="header-icon" />
            driverGo 
          </h1>
          <p>Calculate your travel expenses with GST included</p>
        </div>

        {/* Input Form */}
        <div className="form-card">
          <div className="form-row">
            {/* City Selection */}
            <div className="input-group">
              <label className="input-label">
                <MapPin className="input-icon" style={{color: '#3b82f6'}} />
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

            {/* Hours Selection */}
            <div className="input-group">
              <label className="input-label">
                <Clock className="input-icon" style={{color: '#10b981'}} />
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
            {/* Kilometers Input */}
            <div className="input-group">
              <label className="input-label">
                <Navigation className="input-icon" style={{color: '#8b5cf6'}} />
                DISTANCE (KM)
              </label>
              <input
                type="number"
                value={kilometers}
                onChange={(e) => setKilometers(e.target.value)}
                placeholder="Enter distance"
                className="form-input km-input"
              />
            </div>

            {/* Departure Time */}
            <div className="input-group">
              <label className="input-label">
                <Clock className="input-icon" style={{color: '#f59e0b'}} />
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

          {/* Customization Section */}
          <div className="customization-section">
            <h3 className="section-title">
              <Calculator className="input-icon" style={{color: '#667eea'}} />
              Customization
            </h3>
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">
                  GST (%)
                </label>
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
                <label className="input-label">
                  EXTRA CHARGE (%)
                </label>
                <input
                  type="number"
                  value={extraChargePercent}
                  onChange={(e) => setExtraChargePercent(e.target.value)}
                  placeholder="10 for 10%"
                  min="0"
                  max="100"
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cost Calculation Card */}
        <div className="cost-card">
          <div className="cost-header">
            <Calculator style={{width: '32px', height: '32px'}} />
            <h2 className="cost-title">Cost Breakdown</h2>
          </div>

          {selectedHours ? (
            <div>
              {/* Trip Details */}
              <div className="trip-details">
                <h3>Trip Details</h3>
                <div className="trip-grid">
                  <div className="trip-item">
                    <div className="trip-label">City:</div>
                    <div className="trip-value">{selectedCity || 'Not selected'}</div>
                  </div>
                  <div className="trip-item">
                    <div className="trip-label">Duration:</div>
                    <div className="trip-value">{selectedHours} hour{selectedHours > 1 ? 's' : ''}</div>
                  </div>
                  <div className="trip-item">
                    <div className="trip-label">Distance:</div>
                    <div className="trip-value">{kilometers || 'Not entered'} KM</div>
                  </div>
                  <div className="trip-item">
                    <div className="trip-label">Departure:</div>
                    <div className="trip-value">{departTime || 'Not selected'}</div>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="cost-breakdown">
                <h3>Cost Calculation</h3>
                
                <div>
                  <div className="cost-item">
                    <span className="cost-label">Base Cost ({selectedHours * 60} minutes × ₹2/min)</span>
                    <span className="cost-value">₹{cost.baseCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="cost-item">
                    <span className="cost-label">GST ({cost.gstPercent}%)</span>
                    <span className="cost-value">₹{cost.gst.toFixed(2)}</span>
                  </div>
                  
                  {extraChargePercent && parseFloat(extraChargePercent) > 0 && (
                    <div className="cost-item">
                      <span className="cost-label">Extra Charge ({extraChargePercent}%)</span>
                      <span className="cost-value">₹{cost.extraCharge.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="cost-item total-amount">
                    <span className="cost-label">Total Amount</span>
                    <span className="cost-value">₹{cost.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Rate Information */}
              <div className="rate-info">
                <div className="rate-info-text">
                  <strong>Rate Structure:</strong> ₹2 per minute + {gstPercent || 0}% GST
                  {extraChargePercent && parseFloat(extraChargePercent) > 0 && (
                    <span> + {extraChargePercent}% extra charge</span>
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