#logic.erb
require 'erb'

erb = ERB.new(File.open("./index.html.erb").read, 0, '>')
File.write('./index.html', erb.result(binding))

`open ./index.html`
