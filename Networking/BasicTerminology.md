# Networking Terminology

- Local Access Network
- Wide Access Network
- Multiple Access Network
- Virtual Local Access Network
- Media Access Control (MAC) Addresses

  - Unique hardware address hard-coded into a network adapter. Provides local addressing on Ethernet/WiFi networks. 48 bits long (6 bytes)and are represented by hexadecimal digits. The first half is from the manufacturer's organizationally unique identifier (OUI). Also called "burned-in addresses" or "physical addresses". The second half is a serial number, which can be changed for admin purposes.

  - Examples of valid MAC addresses
    - 00 : 0a : 87 : 5e : 44 : 2c
    - 000a . 875e . 442c
    - 000a875e442c

- Netwrok Interface Cards (NICs)

- Address Resolution Protocol (ARP)

- Half duplex
  - Each node is able to transmit and receive data, but not do both at the same time
- Full duplex
  - Each node is allowed to transmit and recieve simulatenously
- Byte
  - Eight bits



- Nyquist theorm
  - Question:
  A technician is converting an analog input to digital. The technician is using the Nyquist theorem to determine the Kbps needed. The frequency range is 10,000 Hz and the sample size is 1 byte. Calculate the total Kbps the conversion requires.
  - Answer"
  The Nyquist theorem calls for the sampling rate to be twice the signal bandwidth. In this scenario, the frequency range is 10,000 Hertz (Hz) and twice the rate is 20,000 Hz, which converts to 20 Kilohertz (KHz). The sample size is 1 byte, which equals 8 bits. To determine the Kilobits per second (Kbps), multiply 20 KHz x 8 bits. The Kbps required is 160.


- How two nodes communicate with MAC, ARP, and IP
  - Question: 
  Host A and Host B are on the same local network. Host A sends a communication to Host B. Determine the order of actions taken by local address resolution and select the fourth step that will occur.

  - Answer:
  Both the sending and receiving hosts are on the same local network. The fourth step in local address resolution is if the target host recognizes its own address, it updates its cache with the Media Access Control (MAC) address of the source host. It then replies to the source host.
  
  The first step is the source host checks its Address Resolution Protocol (ARP) table cache for the required hardware address of the destination host.

  The fifth step is the source host receives a reply, updates its cache table, and communication is established.

  The second step is if the MAC address is not present in cache, ARP builds a request and broadcasts it onto the network.


- Heirarchy of switches
The __distribution layer__ provides fault-tolerant interconnections between different access blocks and either the core or other distribution blocks. This layer can be used to implement traffic policies such as routing boundaries.

The __access layer__ allows end-user devices, such as computers and printers, to connect to the network.

The __core layer__ provides a highly available network backbone. Devices such as client and server computers should not be attached directly to the core.

The __data center layer__ is a network area that hosts network services, such as authentication, application servers, and storage area networks.


- Microsegmentation
  - Question:
  Host A transmits a frame to Host B. The frame is received by a switch into a port buffer. The port buffer holds the frame until it can be processed. When ready, the switch uses a high-speed backplane to send the frame out on port 3 for Host B. Which of the following does this scenario illustrate?

  - Answer:
  The scenario is describing the actions taken by a switch during microsegmentation. No other devices, such as Host C, will see the activity on the network while this process takes place.

  If a Media Access Control (MAC) address cannot be found in the MAC address table, the switch acts like a hub and transmits the frame out of all of the ports, except for the source port. This is referred to as flooding.

  Switches are set to autonegotiate speed (10/100/1000) and full- or half-duplex operations.

  Port mirroring copies all packets sent to one or more source ports to a mirror, or destination, port.