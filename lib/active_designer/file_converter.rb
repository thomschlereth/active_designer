require 'json'
require 'active_designer/schema_creator.rb'

module ActiveDesigner
  class FileConverter

    def initialize(schema_file)
      schema      = ActiveDesigner::SchemaCreator.new
      gems        = ENV["GEM_HOME"]
      @file_name  = Dir.pwd.split('/')[-1]
      @path       = APP_ROOT
      @tables     = schema.format(schema_file)
      @schema     = JSON.generate(@tables)
    end

    def render
      ERB.new(TEMPLATE).result binding()
    end

  end

  private

    APP_ROOT      = File.realdirpath(__dir__)
    TEMPLATE_PATH = File.join(__dir__, '/template.html.erb')
    TEMPLATE      = File.read(TEMPLATE_PATH)
end
