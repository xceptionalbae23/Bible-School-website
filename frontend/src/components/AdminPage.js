import React, { useState, useEffect } from 'react';
import { Users, Handshake, Images, Calendar, Download, Mail, Phone, MapPin, FileText, Eye, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import AdminLogin from './AdminLogin';
import AdminGallery from './AdminGallery';
import { toast } from 'sonner';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
      fetchRegistrations();
      fetchPartnerships();
    }
  }, [isAuthenticated]);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('admin_token');
    const storedAdminInfo = localStorage.getItem('admin_info');
    
    if (token && storedAdminInfo) {
      try {
        // Verify token with backend
        const response = await fetch(`${backendUrl}/api/admin/verify-token`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
          setAdminInfo(JSON.parse(storedAdminInfo));
        } else {
          // Token invalid, clear storage
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_info');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_info');
      }
    }
    setLoading(false);
  };

  const handleLoginSuccess = (loginResult) => {
    setIsAuthenticated(true);
    setAdminInfo(loginResult.admin_info);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_info');
    setIsAuthenticated(false);
    setAdminInfo(null);
    setDashboardData(null);
    setRegistrations([]);
    setPartnerships([]);
    toast.success('Logged out successfully');
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/dashboard`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/registrations`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPartnerships = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/partnerships`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setPartnerships(data);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching partnerships:', error);
    }
  };

  const toggleExpanded = (type, id) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${type}_${id}`]: !prev[`${type}_${id}`]
    }));
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

  const StatCard = ({ icon, title, value, color }) => (
    <div className="stat-card card">
      <div className="card-content">
        <div className="stat-header">
          <div className={`stat-icon ${color}`}>
            {icon}
          </div>
          <div>
            <h3>{title}</h3>
            <div className="stat-value">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const RegistrationCard = ({ registration }) => {
    const isExpanded = expandedItems[`reg_${registration.id}`];
    
    return (
      <div className="data-card card">
        <div className="card-content">
          <div className="data-header">
            <div className="data-main-info">
              <h4>{registration.full_name}</h4>
              <div className="data-meta">
                <span className="program-badge">{registration.program_applied}</span>
                <span className="date-info">{formatDate(registration.created_at)}</span>
              </div>
            </div>
            <button 
              className="expand-btn"
              onClick={() => toggleExpanded('reg', registration.id)}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          <div className="data-quick-info">
            <div className="info-item">
              <Mail size={16} />
              <span>{registration.email}</span>
            </div>
            <div className="info-item">
              <Phone size={16} />
              <span>{registration.phone_number}</span>
            </div>
          </div>

          {isExpanded && (
            <div className="data-details">
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Date of Birth:</strong>
                  <span>{registration.date_of_birth}</span>
                </div>
                <div className="detail-item">
                  <strong>Gender:</strong>
                  <span>{registration.gender}</span>
                </div>
                <div className="detail-item">
                  <strong>Study Mode:</strong>
                  <span>{registration.study_mode}</span>
                </div>
                <div className="detail-item full-width">
                  <strong>Address:</strong>
                  <span>{registration.address}</span>
                </div>
                <div className="detail-item full-width">
                  <strong>Educational Background:</strong>
                  <span>{registration.educational_background}</span>
                </div>
                {registration.document_filename && (
                  <div className="detail-item full-width">
                    <strong>Document:</strong>
                    <div className="document-info">
                      <FileText size={16} />
                      <span>{registration.document_filename}</span>
                      <a 
                        href={`${backendUrl}/uploads/${registration.document_filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-link"
                      >
                        <Download size={14} />
                        Download
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const PartnershipCard = ({ partnership }) => {
    const isExpanded = expandedItems[`part_${partnership.id}`];
    
    return (
      <div className="data-card card">
        <div className="card-content">
          <div className="data-header">
            <div className="data-main-info">
              <h4>{partnership.organization_name}</h4>
              <div className="data-meta">
                <span className="partnership-badge">{partnership.partnership_type}</span>
                <span className="date-info">{formatDate(partnership.created_at)}</span>
              </div>
            </div>
            <button 
              className="expand-btn"
              onClick={() => toggleExpanded('part', partnership.id)}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          <div className="data-quick-info">
            <div className="info-item">
              <Users size={16} />
              <span>{partnership.contact_person}</span>
            </div>
            <div className="info-item">
              <Mail size={16} />
              <span>{partnership.email}</span>
            </div>
          </div>

          {isExpanded && (
            <div className="data-details">
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Phone:</strong>
                  <span>{partnership.phone_number}</span>
                </div>
                <div className="detail-item full-width">
                  <strong>Message:</strong>
                  <div className="message-content">{partnership.message}</div>
                </div>
                {partnership.document_filename && (
                  <div className="detail-item full-width">
                    <strong>Document:</strong>
                    <div className="document-info">
                      <FileText size={16} />
                      <span>{partnership.document_filename}</span>
                      <a 
                        href={`${backendUrl}/uploads/${partnership.document_filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-link"
                      >
                        <Download size={14} />
                        Download
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    if (loading) {
      return (
        <div className="admin-page">
          <div className="admin-loading">
            <div className="loading-spinner"></div>
            <p>Checking authentication...</p>
          </div>
        </div>
      );
    }
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-content">
          <div>
            <h1>WHIBC Admin Dashboard</h1>
            <p>Manage registrations, partnerships, and institutional data</p>
          </div>
          <div className="admin-user-info">
            <div className="user-details">
              <span className="welcome-text">Welcome, {adminInfo?.username}</span>
              <span className="user-role">{adminInfo?.role}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <nav className="admin-nav">
        <button 
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Calendar size={20} />
          Dashboard
        </button>
        <button 
          className={`nav-btn ${activeTab === 'registrations' ? 'active' : ''}`}
          onClick={() => setActiveTab('registrations')}
        >
          <Users size={20} />
          Registrations ({registrations.length})
        </button>
        <button 
          className={`nav-btn ${activeTab === 'partnerships' ? 'active' : ''}`}
          onClick={() => setActiveTab('partnerships')}
        >
          <Handshake size={20} />
          Partnerships ({partnerships.length})
        </button>
        <button 
          className={`nav-btn ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          <Images size={20} />
          Gallery
        </button>
      </nav>

      <div className="admin-content">
        {activeTab === 'dashboard' && dashboardData && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <StatCard 
                icon={<Users size={32} />}
                title="Total Registrations"
                value={dashboardData.stats.total_registrations}
                color="text-primary"
              />
              <StatCard 
                icon={<Handshake size={32} />}
                title="Total Partnerships"
                value={dashboardData.stats.total_partnerships}
                color="text-secondary"
              />
              <StatCard 
                icon={<Images size={32} />}
                title="Gallery Images"
                value={dashboardData.stats.total_gallery}
                color="text-accent"
              />
            </div>

            <div className="recent-activity">
              <div className="activity-section">
                <h3>Recent Registrations</h3>
                <div className="activity-list">
                  {dashboardData.recent_registrations.map(reg => (
                    <div key={reg.id} className="activity-item">
                      <div className="activity-info">
                        <strong>{reg.full_name}</strong>
                        <span>{reg.program_applied}</span>
                      </div>
                      <span className="activity-date">{formatDate(reg.created_at)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="activity-section">
                <h3>Recent Partnerships</h3>
                <div className="activity-list">
                  {dashboardData.recent_partnerships.map(partnership => (
                    <div key={partnership.id} className="activity-item">
                      <div className="activity-info">
                        <strong>{partnership.organization_name}</strong>
                        <span>{partnership.partnership_type}</span>
                      </div>
                      <span className="activity-date">{formatDate(partnership.created_at)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="registrations-content">
            <div className="section-header">
              <h2>Student Registrations</h2>
              <p>All student applications and registrations</p>
            </div>
            <div className="data-grid">
              {registrations.map(registration => (
                <RegistrationCard key={registration.id} registration={registration} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'partnerships' && (
          <div className="partnerships-content">
            <div className="section-header">
              <h2>Partnership Applications</h2>
              <p>All partnership inquiries and applications</p>
            </div>
            <div className="data-grid">
              {partnerships.map(partnership => (
                <PartnershipCard key={partnership.id} partnership={partnership} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-page {
          min-height: 100vh;
          background: var(--gray-50);
          padding: 2rem;
        }

        .admin-header {
          margin-bottom: 3rem;
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-header h1 {
          color: var(--primary-blue);
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .admin-user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .welcome-text {
          font-weight: 600;
          color: var(--text-dark);
        }

        .user-role {
          font-size: 0.8rem;
          color: var(--text-medium);
          text-transform: capitalize;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: var(--secondary-green);
          transform: translateY(-2px);
        }

        .admin-loading {
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

        .admin-nav {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border: 2px solid var(--gray-200);
          background: white;
          color: var(--text-dark);
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover,
        .nav-btn.active {
          border-color: var(--primary-blue);
          background: var(--primary-blue);
          color: white;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .stat-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          padding: 1rem;
          border-radius: 50%;
          background: var(--light-blue);
        }

        .stat-icon.text-primary {
          color: var(--primary-blue);
        }

        .stat-icon.text-secondary {
          color: var(--secondary-green);
          background: var(--light-green);
        }

        .stat-icon.text-accent {
          color: var(--accent-gold);
          background: var(--light-gold);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-blue);
          font-family: 'Playfair Display', serif;
        }

        .recent-activity {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .activity-section {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .activity-section h3 {
          color: var(--primary-blue);
          margin-bottom: 1.5rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .activity-item:hover {
          border-color: var(--primary-blue);
          background: var(--light-blue);
        }

        .activity-info {
          display: flex;
          flex-direction: column;
        }

        .activity-info strong {
          color: var(--text-dark);
          margin-bottom: 0.25rem;
        }

        .activity-info span {
          color: var(--text-medium);
          font-size: 0.9rem;
        }

        .activity-date {
          color: var(--text-light);
          font-size: 0.8rem;
        }

        .data-grid {
          display: grid;
          gap: 2rem;
        }

        .data-card {
          background: white;
          transition: all 0.3s ease;
        }

        .data-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .data-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .data-main-info h4 {
          color: var(--primary-blue);
          margin-bottom: 0.5rem;
        }

        .data-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .program-badge,
        .partnership-badge {
          background: var(--primary-blue);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .partnership-badge {
          background: var(--secondary-green);
        }

        .date-info {
          color: var(--text-light);
          font-size: 0.8rem;
        }

        .expand-btn {
          background: none;
          border: none;
          color: var(--text-medium);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .expand-btn:hover {
          background: var(--gray-100);
          color: var(--primary-blue);
        }

        .data-quick-info {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-medium);
          font-size: 0.9rem;
        }

        .info-item svg {
          color: var(--primary-blue);
        }

        .data-details {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--gray-200);
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-item.full-width {
          grid-column: 1 / -1;
        }

        .detail-item strong {
          color: var(--text-dark);
          font-size: 0.9rem;
        }

        .detail-item span {
          color: var(--text-medium);
        }

        .message-content {
          color: var(--text-medium);
          line-height: 1.6;
          background: var(--gray-50);
          padding: 1rem;
          border-radius: 8px;
          border-left: 3px solid var(--primary-blue);
        }

        .document-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--light-blue);
          padding: 0.75rem;
          border-radius: 8px;
        }

        .document-info svg {
          color: var(--primary-blue);
        }

        .download-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.85rem;
          margin-left: auto;
          padding: 0.25rem 0.5rem;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .download-link:hover {
          background: var(--primary-blue);
          color: white;
        }

        @media (max-width: 768px) {
          .admin-page {
            padding: 1rem;
          }

          .admin-header h1 {
            font-size: 2rem;
          }

          .header-content {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .admin-user-info {
            flex-direction: column;
            gap: 0.5rem;
          }

          .user-details {
            align-items: center;
          }

          .admin-nav {
            flex-direction: column;
            align-items: center;
          }

          .nav-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .recent-activity {
            grid-template-columns: 1fr;
          }

          .data-quick-info {
            flex-direction: column;
            gap: 0.5rem;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPage;