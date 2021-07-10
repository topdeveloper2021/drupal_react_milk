# Milken Institute Website Rebuild 2.0 #

## Installation ##
1. Clone this repo. Always make sure your branch is up to date with master.

2. Run the following within the newly cloned repo directory.

3. ```cp .env.dist .env```

4. ```cp config/settings.local.php web/sites/default```

5. ```docker-compose pull && docker-compose up -d```

6. Wait for docker-compose to finish, then run the following:

7. ```docker exec -it mi-php bash```

8. If the container name is different, find the PHP container by running this:

9. ```docker ps -a```

10. After 'docker exec' runs successfully, you should now have a shell inside the PHP container. Run this within it:

11. ```composer install && composer install-vendor-dir && npm install && gulp && gulp buildMilkenTheme && drush cr```

12. Download the latest DB, if you place it into the directory 'db' it will be visible within the container.

13. Load it from within the PHP docker container by running: 

14. ```pv BACKUP_DB_FILE_NAME | gunzip | mysql -u root --password=drupal -h mysql  drupal8```

15. Download the latest public files archive and extract all the contents of the files dir into db/files/

16. ```tar -xzvf FILES_ARCHIVE_NAME.tar.gz```

17. After files are extracted, run the following to map them to the correct location:

18. ```rm -rf web/sites/default/files/```

19. ```ln -s /var/www/db/files /var/www/web/sites/default```

20. ```chown -R www-data:www-data /var/www/db/files```

21. ```drush cr```

22. Site should be up now. Point your browser to https://localhost:8080/

## SSL On Debian NGINX ##
1. Ensure that the ports 80 and 443 can reach the NGINX container. 

2. Run the following:

3. ```docker exec -u 0 -it mi bash -c "apt update && apt install certbot python3-certbot-nginx && certbot"```

## Old Installation Method ##

1. Login to Pantheon.

2. Click your name in the top right corner.

3. Choose "Account" Tab, then "Machine Tokens".

4. Generate a machine token and copy it somewhere safe.

5. Clone this github repo and make sure master is up-to-date. Open a terminus and cd to the directory you just cloned.

6. ```cp .env.dist .env```

7. ```cp config/settings.local.php web/sites/default```

8. ```docker-compose up -d```

If the ```docker-compose``` command completed successfully, you can now launch a shell on the PHP container:

1. ```docker exec -it freshdrupalmi_php_1 bash```

Then from inside the docker container do the following to install the drupal site:

1. ```composer install && gulp buildMilkenTheme && gulp```

2. ```terminus login --email={PANTHEON EMAIL} ----machine-token={TOKEN FROM PANTHEON}```

3. ```bin/loadDatabaseBackup```

4. ```bin/rsyncFiles``` (will take forever)

5. ```rm -rf web/sites/default/files/```

6. ```ln -s /var/www/db/files /var/www/web/sites/default```

7. ```chown -R www-data:www-data /var/www/db/files```

8. ```drush cr```

9. Point your browser to https://localhost:8080/


## MIGRATIONS ##

**NOTE**: Migrations should already be run but if you alter them, you will have to rollback and re-import.

```web/modules/custom/milken_migrate/milken_migrate.cron.inc``` Because of Patheon's limits on container activity
they often fail with a **CURL** error so they need to be constnatly restarted and reset if you do them by hand.

To get a list of migrations and they're current status:

```drush migrate:status```

** doing this will take a few minutes as drupal gathers total/active/unprocessed imports for every migration. It CANNOT
BE RUN ON A PANTHEON INSTANCE BECAUSE OF PANTHEON'S RESOURCE LIMITS.

Migrations can be run different of ways. You can run them individually from the container using drush:

```drush migrate:import {migration_id}```

if they fail, reset then rerun:

```drush migrate:reset {migration_id} && drush migrate:import {migration_id}```

A cron-run will import 250 items from the internal list of migrations and automatically restart any migration that fails.
You can install a cron tab in your container that will run every 10 minutes:

```*/10 * * * * cd /var/www && /var/www/vendor/bin/drush core:cron  2>&1```

or you can run the cron by hand a bunch of times:

```drush core:cron && drush core:cron && drush core:cron && drush core:cron```

## Wipe and Re-create the docker environment ##

If you happen to break something in the environment, it is often better to remove the image cache and rebuild the docker instances from scratch. To do so, simply run the following commands from the project root on the container host.

1. ```docker-compose down --rmi all``` To shutdown and remove all docker images.

2. ```docker/bin/cleanDocker``` To prune the docker environment.

3. After wiping the environment, follow the Installation steps starting with step 1.


## Merge a tag into an existing branch ##

Sometimes a branch might fall behind and you might need to bring it up to date to a certain stable tag.

1. ```git checkout tag_name``` Will checkout the tag "tag_name" locally.

2. ```git checkout -b new_branch_for_tag_name``` Will make a new branch (must not currently exist) with the code from "tag_name".

3. ```git merge -s ours existing_branch``` Will merge existing_branch into new_branch_for_tag_name and favor changes in new_branch_for_tag_name.

4. ```git commit -am "Merged existing_branch into new_branch_for_tag_name"``` Commit the merge if it didn't already.

5. ```git checkout existing_branch``` Switch from the new_branch_for_tag_name to the original existing_branch.

6. ```git merge new_branch_for_tag_name``` Merge the result of all the above work into the original "existing_branch".


## Basic Development Practices ##

Here are a few tips to avoid ( or solve ) problems while developing.

1. Never check anything into the pantheon repo. Always check into github and allow CircleCI to do a build

2. Make sure you have a pantheon environment with the same name as your development branch of the Github Repo

3. Never check in files/packages/etc that composer downloads.

4. ```drupal site:milken:destroy && drupal site:milken:install``` from inside the container will completely rebuild the Drupal site.

5. Config file directory is /config/live with config-split overrides in the various environment folder. IF YOU DO NOT UNDERSTAND HOW CONFIG-SPLIT WORKS, PLEASE DO NOT CHANGE THE CONFIG SPLIT SETTINGS. You will break the build if you do.

6. Once the build has run, your development environment should have a copy of the fully-deployed code on Pantheon. You can wipe your environment and use the Terminus command line library to verify your new code will install and config:import correctly.

7. You may choose to install the Drupal Console plugin for Pantheon Terminus on your local machine, to do so, run:

   a. ```mkdir -p ~/.terminus/plugins```

   b. ```composer create-project --no-dev -d ~/.terminus/plugins pantheon-systems/terminus-drupal-console-plugin:~1```


## Exporting Content Types ##

To export a content type to the config folder:

1. create the content type in your docker container's drupal instance

2. There are three parts to content type export YML files:

    a. ```node.type.{CONTENT_TYPE_MACHINE_NAME}.yml``` - the basic type definition

    b. ```field.storage.node.{FIELD_MACHINE_NAME}.yml``` - one for every new field

    c. ```field.field.node.{CONTENT_TYPE_MACHINE_NAME}.{FIELD_MACHINE_NAME}.yml``` - Field instance for every field attached to the node type. If there are fields that are used from other content types, they will not have a new storage file.

3. From the command line inside the container, do a ```config:export``` and the three types of files should be in place for each of the newly-created content types.

4. Most of the time ```language.entity.en.yml``` will have a UUID added to the top of the file. Discard the changes to this file. The uuid on the default language will only cause problems with importing the config.


## Exporting Content ( Nodes, Taxonomy terms etc... ) ##

To export content in order to have it import automatically on site build, follow the next steps.

1. ```drush dcer taxonomy_term --folder=some/folder/within/web/root``` To export all taxonomy_term content into the given path

2. Then place the exported files into web/modules/custom/milken_migrate/content/taxonomy_term

3. When the module Milken_Migrate is enabled, it will load the content into the site automatically.

4. The content will also be loaded automatically on every site build.


# Command Line

Recommended additions to your ~/.zshrc file for Mac OS:

```bash
export GITHUB_TOKEN={obtain one from your GH account}
export CIRCLE_TOKEN={obtain from circleCI login}

alias flushall="docker exec -it mi-redis redis-cli FLUSHALL"
alias terminus=/usr/local/bin/terminus
alias drush="docker exec -it mi-php drush $1"
export PATH=".composer/vendor/bin:/usr/local/opt/openssl@1.1/bin:$PATH"
```
