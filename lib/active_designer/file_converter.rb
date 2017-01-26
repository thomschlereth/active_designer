require 'json'
require 'active_designer/schema_creator.rb'

module ActiveDesigner
  class FileConverter

    def initialize(schema_file)
      schema      = ActiveDesigner::SchemaCreator.new
      gems        = ENV["GEM_HOME"]
      @file_name  = Dir.pwd.split('/')[-1]
      @path       = gems.strip + "/gems/active-designer-1.1.4/lib"
      @tables     = schema.format(schema_file)
      @schema     = JSON.generate(@tables)
    end

    def render
      file     = File.join( File.dirname(__FILE__), '/template.html.erb' )
      template = File.read(file)
      renderer = ERB.new(template)
      renderer.result binding()
    end

  end
end
