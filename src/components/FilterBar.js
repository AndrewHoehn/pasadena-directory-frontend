import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  const stages = [
    "Starting Up",
    "Growing", 
    "Expanding",
    "Greening",
    "Relocating"
  ];

  const businessTypes = [
    "Retail",
    "Restaurant",
    "Tech",
    "Biotech", 
    "Services",
    "Manufacturing",
    "Healthcare"
  ];

  const helpsWithOptions = [
    "Hiring",
    "Permits",
    "Rebates & Incentives",
    "Marketing & Promotion",
    "Networking & Mentorship",
    "Real Estate & Construction",
    "Quality of Life"
  ];

  return (
    <div className="filter-bar">
      <div className="filter-intro">
        <h2>Find Resources for Your Business</h2>
        <p>I'm a <strong>business</strong> interested in help with <strong>programs and incentives</strong>.</p>
      </div>
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="stage-select">Business Stage:</label>
          <select 
            id="stage-select"
            value={filters.stage || ''} 
            onChange={(e) => onFilterChange('stage', e.target.value)}
          >
            <option value="">All Stages</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="type-select">Business Type:</label>
          <select 
            id="type-select"
            value={filters.business_type || ''} 
            onChange={(e) => onFilterChange('business_type', e.target.value)}
          >
            <option value="">All Types</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="helps-select">Helps With:</label>
          <select 
            id="helps-select"
            value={filters.helps_with || ''} 
            onChange={(e) => onFilterChange('helps_with', e.target.value)}
          >
            <option value="">All Categories</option>
            {helpsWithOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Clear filters button */}
        {(filters.stage || filters.business_type || filters.helps_with) && (
          <button 
            className="clear-filters"
            onClick={() => onFilterChange('clear', null)}
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;