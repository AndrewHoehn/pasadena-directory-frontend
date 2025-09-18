import React from 'react';

const ResourceCard = ({ resource }) => {
  return (
    <div className="resource-card">
      <div className="card-header">
        <h3 className="card-title">{resource.title}</h3>
        <div className="administered-by">
          <small>{resource.administered_by}</small>
        </div>
      </div>
      
      {resource.image && (
        <div className="card-image">
          <img 
            src={resource.image.url} 
            alt={resource.image.alt}
            loading="lazy"
          />
        </div>
      )}
      
      <div className="card-body">
        <p className="card-description">{resource.description}</p>
        
        {resource.eligibility && (
          <div className="eligibility">
            <strong>Eligibility:</strong> {resource.eligibility}
          </div>
        )}
      </div>

      <div className="card-tags">
        <div className="tag-group">
          <span className="tag-label">Stages:</span>
          {resource.stages.map(stage => (
            <span key={stage} className="tag stage-tag">{stage}</span>
          ))}
        </div>
        
        <div className="tag-group">
          <span className="tag-label">Types:</span>
          {resource.business_types.map(type => (
            <span key={type} className="tag type-tag">{type}</span>
          ))}
        </div>
        
        <div className="tag-group">
          <span className="tag-label">Helps With:</span>
          {resource.helps_with.map(help => (
            <span key={help} className="tag help-tag">{help}</span>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <div className="next-steps">
          <strong>Next Steps:</strong> {resource.next_steps}
          {resource.next_steps_links.length > 0 && (
            <div className="action-links">
              {resource.next_steps_links.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="action-link"
                >
                  {link.text} →
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;