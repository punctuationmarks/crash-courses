# Open Systems Interconnection Model (OSI)

A mental model that gives the structure of a successful network, either local area network (LAN) or wide area network (WAN). It is built with 7 layers that interact and the end result is a robust network that allows for communication between devices.

## Layers

- **7 Application layer**
  - Data generation
  - the web browser, the app on a phone, the operating system
- **6 Presentation**
  - Formating and encryption
  - The changin of code into somehting that is represented on a computer (Javascript to a web site), also includes some encryption (but this is usually handled in more layers closer to physical)
- **5 Session layer**
  - Establish Connection
  - It is the user's time connected to a network
- **4 Transport**
  - Delivery and sequencing
  - PDU - Segements, where it can "break up" packets for ease of transmission
  - TCP/UDP
  - Responsible for the port numbers (e.g. 22 for SSH, 443 for SSL)
  - I view this like the actual movement across the data, like the vehicles over a highway
- **3 Network**
  - Routing to destination
  - PDU - Packets
  - Includes routers
  - "Logical Addressing" takes place
  - Broadcast domains are broken up
  - Required for communication in layer:
    - Routing is based off IP address and IP protocol
  - I view this like the structure of how the network is build, like the roads and designs of a highway
- **2 Data Link**
  - Local Network Host Delivery
  - PDU - Frames
  - "Physical Addressing" takes place
  - Switches and Media Acess Control (MAC) addresses, Network Interface Controler (NIC), internet cards, ect
  - Required for communication in layer:
    - IP addresses have to be mapped to corresponding MAC addresses
  - Able to create separate broadcast domains on switch with VLANs
  - **Switches** map addresses to ports by inspecting the source addresses of packets
- **1 Phyiscal**
  - Acess to Media
  - PDU - Bits (the literal ones and zeros)
  - The actual physical items, like ethernet cables and "hubs"
- Acynoms for helping to remember the order:
  a p s t n d p All People Seem To Need Data Processing
  p d n t s p a Please Do Not Throw Secret Sauce Away

## Protocol Data Units (PDU)

Each layer in the network has it's own "unit" of measurement. This is used for encapsulation for the data and headers as well as addressing. Encapsulation (the process of packaging the data with each new header) happens at every layer of the model, except the physical layer.

- Payload
  The actual data

- Headers
  Added to the data at each layer of the model (TPC/IP or OSI) which have information about data identity and addressing.
