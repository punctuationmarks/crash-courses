# Configuring and monitoring network interfaces

- Netwrok Interface Cards (NICs)
  A network adapter that phyisically connects a node to media, occurs at the data link layer (layer 2). Ensures each interface has a MAC address and assembles the frames of the data. - The MAC addresses are unique to each device, also called **Extnded Unique Indentifiers** (EUI)

- Multicast

  - Sent to a group of nodes on a domain. One to many relationship

- Broadcast

  - Sent to all nodes on a domain. One to all relationship
  - Never broken up by routers at layer 3.

- Unicast

  - One node sending something to one other node. One to one relationship

- Address Resolution Protocol (ARP)
  The protocol that allows communication between the data link and network layers. If an address is on a remote network ARP provides address mapping of the router that routes the traffic (called a **gateway** router)

- ARP Cache Utility
  The ARP caches its known data to avoid from having too much excessive information being broadcasted (the mapping of the IP to MAC addresses). The cached IPs and MAC addresses are stored at the **ARP Table**. But since the IP and second half of the MAC addresses can change, it can't always read from cached data, so they solved this by having the ARP table clear itself regularly. - Some ARP commands from terminal
  `bash # might need to install net-tools if on ubuntu # sudo apt install net-tools arp -a # shows the cached ARP table arp -e # shows the cached ARP table, in a more linux friendly way arp -s # manually add or "set" a static entry arp -d # deletes all entries in cache `

- Packet Sniffers
  Capture the traffic being transmitted over a network. Much easier to do on wireless, but can be done on cabled. Usually combined with **protocol analyzers** which allow for analyzing the the data further. Even though when unicast, broadcast and multicast traffic is sent it's only sent to the Destination MAC Address, sniffers can force the network to work in **\_promiscuous mode** which means that all traffic can be processed by the sniffer. Popular options for this are wireshark, libpcap, tcpdump, and winpcap (windows).





# Hubs and Bridges
These are legacy layer one devices, but they are still used some places.

- Hubs
