Azure Point-to-Site VPN for Secure Remote Administrator Access
Overview

This project implements an Azure Point-to-Site (P2S) VPN solution that allows an authorized administrator to securely connect to an Azure Virtual Network (VNet) and manage internal resources — without ever exposing management ports like SSH (22) or RDP (3389) directly to the public internet.

Instead of assigning a public IP to the managed VM and relying on NSG rules alone, all administrative access is tunneled through an encrypted, certificate-authenticated VPN connection terminating at an Azure VPN Gateway.

Problem Statement

Organizations often expose SSH/RDP management ports directly to the internet so administrators can reach cloud resources remotely. This is a major attack surface — internet-wide scanners actively probe for open management ports, making brute-force and credential-stuffing attacks a constant risk.

This project solves that by removing all public exposure of management ports and requiring a VPN tunnel (with certificate-based authentication) before any administrative traffic can reach the VM.

Objectives
Design and deploy a secure Azure network architecture using a dedicated GatewaySubnet and VPN Gateway.
Implement certificate-based Point-to-Site VPN authentication.
Deploy a VM with no public IP, reachable only via its private address.
Restrict NSG rules so SSH/RDP is accessible only from the VPN client address pool.
Demonstrate secure connectivity, and validate that direct internet access to the VM is blocked.
Document scalability trade-offs (certificate management vs. Microsoft Entra ID authentication) and routing considerations (split tunneling vs. forced tunneling).
Architecture
Remote Administrator
        │  (encrypted P2S VPN tunnel, cert-based auth)
        ▼
Azure VPN Gateway (public IP, in GatewaySubnet)
        │
        ▼
Azure Virtual Network (Admin-VNet)
        │
        ▼
Azure VM (private IP only, NSG restricted to VPN pool)

The VM has no public IP. The only internet-facing component is the VPN Gateway's public IP, which speaks only VPN protocols (IKEv2/TLS) — not SSH or RDP.

Resource Naming and IP Plan
Resource	Name	Notes
Resource Group	P2S-VPN-RG	Container for all resources
Virtual Network	Admin-VNet	10.0.0.0/16
VM Subnet	VM-Subnet	10.0.1.0/24
Gateway Subnet	GatewaySubnet	10.0.255.0/27
VPN Client Address Pool	—	172.16.201.0/24 (planned, non-overlapping)
Public IP	VPN-Gateway-PIP	Standard SKU
VPN Gateway	Admin-VPN-Gateway	SKU: VpnGw1, Route-based
Virtual Machine	Admin-VM	Ubuntu 22.04 LTS, no public IP
Security Design
No public IP on the VM — eliminates direct internet exposure of SSH/RDP.
Certificate-based P2S authentication — only devices holding a client certificate signed by a trusted root certificate can establish the VPN tunnel.
NSG restriction — inbound management ports (22/3389) allowed only from the VPN client address pool, not 0.0.0.0/0.
Defense in depth — two independent controls (VPN cert auth + NSG rule) must both pass before management traffic reaches the VM.
Project Status
 Resource Group created
 Virtual Network with VM-Subnet and GatewaySubnet created
 Public IP for VPN Gateway created
 VPN Gateway (Admin-VPN-Gateway, SKU VpnGw1) deployed and active
 Admin VM deployed (no public IP, SSH temporarily open via NSG for setup)
 Root and client certificate generation
 Point-to-Site VPN configuration on the gateway
 VPN client installation and connection test
 NSG lockdown to VPN client pool only (remove temporary SSH exposure)
 Connectivity and security validation tests
 Troubleshooting documentation
 Optional Azure CLI/PowerShell automation script
Known Challenges

1. Certificate management overhead — generating, distributing, renewing, and revoking client certificates becomes burdensome at scale. Documented comparison against Microsoft Entra ID authentication as a scalable alternative.

2. Split-tunnel routing confusion — misconfigured or overlapping VPN client address pools can cause ambiguous routing on the client, leading to intermittent or total connectivity failures. Addressed by using a distinct RFC1918 range (172.16.201.0/24) for the VPN client pool.

Future Enhancements
Microsoft Entra ID authentication for P2S VPN
Multi-factor authentication
Azure Bastion comparison/integration
Azure Firewall
Conditional Access policies
Centralized monitoring via Azure Monitor
Infrastructure as Code (Azure CLI / Bicep / Terraform)
Cost Notes

The VPN Gateway (VpnGw1 SKU) is billed continuously while running, regardless of usage. Deprovision it after testing/screenshots are complete to avoid ongoing charges, and redeploy when needed for further work or demonstration.
