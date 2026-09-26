# Abstract

SecureAdmin is a secure remote administration solution built using Azure Point-to-Site VPN. The project enables administrators to securely access private Azure resources without exposing management ports to the public internet.

The solution uses certificate-based Point-to-Site authentication, an Azure VPN Gateway, a private virtual machine, and Network Security Group rules that restrict SSH access to the VPN client address pool.

To address practical challenges in certificate management and split-tunnel routing, SecureAdmin also provides a React-based dashboard for monitoring certificate status, VPN connectivity, routing information, and protected Azure resources.

The implementation was validated by testing VPN connectivity, private VM reachability, SSH access, certificate authentication, and split-tunnel routing.
