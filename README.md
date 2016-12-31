# SQL Helper

### Overview

A project that allow the user to load a Active Record Schema file. The file is processed and turned into a interactive visual format that the user can add or delete from. 
Once the user is done creating their Schema they can hit a print button and the necessary PostgreSQL queries are printed to the screen for them to copy and use as they will. 

### Future

This project is currently setup as a webapp. After it was setup as so I realized it would be more handy as a Ruby Gem. I'll keep the web version as it already exists but in the future it will:

* Be a Ruby Gem
* Create only new/updated Active Record migrations for a user when they click "print/finished" ignoring existing migrations
* Have command line commands for loading users Active Record schema and opening/viewing html file to view schema

### Way Future

This project is built where the guts could be ripped out and this could take in schema's for languages other than Ruby's Active Record. It could then be made into a Package for said langauge.
