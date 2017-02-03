require 'erb'
require 'active_designer/file_converter.rb'

module ActiveDesigner

  def self.call(argv,stdin,stdout,stderr)
    command = argv[0]

    if !command
      stderr.puts "No command was provided, use -h or --help for more information"
      return 1
    end

    if command == "--help" || command == "-h"
      stdout.puts "To create a schema run '$ active-designer --create filepath'"
      stdout.puts "If youre in the root of a Sinatra or Ruby on Rails project the filepath should be './db/schema.rb'"
      return 0
    end

    if command == "--create"
      input_path  = argv[1]
      output_path = "active_designer/index.html"
      output_dir  = File.dirname output_path

      if !input_path
        stderr.puts "No path was provided, use -h or --help for more information"

        return 1
      end

      if !File.exist?(input_path)
        stderr.puts "#{input_path.inspect} does not exist, use -h or --help for more information"

        return 1
      end

      Dir.mkdir output_dir unless Dir.exist?(output_dir)

      if File.exist?(output_path) && !overwrite?(stdin, stdout, output_path)
        stderr.puts "Aborted"

        return 1
      end

      return create(output_path,input_path,stdout)
    end

    if command
      stderr.puts "#{command.inspect} is not a known command, use -h or --help for more information"
      return 1
    end
  end

  private

    def self.overwrite?(stdin, stdout, path)
      loop do
        stdout.print "Do you wish to overwrite #{path}?(y/n) "
        answer = stdin.gets.chomp.downcase
        return answer == "y" if answer == "y" || answer == "n"
      end
    end

    def self.create(output_path,input_path,stdout)
      input_body = File.read(input_path)
      converter  = ActiveDesigner::FileConverter.new(input_body)
      File.write(output_path, converter.render)
      stdout.puts "\nCreated #{output_path}"
      return 0
    end

end
