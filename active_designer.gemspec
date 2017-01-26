files = [
  "lib/active_designer.rb",
  "lib/active_designer/file_converter.rb",
  "lib/active_designer/schema_creator.rb",
  "lib/active_designer/template.html.erb",
  "lib/active_designer/public/css/bootstrap.min.css",
  "lib/active_designer/public/js/tether.min.js",
  "lib/active_designer/public/js/jquery-3.1.1.js",
  "lib/active_designer/public/js/bootstrap.min.js",
  "lib/active_designer/public/js/jsPlumb-2.2.8.js",
  "lib/active_designer/public/js/schema/jsPlumb.js",
  "lib/active_designer/public/js/schema/edit-checker.js",
  "lib/active_designer/public/js/schema/edit-table-name.js",
  "lib/active_designer/public/js/schema/listeners.js",
  "lib/active_designer/public/js/schema/mouse-controls.js",
  "lib/active_designer/public/js/schema/add-column.js",
  "lib/active_designer/public/js/schema/table-html.js",
  "lib/active_designer/public/js/schema/main.js",
  "lib/active_designer/public/css/main.css",
  "lib/active_designer/public/css/cards.css",
  "lib/active_designer/public/css/font-awesome-4.7.0/css/font-awesome.min.css",
  "lib/active_designer/public/css/font-awesome-4.7.0/fonts/fontawesome-webfont.eot",
  "lib/active_designer/public/css/font-awesome-4.7.0/fonts/fontawesome-webfont.svg",
  "lib/active_designer/public/css/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf",
  "lib/active_designer/public/css/font-awesome-4.7.0/fonts/fontawesome-webfont.woff",
  "lib/active_designer/public/css/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2",
  "lib/active_designer/public/css/font-awesome-4.7.0/fonts/FontAwesome.otf"
]

summary = "Active Designer is an easy to use Visual Interface that opens locally in the browser and works offline to CRUD tables and columns!"
description = "Active Designer is a gem that allows a user to easily create a visual format of their Active Record schema.rb file for an SQL database. With just one command from the command line, it creates an HTML file in the root of the user’s Ruby project. Active Designer is an easy to use Visual Interface that opens locally in the browser and works offline to CRUD tables and columns!"

Gem::Specification.new do |s|
  s.name        = 'active_designer'
  s.version     = '0.0.2'
  s.executables << 'active_designer'
  s.date        = '2017-01-26'
  s.summary     = summary
  s.description = description
  s.authors     = ["Thom Schlereth"]
  s.email       = 'thomschlereth@gmail.com'
  s.files       = files
  s.homepage    =
    'http://rubygems.org/gems/active-designer'
  s.license       = 'MIT'
end
