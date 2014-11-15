memory = 512
cpus   = 1

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.provider "virtualbox" do |v|
	  v.memory = memory
	  v.cpus = cpus
  end

  config.vm.provision "shell", inline: "sudo apt-get update"
  config.vm.provision "shell", inline: "sudo apt-get -y install npm nodejs-legacy git"
end