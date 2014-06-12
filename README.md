thinkCopter
===========
connect to node copter
telnet 192.168.1.1
cd data
sh wifi.sh

connect to mifi
telnet into 192.168.1.10
route add default gw 192.168.1.1 ath0
> will be able tp ping out at this point
