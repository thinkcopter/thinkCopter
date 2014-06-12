thinkCopter
===========
##Connect to node copter

telnet 192.168.1.1

cd data

sh wifi.sh


##Connect to mifi

telnet into 192.168.1.10

route add default gw 192.168.1.1 ath0

*****Note: will be able to ping out at this point*****
