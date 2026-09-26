import React, { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const certificate = {
    name: "P2SChildCert",
    issuer: "P2SRootCert",
    expiry: "23 Sep 2027",
    daysRemaining: 362,
    authentication: "Azure Certificate",
    privateKey: "Available",
  };

  const routes = [
    {
      icon: "☁",
      title: "Azure Private Network",
      destination: "10.0.0.0/16",
      description: "Azure VNet traffic",
      path: "VPN Tunnel",
      type: "azure",
    },
    {
      icon: "🖥",
      title: "Admin Virtual Machine",
      destination: "10.0.1.4",
      description: "Private VM management",
      path: "VPN Tunnel",
      type: "azure",
    },
    {
      icon: "🌐",
      title: "Internet Traffic",
      destination: "8.8.8.8",
      description: "Public internet traffic",
      path: "Local Network",
      type: "internet",
    },
  ];

  const navItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Certificates", icon: "🔐" },
    { name: "VPN Routes", icon: "🌐" },
    { name: "Resources", icon: "🖥" },
  ];

  const renderDashboard = () => (
    <>
      <div className="header">
        <div>
          <p className="eyebrow">REMOTE ADMINISTRATION</p>
          <h1>SecureAdmin Dashboard</h1>
          <p className="subtitle">
            Monitor VPN connectivity, certificates and private network routes.
          </p>
        </div>

        <div className="header-status">
          <span className="green-dot"></span>
          VPN Connected
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-top">
            <span>VPN STATUS</span>
            <div className="icon blue">⌁</div>
          </div>
          <h2 className="success-text">Connected</h2>
          <p>Client IP: 172.16.201.2</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>CERTIFICATE</span>
            <div className="icon purple">🔐</div>
          </div>
          <h2 className="success-text">Active</h2>
          <p>362 days remaining</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>PRIVATE VM</span>
            <div className="icon orange">▣</div>
          </div>
          <h2 className="success-text">Reachable</h2>
          <p>10.0.1.4 · No Public IP</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>ROUTING</span>
            <div className="icon green">↔</div>
          </div>
          <h2 className="success-text">Split Tunnel</h2>
          <p>Azure traffic via VPN</p>
        </div>
      </div>

      <div className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Certificate Management</h3>
              <p>Certificate lifecycle status</p>
            </div>
            <span className="badge active">ACTIVE</span>
          </div>

          <div className="certificate-row">
            <div className="certificate-icon">🔐</div>

            <div className="certificate-info">
              <strong>{certificate.name}</strong>
              <span>Issued by {certificate.issuer}</span>
            </div>

            <div className="certificate-expiry">
              <span>Expires</span>
              <strong>{certificate.expiry}</strong>
            </div>
          </div>

          <div className="certificate-details">
            <div>
              <span>Days Remaining</span>
              <strong>{certificate.daysRemaining} days</strong>
            </div>

            <div>
              <span>Authentication</span>
              <strong>{certificate.authentication}</strong>
            </div>

            <div>
              <span>Private Key</span>
              <strong className="success-text">
                {certificate.privateKey}
              </strong>
            </div>
          </div>

          <div className="lifecycle">
            <div className="life active-life">
              <span>✓</span>
              <small>Issued</small>
            </div>

            <div className="line active-line"></div>

            <div className="life active-life">
              <span>✓</span>
              <small>Active</small>
            </div>

            <div className="line"></div>

            <div className="life">
              <span>3</span>
              <small>Expiring</small>
            </div>

            <div className="line"></div>

            <div className="life">
              <span>4</span>
              <small>Renew / Revoke</small>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>VPN Connection</h3>
              <p>Current connection details</p>
            </div>
            <span className="badge active">CONNECTED</span>
          </div>

          <div className="detail-list">
            <div>
              <span>VPN Gateway</span>
              <strong>Admin-VPN-Gateway</strong>
            </div>

            <div>
              <span>Virtual Network</span>
              <strong>Admin-VNet</strong>
            </div>

            <div>
              <span>Client Address</span>
              <strong>172.16.201.2</strong>
            </div>

            <div>
              <span>VPN Address Pool</span>
              <strong>172.16.201.0/24</strong>
            </div>

            <div>
              <span>Tunnel Type</span>
              <strong>OpenVPN (SSL)</strong>
            </div>

            <div>
              <span>Authentication</span>
              <strong>Azure Certificate</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="content-grid" style={{ marginTop: "20px" }}>
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Route Overview</h3>
              <p>How network traffic is routed</p>
            </div>
            <span className="badge active">SPLIT TUNNEL</span>
          </div>

          {routes.map((route, index) => (
            <div className="route-item" key={index}>
              <div className={`route-icon ${route.type}`}>
                {route.icon}
              </div>

              <div className="route-info">
                <strong>{route.title}</strong>
                <span>
                  {route.destination} · {route.description}
                </span>
              </div>

              <div className={`route-path ${route.type === "internet" ? "local" : ""}`}>
                <span>{route.path}</span>
                <small>Traffic path</small>
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Private Resource</h3>
              <p>Secure Azure resource access</p>
            </div>
            <span className="badge active">REACHABLE</span>
          </div>

          <div className="vm-card">
            <div className="vm-icon">🖥</div>
            <div>
              <h3>Admin-VM</h3>
              <p>Ubuntu 24.04 · Private IP: 10.0.1.4</p>
            </div>
          </div>

          <div className="route-note">
            <strong>✓ Public management access disabled</strong>
            <span>
              SSH access is available only through the Point-to-Site VPN.
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const renderCertificates = () => (
    <>
      <div className="header">
        <div>
          <p className="eyebrow">SECURITY</p>
          <h1>Certificate Management</h1>
          <p className="subtitle">
            Monitor the lifecycle and validity of VPN authentication certificates.
          </p>
        </div>

        <div className="header-status">
          <span className="green-dot"></span>
          Certificate Active
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-top">
            <span>CERTIFICATE</span>
            <div className="icon purple">🔐</div>
          </div>
          <h2 className="success-text">Active</h2>
          <p>P2SChildCert</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>EXPIRY</span>
            <div className="icon blue">◷</div>
          </div>
          <h2>{certificate.daysRemaining}</h2>
          <p>Days remaining</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>AUTHENTICATION</span>
            <div className="icon green">✓</div>
          </div>
          <h2>Azure</h2>
          <p>Certificate based</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>PRIVATE KEY</span>
            <div className="icon orange">🔑</div>
          </div>
          <h2 className="success-text">Available</h2>
          <p>Current user</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Certificate Lifecycle</h3>
            <p>Current P2S client certificate information</p>
          </div>
          <span className="badge active">VALID</span>
        </div>

        <div className="certificate-row">
          <div className="certificate-icon">🔐</div>

          <div className="certificate-info">
            <strong>P2SChildCert</strong>
            <span>Issued by P2SRootCert</span>
          </div>

          <div className="certificate-expiry">
            <span>Expiration</span>
            <strong>23 Sep 2027</strong>
          </div>
        </div>

        <div className="certificate-details">
          <div>
            <span>Thumbprint</span>
            <strong>CF655E5EA6F5548299136F94F5A999E2F259A81A</strong>
          </div>

          <div>
            <span>Authentication</span>
            <strong>Azure Certificate</strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="success-text">Valid</strong>
          </div>
        </div>

        <div className="lifecycle">
          <div className="life active-life">
            <span>✓</span>
            <small>Issued</small>
          </div>

          <div className="line active-line"></div>

          <div className="life active-life">
            <span>✓</span>
            <small>Active</small>
          </div>

          <div className="line"></div>

          <div className="life">
            <span>3</span>
            <small>Expiring</small>
          </div>

          <div className="line"></div>

          <div className="life">
            <span>4</span>
            <small>Renew / Revoke</small>
          </div>
        </div>
      </div>
    </>
  );

  const renderRoutes = () => (
    <>
      <div className="header">
        <div>
          <p className="eyebrow">NETWORK VISIBILITY</p>
          <h1>VPN Routes</h1>
          <p className="subtitle">
            Clear visibility into split-tunnel traffic routing.
          </p>
        </div>

        <div className="header-status">
          <span className="green-dot"></span>
          Split Tunnel Active
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-top">
            <span>VPN CLIENT</span>
            <div className="icon blue">⌁</div>
          </div>
          <h2>172.16.201.2</h2>
          <p>Connected client IP</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>AZURE NETWORK</span>
            <div className="icon purple">☁</div>
          </div>
          <h2>10.0.0.0/16</h2>
          <p>Sent through VPN</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>PRIVATE VM</span>
            <div className="icon orange">🖥</div>
          </div>
          <h2>10.0.1.4</h2>
          <p>Private destination</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>INTERNET</span>
            <div className="icon green">🌐</div>
          </div>
          <h2>Local</h2>
          <p>Normal internet path</p>
        </div>
      </div>

      <div className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Traffic Routing Map</h3>
              <p>Destination-based split tunneling</p>
            </div>
            <span className="badge active">ACTIVE</span>
          </div>

          {routes.map((route, index) => (
            <div className="route-item" key={index}>
              <div className={`route-icon ${route.type}`}>
                {route.icon}
              </div>

              <div className="route-info">
                <strong>{route.title}</strong>
                <span>
                  {route.destination} · {route.description}
                </span>
              </div>

              <div
                className={`route-path ${
                  route.type === "internet" ? "local" : ""
                }`}
              >
                <span>{route.path}</span>
                <small>Selected route</small>
              </div>
            </div>
          ))}

          <div className="route-note">
            <strong>✓ Split tunneling is active</strong>
            <span>
              Azure private network traffic uses the VPN tunnel, while normal
              internet traffic continues through the local network.
            </span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Route Verification</h3>
              <p>Observed from the connected Windows client</p>
            </div>
          </div>

          <div className="detail-list">
            <div>
              <span>VPN Interface</span>
              <strong>Admin-VNet</strong>
            </div>

            <div>
              <span>Client IP</span>
              <strong>172.16.201.2</strong>
            </div>

            <div>
              <span>Azure Route</span>
              <strong>10.0.0.0/16</strong>
            </div>

            <div>
              <span>Private VM</span>
              <strong>10.0.1.4</strong>
            </div>

            <div>
              <span>Internet Route</span>
              <strong>Local Network</strong>
            </div>

            <div>
              <span>Mode</span>
              <strong className="success-text">Split Tunnel</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderResources = () => (
    <>
      <div className="header">
        <div>
          <p className="eyebrow">AZURE INFRASTRUCTURE</p>
          <h1>Resources</h1>
          <p className="subtitle">
            Azure resources supporting secure remote administrator access.
          </p>
        </div>

        <div className="header-status">
          <span className="green-dot"></span>
          Infrastructure Ready
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-top">
            <span>RESOURCE GROUP</span>
            <div className="icon blue">▦</div>
          </div>
          <h2>P2S-VPN-RG</h2>
          <p>Central India</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>VIRTUAL NETWORK</span>
            <div className="icon purple">☁</div>
          </div>
          <h2>Admin-VNet</h2>
          <p>10.0.0.0/16</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>VPN GATEWAY</span>
            <div className="icon green">🔒</div>
          </div>
          <h2>Admin-VPN</h2>
          <p>Route-based VPN</p>
        </div>

        <div className="card">
          <div className="card-top">
            <span>VM</span>
            <div className="icon orange">🖥</div>
          </div>
          <h2>Admin-VM</h2>
          <p>Private IP 10.0.1.4</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Azure Resource Inventory</h3>
            <p>Resources used by the P2S VPN solution</p>
          </div>
        </div>

        <div className="detail-list">
          <div>
            <span>Resource Group</span>
            <strong>P2S-VPN-RG</strong>
          </div>

          <div>
            <span>Virtual Network</span>
            <strong>Admin-VNet · 10.0.0.0/16</strong>
          </div>

          <div>
            <span>VM Subnet</span>
            <strong>VM-Subnet · 10.0.1.0/24</strong>
          </div>

          <div>
            <span>Gateway Subnet</span>
            <strong>GatewaySubnet · 10.0.255.0/27</strong>
          </div>

          <div>
            <span>VPN Client Pool</span>
            <strong>172.16.201.0/24</strong>
          </div>

          <div>
            <span>Virtual Machine</span>
            <strong>Admin-VM · Ubuntu 24.04</strong>
          </div>

          <div>
            <span>VPN Gateway</span>
            <strong>Admin-VPN-Gateway · VpnGw1AZ</strong>
          </div>

          <div>
            <span>SSH Access</span>
            <strong className="success-text">
              VPN Only · No Public IP
            </strong>
          </div>
        </div>
      </div>
    </>
  );

  const renderPage = () => {
    if (activePage === "Certificates") {
      return renderCertificates();
    }

    if (activePage === "VPN Routes") {
      return renderRoutes();
    }

    if (activePage === "Resources") {
      return renderResources();
    }

    return renderDashboard();
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>

          <div>
            <h2>SecureAdmin</h2>
            <span>VPN Management</span>
          </div>
        </div>

        <nav>
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
              style={{ cursor: "pointer" }}
            >
              {item.icon} &nbsp; {item.name}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="security-box">
            <span className="green-dot"></span>

            <div>
              <strong>System Secure</strong>
              <small>VPN configuration active</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        {renderPage()}

        <footer>
          <span>SecureAdmin · Azure P2S VPN</span>
          <span>Secure remote administrator access</span>
        </footer>
      </main>
    </div>
  );
}

export default App;