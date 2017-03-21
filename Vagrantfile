##
# How to run gathererbot locally:
# 1) Run vagrant up
# 2) Run vagrant ssh
# 3) Navigate to the folder ./node_modules/gathererbot/bin/
# 4) Have fun!
#
# Created by HerrPfister
##

$init_vm = <<SCRIPT
    echo --
    echo -- Installing npm and node
    echo --
	sudo apt-get update -y
	sudo apt-get install -y nodejs
	sudo apt-get install -y npm
	echo --
	echo -- Updating ipTables
	echo --
	sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    echo --
    echo -- Installing hubot
    echo --
    sudo npm install -g yo generator-hubot
    sudo yo hubot --defaults
SCRIPT

Vagrant.configure(2) do |config|

  # Use Ubuntu
  config.vm.box = "hashicorp/precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  # config.vm.network "private_network", ip: "11.12.13.14"

  # Modify the CPU and memory usages (let's be nice to ourselves)
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 2
  end

  # Init VM
  config.vm.provision "shell", inline: $init_vm

end
