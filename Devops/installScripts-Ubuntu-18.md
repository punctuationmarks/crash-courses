
TODO:
Incorporate [this repo](https://github.com/punctuationmarks/Linux-tips-for-deployment) and then deprecate it

```bash
# basics
sudo apt update && sudo apt upgrade -y

# docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common &&
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - &&
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable" &&
sudo apt update &&
# this is to ensure from a cli print out that docker can be installed
apt-cache policy docker-ce
# actually installing docker
sudo apt install docker-ce
```