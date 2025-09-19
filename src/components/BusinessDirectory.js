import React, { useState, useEffect } from 'react';
import { getBusinessResources } from '../services/api';
import FilterBar from './FilterBar';
import ResourceCard from './ResourceCard';

const BusinessDirectory = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [filters, setFilters] = useState({
    stage: '',
    business_type: '',
    helps_with: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all resources on component mount
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBusinessResources();
        setResources(data);
        setFilteredResources(data); // Initially show all resources
      } catch (error) {
        console.error('Failed to fetch resources:', error);
        setError('Failed to load business resources. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    let filtered = [...resources];

    if (filters.stage) {
      filtered = filtered.filter(resource => 
        resource.stages.includes(filters.stage)
      );
    }

    if (filters.business_type) {
      filtered = filtered.filter(resource => 
        resource.business_types.includes(filters.business_type)
      );
    }

    if (filters.helps_with) {
      filtered = filtered.filter(resource => 
        resource.helps_with.includes(filters.helps_with)
      );
    }

    setFilteredResources(filtered);
  }, [filters, resources]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      // Clear all filters
      setFilters({
        stage: '',
        business_type: '',
        helps_with: ''
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  if (loading) {
    return (
      <div className="business-directory">
        <div className="loading">
          <p>Loading business resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="business-directory">
        <div className="error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="business-directory">
      <header className="directory-header">
        <h1>Build It in <span class="highlight">Pasadena</span></h1>
        <p className="directory-subtitle">
          Discover incentives, programs, and resources to help your business thrive in Pasadena.
        </p>
      </header>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <section className="results-section">
        <div className="results-header">
          <h2>
            {filteredResources.length} Resource{filteredResources.length !== 1 ? 's' : ''} Found
          </h2>
          {filteredResources.length !== resources.length && (
            <p className="filter-note">
              Showing filtered results. <button 
                onClick={() => handleFilterChange('clear', null)}
                className="clear-link"
              >
                Show all {resources.length} resources
              </button>
            </p>
          )}
        </div>

        <div className="resources-grid">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
              />
            ))
          ) : (
            <div className="no-results">
              <h3>No resources found</h3>
              <p>Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => handleFilterChange('clear', null)}
                className="clear-filters-btn"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BusinessDirectory;