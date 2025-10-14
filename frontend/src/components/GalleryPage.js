import React, { useState, useEffect } from 'react';
import { Images, Calendar, Users, Award, Eye, X } from 'lucide-react';

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Sample gallery data (can be replaced with API data later)
  const sampleGallery = [
    {
      id: 1,
      title: "Upcoming Events & Announcements",
      description: "Information about upcoming academic events, seminars, and important announcements for the WHIBC community.",
      image: "/images/gallery/gallery-featured.jpeg",
      category: "events",
      date: "2025-09-13"
    },
    {
      id: 2,
      title: "Academic Excellence",
      description: "Students engaged in theological studies and academic research",
      image: "https://images.unsplash.com/photo-1576506542790-51244b486a6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85",
      category: "academics",
      date: "2025-09-10"
    },
    {
      id: 3,
      title: "Graduation Ceremony",
      description: "Celebrating our graduates as they complete their theological education journey",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzU3NzQ1NDY0fDA&ixlib=rb-4.1.0&q=85",
      category: "graduation",
      date: "2025-08-15"
    },
    {
      id: 4,
      title: "Campus Life",
      description: "Students engaging in campus activities and fellowship",
      image: "https://images.unsplash.com/photo-1533854775446-95c4609da544?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzU3NzQ1NDY0fDA&ixlib=rb-4.1.0&q=85",
      category: "campus",
      date: "2025-07-20"
    },
    {
      id: 5,
      title: "Biblical Studies",
      description: "In-depth study sessions focusing on biblical interpretation and theology",
      image: "https://images.unsplash.com/photo-1610050731641-f855ccdaf3f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85",
      category: "academics",
      date: "2025-06-18"
    },
    {
      id: 6,
      title: "Leadership Training",
      description: "Developing future Christian leaders through practical training programs",
      image: "https://images.unsplash.com/photo-1626815097810-7e54a9ecad96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDB8fHx8MTc1Nzc2MTEzMXww&ixlib=rb-4.1.0&q=85",
      category: "training",
      date: "2025-05-12"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', icon: <Images size={20} /> },
    { id: 'events', name: 'Events', icon: <Calendar size={20} /> },
    { id: 'academics', name: 'Academics', icon: <Award size={20} /> },
    { id: 'graduation', name: 'Graduation', icon: <Users size={20} /> },
    { id: 'campus', name: 'Campus Life', icon: <Users size={20} /> },
    { id: 'training', name: 'Training', icon: <Award size={20} /> }
  ];

  useEffect(() => {
    // For now, use sample data. Later can be replaced with API call
    setGalleryImages(sampleGallery);
    setLoading(false);

    // fetchGallery(); // Uncomment when API is ready
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/gallery`);
      if (response.ok) {
        const data = await response.json();
        setGalleryImages(data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      // Fallback to sample data
      setGalleryImages(sampleGallery);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="gallery-page">
        <div className="gallery-loading">
          <div className="loading-spinner"></div>
          <p>Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="container">
          <div className="gallery-hero-content">
            <h1 className="page-title">Photo Gallery</h1>
            <p className="hero-description">
              Explore moments from our vibrant academic community - from classroom excellence 
              to graduation celebrations, campus life, and special events at WHIBC.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-container">
            <h3>Browse by Category</h3>
            <div className="category-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section section">
        <div className="container">
          {filteredImages.length === 0 ? (
            <div className="no-images">
              <Images className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3>No images found</h3>
              <p>No images available for the selected category.</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="image-container">
                    <img 
                      src={image.image} 
                      alt={image.title}
                      className="gallery-image"
                    />
                    <div className="image-overlay">
                      <Eye className="w-8 h-8" />
                      <span>View Details</span>
                    </div>
                  </div>
                  <div className="image-info">
                    <h4>{image.title}</h4>
                    <p>{image.description}</p>
                    <div className="image-meta">
                      <span className="category-tag">{image.category}</span>
                      <span className="date">{formatDate(image.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            
            <div className="modal-image-container">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
                className="modal-image"
              />
            </div>
            
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <div className="modal-meta">
                <span className="category-tag">{selectedImage.category}</span>
                <span className="date">{formatDate(selectedImage.date)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-page {
          margin-top: 80px;
        }

        .gallery-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
          color: white;
          padding: 6rem 0;
        }

        .gallery-hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .page-title {
          color: white;
          font-size: 3rem;
          margin-bottom: 2rem;
          font-weight: 700;
        }

        .hero-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
        }

        .gallery-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          gap: 1rem;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--gray-200);
          border-top: 4px solid var(--primary-blue);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .filter-section {
          background: var(--gray-50);
          padding: 3rem 0;
        }

        .filter-container {
          text-align: center;
        }

        .filter-container h3 {
          color: var(--primary-blue);
          margin-bottom: 2rem;
        }

        .category-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border: 2px solid var(--gray-200);
          background: white;
          color: var(--text-dark);
          border-radius: 25px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-btn:hover,
        .category-btn.active {
          border-color: var(--primary-blue);
          background: var(--primary-blue);
          color: white;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .gallery-item {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .gallery-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
        }

        .image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(30, 74, 114, 0.8);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: opacity 0.3s ease;
          gap: 0.5rem;
        }

        .gallery-item:hover .image-overlay {
          opacity: 1;
        }

        .image-info {
          padding: 2rem;
        }

        .image-info h4 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .image-info p {
          color: var(--text-medium);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .image-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category-tag {
          background: var(--primary-blue);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .date {
          color: var(--text-light);
          font-size: 0.9rem;
        }

        .no-images {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--text-medium);
        }

        .no-images h3 {
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 2rem;
        }

        .modal-content {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          max-width: 900px;
          max-height: 90vh;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        .modal-image-container {
          height: 400px;
          overflow: hidden;
        }

        .modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-info {
          padding: 2rem;
        }

        .modal-info h3 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .modal-info p {
          color: var(--text-medium);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .modal-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }

          .category-buttons {
            flex-direction: column;
            align-items: center;
          }

          .category-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .image-modal {
            padding: 1rem;
          }

          .modal-content {
            max-height: 95vh;
          }

          .modal-image-container {
            height: 250px;
          }

          .modal-info {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;