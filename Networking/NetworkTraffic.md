# Media Types and Access methods

Signaling

modulation

- Bounded, cabled
  - Involves physical cables
- Unbounded, wireless

  - Involves microwve radio frequencies

- Digital Signaling
  Converts binary into a digital waveform (highs - 1s, and lows -0s)

- Bandwith
  The range of frequencies, or chanel capacity, that allow for communication on a network, measured in hertz (Hz). If a medium allows frequencies from 5020 MHz to 5070 MHz the bandwidth would be 50 MHz. - There are multiple ways of measuring the "speed" or "bandwith" of data traversing a network. Either the **bit rate** (counting the actual bits), the **baud rate** (counting the number of "symbols" which may be comprised of multiple bits), and also the **data rate** (which is composed of the baud rate, distance, noise and other similar factors -> could think of this like how it would be in the real world since it has more factors?)

- Attenuation
  The _loss_ of signal strength, it's measure in decibels (dB)

- Noise
  Anything sent over the network other than what was intended. **Signal to Noise Ratio (SNR)** is used to describe the amount of noise over a network
  - __Attenuation__ is the measurement of the loss of signal strength

## Transmission mediums of data

- Copper cables
  - Twisted pair, literally how it sounds, twisted copper wires
  - Coax, central conductor (copper) surrounded by an insulator and shielding
- Fiber optic cables
  - Uses infrared light to transmit signals. Built with glass threads (fibers or filaments) that are coated in plastic
- Wire radio media (Radio Frequency)
  - Uses radio waves to send data between antennas. Most common today are 2.4 GHz and 5 GHz (on almost every modern router and modem). 2.4 GHz suffers from the most co-channel interference, where as 5 GHz does not travel long distances and is easily blocked by walls.

# Media Access Control (MAC)

- Deterministic Media Access
  - Each node is allowed to transmit at a specific time, thus multiple nodes are not communicating at the same time. Analogy given is a "talking stick" in a circle of people, if a person has the stick they can speak but no one else is allowed to
- Contention-based
  - **Collsion** is when two or more nodes try to communicate at the same time, the signals might "collide" and thus never reaching their destination. The area where any collisions are possible is called a **collision domain** or **shared access media**. The domains can be separated with a bridge, sectioning off each "hub" of computers so the network doesn't have collisions in the bridge but might inside each hub. The entire "network" of collision domains and all bridges connecting them _that receive the same broadcast packets_ is considered a **broadcast domain**
    - Best practice is to have broadcast and collision domains as small as possible

# Carrier Sense Multiple Access (CSMA)

The protocols that describe the interactions between shared access media devices, it detects acitivy on the media and having multiple nodes using the same media. Comes in two flavors, CD and CA

- Collision Detection (CSMA/CD)
  If a collision occurs, then a jam signal is broadcasted to alert all other nodes to not send, then the each node on the network waits a "random" amount of time and then retries (called a **backoff period**)

- Collision Avoidance (CSMA/CA)
  Each node checks to see if there is a signal being transmitted and if not, then transmitting.

Using swtiches to break up collision domains is the best way. This way each interface, aka switch port, can be in its own collision domain, thus allowing for each node to be in full duplex and not worry about collisions.

# Broadcast Domains

- Unicast traffic
  From one sender to one receiver

- Broadcast traffic
  Sent from one sender to all of the nodes on the network

- Virtual Local Access Networks
  "Logically" separate network created with switches on layer 2. Even though hosts on two separate VLANs may be physically connected at layer 1, the local traffic can be isolated on each host due to the VLAN and the hosts would need to connect to the respective VLAN to communicate
