
$(shell sh ./.env)
PANTHEON_SITE_NAME?=$(shell basename $(shell pwd))
BACKUP_FILE_NAME=${PANTHEON_SITE_NAME}.sql.gz
LIVE_SITE=${PANTHEON_SITE_NAME}.live


env:
	@[ ! -f ./.envrc ] && make firstrun || true


build: env ## install dependencies and compile JS
	make build-composer
	make build-webpack

build-on-centos8: env ## Only use on CentOS8: install compilers + dependencies and compile JS
	make install-host-build-compilers
	make build

build-composer: env ./composer.json  ## composer install
	make install-composer


build-webpack: env   ## npm install && npm run build
	make install-npm
	npm run build

install:
	make install-composer
	make install-npm

install-composer:
	composer install-vendor-dir

install-npm:
	npm install

install-host-build-compilers:
	make install-centos8-php-composer
	make install-centos8-nodjs-and-npm

install-centos8-php-composer:
	@echo "** Installing PHP-CLI and tools to install and run php composer. **" \
	sudo dnf -y install php-cli php-json php-zip wget unzip \
	&& php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
	&& sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
	&& composer -V

install-centos8-nodjs-and-npm:
	@echo "** Removing NodeJS and NPM to reinstall NodeJSv14 and NPM. **" \
	&& sudo dnf -y remove nodejs \
	&& sudo dnf -y module reset nodejs \
	&& sudo dnf -y module enable nodejs:14 \
	&& sudo dnf -y install npm \
	&& node -v && npm -v 

run: ## run the docker containers for a development environment
	make run-docker

run-docker: env
	$(shell docker-compose up -d) > /dev/null

run-clone-livedb: env ## clone the live DB to the docker mysql instance
	@echo "** If terminus is set up incorrectly on this machine, the database download will fail. **"
	@[[ -f "./db/${BACKUP_FILE_NAME}" ]] && rm "./db/${BACKUP_FILE_NAME}" || true
	terminus backup:create ${LIVE_SITE} --element=database --yes > /dev/null
	terminus backup:get ${LIVE_SITE} --element=database --yes --to="./db/${BACKUP_FILE_NAME}" > /dev/null
	[[ -f "db/${BACKUP_FILE_NAME}" ]] && make run-clone-restore && true

run-clone-livefiles:  ## YOUR SSH KEY MUST BE REGISTERED WITH PANTHEON AND SHARED WITH THE DOCKER CONTAINER FOR THIS TO WORK
	@echo "**If your SSH key is not registered with Pantheon, this will fail.**"
	SFTP_COMMAND=$(shell terminus connection:info ${PANTHEON_SITE_NAME}.live --format=json | jq -r ".sftp_command") > /dev/null
	SSH_COMMAND=${SFTP_COMMAND}/sftp -o Port=/ssh -p /
	FILES_FOLDER=`realpath db/files`
	FILES_SYMLINK=`realpath web/sites/default`
	rsync -rvlz --copy-unsafe-links --size-only --checksum --ipv4 --progress -e ${SFTP_COMMAND}:files/ ${FILES_FOLDER}
	rm -Rf web/sites/default/files
	ln -s ${FILES_FOLDER} ${FILES_SYMLINK}

upgrade:  ## Run upgrade for composer and NPM
	make upgrade-composer
	make upgrade-npm

upgrade-composer:  ## Run composer upgrade
	composer update-vendor-dir

upgrade-npm:  ## Run npm upgrade && npm audit fix
	npm upgrade
	npm audit fix

run-clone-restore:
	# This makes the assumption that you are running a development version
	# with the supplied docker-compose.
	$(shell pv "./db/${BACKUP_FILE_NAME}" | gunzip | mysql -u root --password=${MYSQL_ROOT_PASSWORD} --host 127.0.0.1 --port 33067 --protocol tcp ${DB_NAME}) > /dev/null

authterminus-%: ## authorize terminus usage:  make authterminus-{EMAIL_ADDRESS}  e.g. make authterminus-you@email.com
	## This command assumes terminus is correctly set up
	## RE: https://github.com/pantheon-systems/terminus
	terminus auth:login --email=$* > /dev/null

firstrun: ## make environemnt vars available
	@echo
	cp .envrc.dist .envrc
	cp .env.dist .env
	direnv allow

lint: ## Lint, me baby. Do it long, do it hard. Do it now. (oh! my!)
	@echo
	composer install-codestandards
	composer code-fix
	composer code-sniff
	## npm run lint

log-me-in:
	local COMMAND_LINE_USER=${USER}
	@echo **TODO**: fix this so that it dynamicly parses the docker-compose and gets the id of the php container.
	@echo "This command assumes the php-container is called mi-php. Change that value or get it to work"
	open "$(docker exec -it mi-php "drush uli ${COMMAND_LINE_USER}")"

_install_mac:
	# TODO for windows
	brew install direnv kubernetes-cli jq yq docker make git pv gunzip


how-to-use:  ## Instructions for using this makefile
	@echo
	@echo
	@echo "First: make authterminus-{pantheon-account-email-address]"
	@echo "        Authorize terminus to interact with pantheon on your account"
	@echo
	@echo "Then: If building outside of Docker container, make install-host-build-compilers"
	@echo "        Installs build compilers directly on Docker Host"
	@echo
	@echo "Then: make build"
	@echo "        Install everything and do an initial supporting files build"
	@echo
	@echo "Then: make run"
	@echo "        starts up some docker containers to host the site locally"
	@echo
	@echo "Then: make run-clone-livedb"
	@echo "        copies down a pantheon live site database to db/ folder and installs it in docker container"
	@echo
	@echo "Then: make run-clone-lifefiles"
	@echo
	@echo
	@echo

reset-all-dependencies:  ## remove node_modules folder and vendor dir and reinstall everything
	@echo "this will reset all of your dependencies. Rerun this command with a yes on the end like so:"
	@echo "make reset-all-dependencies-yes"

reset-all-dependencies-yes:
	@echo "=================================================================="
	@echo "Removing outdated dependencies"
	@echo "=================================================================="
	rm -Rf composer.lock
	@echo "=================================================================="
	@echo "Reinstalling"
	@echo "=================================================================="
	make install

reset-dependencies-composer:
	@echo "=================================================================="
	@echo "Removing outdated Composer dependencies"
	@echo "=================================================================="
	echo "clearing composer's cache"
	composer clear-cache
	echo "removing  vendor dir"
	rm -Rf vendor
	echo "removing drupal core, modules/contrib and themes/contrib folders."
	rm -Rf web/modules/contrib
	rm -Rf web/themes/contrib
	rm -Rf web/core
	rm -Rf composer.lock
	@echo "=================================================================="
	@echo "Reinstalling Composer"
	@echo "=================================================================="
	make install-composer

reset-dependencies-npm:
	@echo "=================================================================="
	@echo "Removing outdated NPM dependencies"
	@echo "=================================================================="
	echo "clearing NPM's cache"
	npm cache clear --force
	echo "removing node_modules"
	rm -Rf node_modules
	rm -Rf package-lock.json
	@echo "=================================================================="
	@echo "Reinstalling NPM"
	@echo "=================================================================="
	make install-npm


.DEFAULT_GOAL := help

##
## help message system
##
help: ## print list of tasks and descriptions
	@echo
	@echo "=================================================================="
	@echo "ENVIRONMENT VARIABLES:"
	@echo PANTHEON_SITE_NAME=${PANTHEON_SITE_NAME}
	@echo BACKUP_FILE_NAME=${BACKUP_FILE_NAME}
	@echo LIVE_SITE=${LIVE_SITE}
	@echo "=================================================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-38s\033[0m %s\n", $$1, $$2}'



.DEFAULT_GOAL := help

