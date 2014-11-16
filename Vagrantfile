memory = 1024
cpus   = 2

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 8000, host: 8000
  config.vm.network "forwarded_port", guest: 35729, host: 35729

  config.vm.provider "virtualbox" do |v|
	  v.memory = memory
	  v.cpus = cpus
  end

  config.vm.provision "shell", inline: "sudo apt-get update"
  config.vm.provision "shell", inline: "sudo apt-get -y install npm nodejs-legacy git ruby-dev"
  config.vm.provision "shell", inline: "sudo npm install -g yo gulp bower"
  config.vm.provision "shell", inline: "sudo gem install compass"
end