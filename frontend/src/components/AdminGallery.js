import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Eye, X, Plus, Image as ImageIcon, Calendar, Tag, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { toast } from 'sonner';

const AdminGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const categories = [
    'events',
    'academics',
    'graduation',
    'campus',
    'training',
    'ceremonies',
    'workshops',
    'conferences'
  ];

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  };

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/gallery`);
      if (response.ok) {
        const data = await response.json();
        setGalleryImages(data);
      } else {
        toast.error('Failed to fetch gallery images');
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast.error('Error loading gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (formData) => {
    setUploading(true);
    try {
      const response = await fetch(`${backendUrl}/api/gallery/upload`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Image uploaded successfully!');
        setUploadModalOpen(false);
        fetchGalleryImages(); // Refresh gallery
      } else {
        toast.error(result.detail || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async (imageId, imageTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${imageTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(imageId);
    try {
      const response = await fetch(`${backendUrl}/api/gallery/${imageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Image deleted successfully!');
        fetchGalleryImages(); // Refresh gallery
      } else {
        toast.error(result.detail || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-gallery-loading">
        <div className="loading-spinner"></div>
        <p>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="admin-gallery">
      <div className="gallery-header">
        <div className="header-content">
          <h2>Gallery Management</h2>
          <p>Manage event photos and institutional images</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setUploadModalOpen(true)}
        >
          <Plus className="w-5 h-5" />
          Upload Image
        </button>
      </div>

      {galleryImages.length === 0 ? (
        <div className="empty-gallery">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3>No images in gallery</h3>
          <p>Upload your first image to get started</p>
          <button 
            className="btn btn-primary mt-4"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload className="w-5 h-5" />
            Upload First Image
          </button>
        </div>
      ) : (
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div key={image.id} className="gallery-item-card">
              <div className="image-container">
                <img 
                  src={`${backendUrl}/uploads/${image.filename}`}
                  alt={image.title}
                  className="gallery-image"
                />
                <div className="image-overlay">
                  <button
                    className="overlay-btn view-btn"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    className="overlay-btn delete-btn"
                    onClick={() => handleImageDelete(image.id, image.title)}
                    disabled={deleting === image.id}
                  >
                    {deleting === image.id ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="image-info">
                <h4>{image.title}</h4>
                <p>{image.description}</p>
                <div className="image-meta">
                  <span className="category-tag">{image.category}</span>
                  <span className="date">{formatDate(image.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {uploadModalOpen && (
        <UploadModal
          onClose={() => setUploadModalOpen(false)}
          onUpload={handleImageUpload}
          uploading={uploading}
          categories={categories}
        />
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <ImagePreviewModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDelete={() => {
            handleImageDelete(selectedImage.id, selectedImage.title);
            setSelectedImage(null);
          }}
          deleting={deleting === selectedImage.id}
          backendUrl={backendUrl}
        />
      )}

      <style jsx>{`
        .admin-gallery {
          padding: 2rem;
        }

        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid var(--gray-200);
        }

        .header-content h2 {
          color: var(--primary-blue);
          margin-bottom: 0.5rem;
        }

        .header-content p {
          color: var(--text-medium);
          margin: 0;
        }

        .admin-gallery-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
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

        .empty-gallery {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--text-medium);
        }

        .empty-gallery h3 {
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .gallery-item-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .gallery-item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
        }

        .image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-item-card:hover .gallery-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item-card:hover .image-overlay {
          opacity: 1;
        }

        .overlay-btn {
          padding: 0.75rem;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-btn {
          background: var(--primary-blue);
          color: white;
        }

        .view-btn:hover {
          background: var(--secondary-green);
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }

        .delete-btn:hover:not(:disabled) {
          background: #c82333;
        }

        .delete-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .image-info {
          padding: 1.5rem;
        }

        .image-info h4 {
          color: var(--primary-blue);
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
        }

        .image-info p {
          color: var(--text-medium);
          margin-bottom: 1rem;
          font-size: 0.9rem;
          line-height: 1.5;
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
          font-size: 0.8rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {
          .admin-gallery {
            padding: 1rem;
          }

          .gallery-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

// Upload Modal Component
const UploadModal = ({ onClose, onUpload, uploading, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'events'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload only image files (JPEG, PNG, WebP)');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!selectedFile) newErrors.file = 'Please select an image file';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append('title', formData.title);
    uploadFormData.append('description', formData.description);
    uploadFormData.append('category', formData.category);
    uploadFormData.append('image', selectedFile);

    onUpload(uploadFormData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Upload New Image</h3>
          <button className="close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label className="form-label">Image Title *</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter image title"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the image"
              rows="3"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Image File *</label>
            <div className="file-upload-container">
              <input
                type="file"
                id="image-upload"
                className="file-input"
                onChange={handleFileChange}
                accept="image/*"
              />
              <label htmlFor="image-upload" className="file-upload-label">
                <Upload className="w-5 h-5" />
                <span>Click to upload image</span>
                <span className="file-info">JPEG, PNG, WebP (max 10MB)</span>
              </label>
            </div>
            
            {selectedFile && (
              <div className="selected-file">
                <ImageIcon className="w-4 h-4" />
                <span>{selectedFile.name}</span>
                <span className="file-size">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            )}
            {errors.file && <span className="error-message">{errors.file}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Image
                </>
              )}
            </button>
          </div>
        </form>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 2rem;
          }

          .modal-content {
            background: white;
            border-radius: 15px;
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid var(--gray-200);
          }

          .modal-header h3 {
            color: var(--primary-blue);
            margin: 0;
          }

          .close-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 5px;
            transition: background 0.3s ease;
          }

          .close-btn:hover {
            background: var(--gray-100);
          }

          .upload-form {
            padding: 2rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--text-dark);
          }

          .form-input,
          .form-select,
          .form-textarea {
            width: 100%;
            padding: 1rem;
            border: 2px solid var(--gray-200);
            border-radius: 10px;
            font-family: 'Source Sans Pro', sans-serif;
            transition: all 0.3s ease;
          }

          .form-input:focus,
          .form-select:focus,
          .form-textarea:focus {
            outline: none;
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 3px rgba(30, 74, 114, 0.1);
          }

          .form-textarea {
            resize: vertical;
          }

          .file-upload-container {
            position: relative;
          }

          .file-input {
            position: absolute;
            opacity: 0;
            pointer-events: none;
          }

          .file-upload-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 2rem;
            border: 2px dashed var(--gray-300);
            border-radius: 10px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            color: var(--text-medium);
          }

          .file-upload-label:hover {
            border-color: var(--primary-blue);
            background: var(--light-blue);
            color: var(--primary-blue);
          }

          .file-info {
            font-size: 0.8rem;
            color: var(--text-light);
          }

          .selected-file {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: var(--light-blue);
            border-radius: 8px;
            margin-top: 1rem;
            color: var(--primary-blue);
          }

          .file-size {
            color: var(--text-light);
            font-size: 0.8rem;
          }

          .error-message {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #dc3545;
            font-size: 0.85rem;
            margin-top: 0.5rem;
          }

          .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
          }

          @media (max-width: 768px) {
            .modal-overlay {
              padding: 1rem;
            }

            .modal-header {
              padding: 1.5rem 1.5rem 1rem;
            }

            .upload-form {
              padding: 1.5rem;
            }

            .modal-actions {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

// Image Preview Modal Component
const ImagePreviewModal = ({ image, onClose, onDelete, deleting, backendUrl }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{image.title}</h3>
          <button className="close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="preview-content">
          <div className="preview-image-container">
            <img 
              src={`${backendUrl}/uploads/${image.filename}`}
              alt={image.title}
              className="preview-image"
            />
          </div>
          
          <div className="preview-info">
            <div className="info-section">
              <h4>Description</h4>
              <p>{image.description}</p>
            </div>

            <div className="info-section">
              <h4>Details</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <Tag className="w-4 h-4" />
                  <span>Category: {image.category}</span>
                </div>
                <div className="detail-item">
                  <Calendar className="w-4 h-4" />
                  <span>Uploaded: {formatDate(image.created_at)}</span>
                </div>
              </div>
            </div>

            <div className="preview-actions">
              <button 
                className="btn btn-danger"
                onClick={onDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete Image
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .modal-content.large {
            max-width: 900px;
          }

          .preview-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
          }

          .preview-image-container {
            padding: 2rem;
          }

          .preview-image {
            width: 100%;
            max-height: 400px;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          .preview-info {
            padding: 2rem;
            border-left: 1px solid var(--gray-200);
          }

          .info-section {
            margin-bottom: 2rem;
          }

          .info-section h4 {
            color: var(--primary-blue);
            margin-bottom: 1rem;
            font-size: 1.1rem;
          }

          .info-section p {
            color: var(--text-medium);
            line-height: 1.6;
          }

          .detail-grid {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .detail-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--text-medium);
            font-size: 0.95rem;
          }

          .detail-item svg {
            color: var(--primary-blue);
          }

          .preview-actions {
            margin-top: auto;
          }

          .btn-danger {
            background: #dc3545;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .btn-danger:hover:not(:disabled) {
            background: #c82333;
            transform: translateY(-2px);
          }

          .btn-danger:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          @media (max-width: 768px) {
            .modal-content.large {
              max-width: 100%;
            }

            .preview-content {
              grid-template-columns: 1fr;
            }

            .preview-info {
              border-left: none;
              border-top: 1px solid var(--gray-200);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AdminGallery;