# SecureAdmin – Azure Point-to-Site VPN for Remote Administrator Access

## 📌 Project Overview

SecureAdmin is a secure remote administrator access solution built using Azure Point-to-Site (P2S) VPN.

The project allows administrators to securely access a private Azure Virtual Machine without exposing the VM through a public IP address.

A React-based SecureAdmin dashboard provides visibility into VPN status, certificate lifecycle information, VPN routes, and Azure resources.

---

## 🎯 Problem Statement

Remote administrators need secure access to private Azure resources without exposing management ports to the public internet.

The main challenges are:

- Certificate-based authentication management can be difficult to track.
- VPN route configuration can cause split-tunnel confusion.
- Administrators need clear visibility into VPN connectivity and private resources.

---

## 💡 Proposed Solution

We implemented an Azure Point-to-Site VPN with certificate-based authentication.

The solution provides:

- Secure remote access to a private Azure VM
- Certificate-based VPN authentication
- Private VM access without a public IP
- Network Security Group protection
- Split-tunnel routing
- Certificate lifecycle visibility
- VPN route visibility
- Azure resource visibility through the SecureAdmin dashboard

---

## 🏗️ System Architecture

The administrator connects from the local system using Azure VPN Client.

```text
Administrator
     |
     | Certificate Authentication
     ↓
Azure VPN Client
     |
     ↓
Point-to-Site VPN
     |
     ↓
Azure VPN Gateway
     |
     ↓
Azure Virtual Network
     |
     ↓
NSG
     |
     ↓
Private Azure VM
10.0.1.4

☁️ Azure Services Used

| Service                      | Purpose                                      |
| ---------------------------- | -------------------------------------------- |
| Azure Virtual Network        | Provides the private network                 |
| Azure VPN Gateway            | Provides Point-to-Site VPN connectivity      |
| Azure Virtual Machine        | Private administrator target                 |
| Azure Network Security Group | Controls network access                      |
| Azure Public IP              | Used by the VPN Gateway                      |
| Azure VPN Client             | Establishes the administrator VPN connection |
| Azure Certificates           | Provides certificate-based authentication    |


🌐 Network Configuration

| Component            | Configuration       |
| -------------------- | ------------------- |
| Resource Group       | `P2S-VPN-RG`        |
| Virtual Network      | `Admin-VNet`        |
| VNet Address Space   | `10.0.0.0/16`       |
| VM Subnet            | `VM-Subnet`         |
| VM Subnet Range      | `10.0.1.0/24`       |
| Gateway Subnet       | `GatewaySubnet`     |
| Gateway Subnet Range | `10.0.255.0/27`     |
| VPN Client Pool      | `172.16.201.0/24`   |
| Private VM           | `Admin-VM`          |
| VM Private IP        | `10.0.1.4`          |
| VPN Gateway          | `Admin-VPN-Gateway` |

🔐 Security Implementation

The Azure VM does not have a public IP address.

SSH access is restricted through the Network Security Group.

The SSH rule allows:

Source: 172.16.201.0/24
Protocol: TCP
Destination Port: 22
Action: Allow

This ensures that SSH access is available only through the VPN client network.

🔑 Certificate Authentication
The Point-to-Site VPN uses certificate-based authentication.

The configured client certificate is:

P2SChildCert

The certificate is used by Azure VPN Client to authenticate the administrator before establishing the VPN connection.

The SecureAdmin dashboard provides certificate lifecycle visibility including:

Certificate name
Issuer
Expiry date
Remaining validity
Thumbprint
Authentication method
🔀 Split-Tunnel Routing

The VPN uses split-tunnel routing.

Azure private traffic is routed through the VPN while normal internet traffic remains on the local network.

Example:

10.0.0.0/16  → VPN Tunnel
10.0.1.4     → VPN Tunnel
8.8.8.8      → Local Network

This makes the routing behavior visible to the administrator.

📊 SecureAdmin Dashboard

SecureAdmin is a React-based dashboard that provides visibility into the implemented VPN environment.

Dashboard

Displays:

VPN connection status
VPN client IP
Certificate status
Private VM reachability
Split-tunnel status
Private resource information
Certificates

Displays certificate lifecycle information such as:

Active certificate
Issuer
Expiry date
Remaining validity
Thumbprint
VPN Routes

Displays:

Azure private network routes
VPN tunnel routes
Local network routes
Client VPN IP
Split-tunnel status
Resources

Displays the Azure resources used by the solution:

Resource Group
Virtual Network
Subnets
Virtual Machine
VPN Gateway

SecureAdmin currently acts as a visibility and monitoring layer for the implemented VPN configuration. Automated certificate renewal and direct Azure resource management are future enhancements.

🧪 Testing and Validation
Test 1 – VPN Disconnected

When the VPN is disconnected, the private VM cannot be reached from the administrator machine.

Test 2 – VPN Connected

After connecting through Azure VPN Client:

VPN IP: 172.16.201.2

The private Azure network becomes reachable.

Test 3 – Private VM Connectivity
tracert 10.0.1.4

The private VM becomes reachable through the VPN tunnel.

Test 4 – SSH Access
ssh -i "Admin-VM_key.pem" azureuser@10.0.1.4

Successful access confirms secure administrator connectivity to the private VM.

Test 5 – Split Tunnel

The routing table confirms that Azure private traffic uses the VPN while normal internet traffic uses the local network.

💻 Technologies Used
Cloud
Microsoft Azure
Azure Virtual Network
Azure VPN Gateway
Azure Virtual Machine
Network Security Group
Frontend
React.js
JavaScript
HTML
CSS
Networking & Security
Point-to-Site VPN
Certificate Authentication
SSH
Split-Tunnel Routing
NSG
📁 Project Structure
secureadmin-dashboard/
│
├── documentation/
│   ├── Abstract.md
│   ├── Architecture.png
│   └── Services-Required.md
│
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   └── ...
│
├── package.json
└── README.md

▶️ Running the SecureAdmin Dashboard

Clone the repository:

git clone https://github.com/srivalliY24KL/Azure-Point-to-Site-VPN-for-Remote-Administrator-Access.git

Navigate to the React project:

cd secureadmin-dashboard

Install dependencies:

npm install

Start the application:

npm start

The dashboard will be available at:

http://localhost:3000
👥 Team Members
G. Srivalli Chowdary – 2400032594
K. Lasya – 2400089001
B. Abhiraam – 2400032536
A. Narendra Venkata Satyasaiavinish – 2400032561
📌 Project Outcome

The project successfully demonstrates secure remote administrator access to a private Azure VM using Point-to-Site VPN and certificate-based authentication.

The VM remains without a public IP, while administrators can securely access it through the VPN tunnel.

The SecureAdmin dashboard provides a centralized view of certificate status, VPN routing, connectivity, and Azure resources.


