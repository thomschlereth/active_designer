files = [
  "lib/file_converter.rb",
  "lib/schema-creator.rb",
  "lib/template.html.erb",
  "lib/public/css/bootstrap.min.css",
  "lib/public/js/tether.min.js",
  "lib/public/js/jquery-3.1.1.js",
  "lib/public/js/bootstrap.min.js",
  "lib/public/js/jsPlumb-2.2.8.js",
  "lib/public/js/schema/jsPlumb.js",
  "lib/public/js/schema/edit-checker.js",
  "lib/public/js/schema/edit-table-name.js",
  "lib/public/js/schema/listeners.js",
  "lib/public/js/schema/mouse-controls.js",
  "lib/public/js/schema/add-column.js",
  "lib/public/js/schema/table-html.js",
  "lib/public/js/schema/main.js",
  "lib/public/css/main.css",
  "lib/public/css/cards.css",
  "lib/public/css/font-awesome-4.7.0/css/font-awesome.min.css",
  "lib/public/css/font-awesome-4.7.0/fonts/fontawesome-webfont.eot",
  "lib/public/css/font-awesome-4.7.0/fonts/fontawesome-webfont.svg",
  "lib/public/css/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf",
  "lib/public/css/font-awesome-4.7.0/fonts/fontawesome-webfont.woff",
  "lib/public/css/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2",
  "lib/public/css/font-awesome-4.7.0/fonts/FontAwesome.otf"
]

summary = "Active Designer is an easy to use Visual Interface that opens locally in the browser and works offline to CRUD tables and columns!"
description = "Active Designer is a gem that allows a user to easily create a visual format of their Active Record schema.rb file for an SQL database. With just one command from the command line, it creates an HTML file in the root of the user’s Ruby project. Active Designer is an easy to use Visual Interface that opens locally in the browser and works offline to CRUD tables and columns!"

Gem::Specification.new do |s|
  s.name        = 'active_designer'
  s.version     = '0.0.1'
  s.executables << 'active_designer'
  s.date        = '2017-01-16'
  s.summary     = summary
  s.description = description
  s.authors     = ["Thom Schlereth"]
  s.email       = 'thomschlereth@gmail.com'
  s.files       = files
  s.homepage    =
    'http://rubygems.org/gems/active-designer'
  s.license       = 'MIT'
end
