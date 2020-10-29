# Ethernet Standards

Most modern cabled LANs uther Etherrnet. Ethernet uses baseband signally as CSMA/CD

- Ethernet Frame

  - Preamble
    - Uses Collision Detection (CMSA/CD)
    - 8 bytes long
    - Ensures clocks are synced
  - Start Frame Delimiter (SFD)
    - The last two bytes of the preamble
    - Ensures clocks are synced
  - Destination MAC address
    - Where the packet is being sent to
  - Source MAC address
    - Where the packet is being sent from
  - EtherType field
    - Describes the protocol being used by the payload
  - Payload
    - The actual data
    - **Maximum Transmission Unit** describes the max amount of data that can be sent in the payload, without having to be broken up into smaller packets (aka frames). Standard is usually 1518 bytes (rounded to 1500 bytes)
  - Frame Check Sequence (FCS)
    - Used for error checking
    - Might be used to check if data is missing/damaged, but not robust enough to signal to the Source MAC to resend the missing/damaged frames
    - Also called Cyclic Redundancy Check (CRC)

- Baseband Signaling
  Ethernet always uses baseband transmission for its signal mode.

- xBASE-y

  - Standard for ethernet media specs IEEE 802.3
  - x represents the bit rate of the cable, in megabits per second (Mbps) or gigabits per second (Gbps)
  - BASE is the signal mode, specifying it's baseband transmission
  - -y is the medium type, fiber, coax, twister pair, ect
  - 10BASE-T means it's a cable that supports 10Mbps, uses baseband signal, and a twisted pair

- Fast Ethernet
  Raised the bit rate from 10Mbps to 100Mbps, Cat 5+ unshielded twister pair cabling, a max distance of 100m, uses baseband signaling, and backwards compatible. Written out as 100BASE-TX.
  - Autonegotiation
    Devices are able to automatically select the highest supported speed and duplex. This improves performance and also is a safegaurd from misconfiguration errors by the network admin

- Gibabit Ethernet
  Raised the bit rate from 100Mbps to 1000Mbps, allows the use of copper and fiber cables, allows for longer distances with LX, or shorter distances with SX (if copper, must be Cat5e or higher). This is the most common today 2020. Example of a single mode fiber optic cable that can go 5km is written, 1000BASE-LX

- 10 Gigabit Ethernet 9 (10GbE)
  Raised the bit rate from 1000Mbps to 10Gbps, can use copper or fiber, can be short range or long range extending up to 40km. Expensive, so usually just used currently for film production companies. Written out as "10GBASE-y", example is 10GBASE-ER is a sinlge mode fiber optic cable that can go 40mk
