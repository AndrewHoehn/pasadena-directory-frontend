import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Helper function to extract text from rich text description
const extractTextFromRichText = (richTextArray) => {
  if (!richTextArray || !Array.isArray(richTextArray)) return '';
  
  return richTextArray
    .map(block => {
      if (block.type === 'paragraph' && block.children) {
        return block.children
          .map(child => child.text || '')
          .join('');
      }
      return '';
    })
    .join(' ')
    .trim();
};

// Helper function to extract links from rich text
const extractLinksFromRichText = (richTextArray) => {
  if (!richTextArray || !Array.isArray(richTextArray)) return [];
  
  const links = [];
  richTextArray.forEach(block => {
    if (block.type === 'paragraph' && block.children) {
      block.children.forEach(child => {
        if (child.type === 'link' && child.url) {
          links.push({
            text: child.children?.[0]?.text || 'Learn More',
            url: child.url
          });
        }
      });
    }
  });
  return links;
};

// Get all business resources with optional filtering
export const getBusinessResources = async (filters = {}) => {
  try {
    const response = await api.get('/business-resources?populate=image');
    
    let resources = response.data.data.map(resource => ({
      id: resource.id,
      title: resource.title,
      description: extractTextFromRichText(resource.description),
      stages: resource.stages || [],
      business_types: resource.business_types || [],
      helps_with: resource.helps_with || [],
      administered_by: resource.administered_by,
      eligibility: resource.eligibility,
      next_steps: extractTextFromRichText(resource.next_steps),
      next_steps_links: extractLinksFromRichText(resource.next_steps),
        image: resource.image ? {
        url: `${API_BASE_URL.replace('/api', '')}${resource.image.url}`,
        alt: resource.image.alternativeText || resource.title,
        caption: resource.image.caption
    } : null,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt
    }));

    // Apply client-side filtering since Strapi filtering with arrays is complex
    if (filters.stage) {
      resources = resources.filter(resource => 
        resource.stages.includes(filters.stage)
      );
    }
    
    if (filters.business_type) {
      resources = resources.filter(resource => 
        resource.business_types.includes(filters.business_type)
      );
    }
    
    if (filters.helps_with) {
      resources = resources.filter(resource => 
        resource.helps_with.includes(filters.helps_with)
      );
    }

    return resources;
  } catch (error) {
    console.error('Error fetching business resources:', error);
    throw error;
  }
};

export default api;