# Things needed
- Rasperry Pi


- can ssh into the Rasperry Pi
- when you add anything to the Rasperry Pi like pins, camera, sensors, ect
   - you'll need to change the config files and possibly reboot
   `$ sudo raspi-config`

# SSH into RPi

- On Rpi,
```
$ ifconfig
```
This will give you the wlan0 (on wifi with RPi 4), which has
inet ip info

```
$ sudo raspi-config

```

- On config, select SSH and turn it on



- On computer you want to use to SSH into the RPi

```
$ ssh pi@192.168.0.9
```
```
The authenticity of host '192.168.0.9 (192.168.0.9)' can't be established.
ECDSA key fingerprint is SHA256:vYdvcjL7M61N6/C7mBg35Hofc0xP6qedD3s8PyDYqfY.
Are you sure you want to continue connecting (yes/no)? y
Please type 'yes' or 'no': yes
Warning: Permanently added '192.168.0.9' (ECDSA) to the list of known hosts.
pi@192.168.0.9's password:
Linux raspberrypi 4.19.97-v7l+ #1294 SMP Thu Jan 30 13:21:14 GMT 2020 armv7l

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Mon Feb 10 09:56:59 2020

```


## Printing you RPi's GPIO and board layout from CLI
```

$ pinout

,--------------------------------.
| oooooooooooooooooooo J8   +======
| 1ooooooooooooooooooo  PoE |   Net
|  Wi                    oo +======
|  Fi  Pi Model 4B  V1.1 oo      |
|        ,----.               +====
| |D|    |SoC |               |USB3
| |S|    |    |               +====
| |I|    `----'                  |
|                   |C|       +====
|                   |S|       |USB2
| pwr   |HD|   |HD| |I||A|    +====
`-| |---|MI|---|MI|----|V|-------'

Revision           : c03111
SoC                : BCM2711
RAM                : 4096Mb
Storage            : MicroSD
USB ports          : 4 (excluding power)
Ethernet ports     : 1
Wi-fi              : True
Bluetooth          : True
Camera ports (CSI) : 1
Display ports (DSI): 1

J8:
   3V3  (1) (2)  5V    
 GPIO2  (3) (4)  5V    
 GPIO3  (5) (6)  GND   
 GPIO4  (7) (8)  GPIO14
   GND  (9) (10) GPIO15
GPIO17 (11) (12) GPIO18
GPIO27 (13) (14) GND   
GPIO22 (15) (16) GPIO23
   3V3 (17) (18) GPIO24
GPIO10 (19) (20) GND   
 GPIO9 (21) (22) GPIO25
GPIO11 (23) (24) GPIO8 
   GND (25) (26) GPIO7 
 GPIO0 (27) (28) GPIO1 
 GPIO5 (29) (30) GND   
 GPIO6 (31) (32) GPIO12
GPIO13 (33) (34) GND   
GPIO19 (35) (36) GPIO16
GPIO26 (37) (38) GPIO20
   GND (39) (40) GPIO21

For further information, please refer to https://pinout.xyz/


```

# Adjusting audio while remotely in the RPi

```
$ aslamixer

```


## using a camera
- you can run python's pycamera on the pi with a camera attached (these videos are saved as a example.h264)
  - to see the videos the pi has omxplayer bult in


## using led lights with the GPIO pins

- using python's RPi.GPIO to turn on the lights

  - small example
    ```
    import RPi.GPIO as GPIO
    import time

    GPIO.setmode(GPIO.BCM)

    # these are the pin numbers (location), see the GPIO pinlayout to see which is which
    TRIGGER = 4
    ECHO = 18

    # pushes signal out
    GPIO.setup(TRIGGER, GPIO.OUT)
    # receiving the signal
    GPIO.setup(ECHO, GPIO.IN)


    # pushing the signal to the output TRIGGER pin
    GPIO.output(TRIGGER, True)

    # just a quick rest
    time.sleep(0.0001)

    # turning off the output after the sleep
    GPIO.output(TRIGGER, False)

    while GPIO.intput(ECHO) == False:
      start = time.time()
    while GPIO.input(ECHO) == True:
      end = time.time()

    significant_time = end - start

    # measuring this in centimeters
    distance = significant_time / 0.000058

    print('Distance: {} cm'.format(distance))

    # necessary for a cleaner program
    GPIO.cleanup()
    ```

# Some links:
turn pi into server
https://www.instructables.com/id/Turning-your-Raspberry-Pi-into-a-personal-web-serv/
https://ubuntu.com/download/raspberry-pi
https://www.youtube.com/watch?v=HMo9C7LCzE0

storage:
https://www.youtube.com/watch?v=bpvlEbdA6qI
https://www.youtube.com/watch?v=Jquf9BDm4iU

SENTDEX
https://pythonprogramming.net/search/?q=raspberry

OS-
https://www.raspberrypi.org/downloads/
