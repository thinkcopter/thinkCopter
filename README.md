thinkCopter
===========
## Connect to node copter

telnet 192.168.1.1

cd data

sh wifi.sh


##Connect to mifi

telnet into 192.168.1.10

route add default gw 192.168.1.1 ath0

*****Note: will be able to ping out at this point*****

## Router Configuration
### WAN settings

Check box to activate 'Default DMZ Server' and set it to the drone's ip, in this case 192.168.1.10

Check 'Return Ping on Internet Port'
