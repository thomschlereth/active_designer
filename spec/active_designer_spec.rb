require 'stringio'
require 'active_designer'
require 'fileutils'

root_dir    = File.realdirpath '..', __dir__
ad_dir      = File.join root_dir, 'active-designer'
schema_path = File.join root_dir, 'db', 'schema.rb'
output_path = File.join ad_dir,   'index.html'

RSpec.describe 'ActiveDesigner.call' do
  let(:default_stdout) { StringIO.new }
  let(:default_stderr) { StringIO.new }
  let(:default_stdin)  { StringIO.new "y\n"*20 }

  def call(argv: [], stdin: default_stdin, stdout: default_stdout, stderr: default_stderr)
    ActiveDesigner.call(argv, stdin, stdout, stderr)
  end

  describe 'help' do
    it 'prints the help screen to stdout and exits successfully' do
      exitstatus = call argv: ['--help'], stdout: default_stdout
      expect(default_stdout.string).to include "To create a schema"
      expect(exitstatus).to eq 0
    end

    it 'is triggered by h, help' do
      stdout_h    = StringIO.new
      stdout_help = StringIO.new
      call argv: ['-h'],    stdout: stdout_h
      call argv: ['--help'], stdout: stdout_help
      expect(stdout_h.string).to_not be_empty
      expect(stdout_h.string).to eq stdout_help.string
    end
  end

  describe 'create' do
    it 'places the output in active-designer/index.html' do
      FileUtils.rm_rf ad_dir
      call argv: ['--create', schema_path], stdout: default_stdout
      expect(default_stdout.string).to_not include "y/n"
    end

    it 'creates the active-designer directory, regardless of whether it exists or not' do
      FileUtils.rm_rf ad_dir
      expect(Dir.exist? ad_dir).to eq false
      call argv: ['--create', schema_path]
      expect(Dir.exist? ad_dir).to eq true
      call argv: ['--create', schema_path]
      expect(Dir.exist? ad_dir).to eq true
    end

    describe 'when the file has not previously been generated' do
      it 'succeeds with a notification and no user prompt' do
        FileUtils.rm_rf ad_dir
        exitstatus = call argv: ['--create', schema_path], stdout: default_stdout
        expect(exitstatus).to eq 0
        expect(default_stdout.string).to include 'Created'
        expect(default_stdout.string).to_not include "y/n"
        expect(File.exist? output_path).to eq true
      end
    end

    describe 'when the file has previously been generated' do
      let(:old_body) { "the old file body that will be overwritten" }

      before { Dir.mkdir ad_dir unless Dir.exist? ad_dir }
      before { File.write output_path, old_body }

      describe 'when the user wants to override the old results' do
        let! :status do
          call argv: ['--create', schema_path],
               stdin: StringIO.new("blah\ny\n"),
               stdout: default_stdout,
               stderr: default_stderr
        end

        it 'prompts them until they enter "y" for yes' do
          prompts = default_stdout.string.scan %r(y/n)
          expect(prompts.length).to eq 2 # "blah", "y"
        end

        it 'prints a success message, to stdout' do
          expect(default_stdout.string).to include "Created"
        end

        it 'does not print a failure message to stderr' do
          expect(default_stderr.string).to_not include "Aborted"
        end

        it 'exits with a success exit status' do
          expect(status).to eq 0
        end

        it 'overwrites the file' do
          expect(File.read output_path).to_not eq old_body
        end
      end


      describe 'when the user does NOT want to override the old results' do
        let! :status do
          call argv: ['--create', schema_path],
               stdin: StringIO.new("blah\nblah\nn\nblah"),
               stdout: default_stdout,
               stderr: default_stderr
        end

        it 'prompts them until they enter "n" for no' do
          prompts = default_stdout.string.scan %r(y/n)
          expect(prompts.length).to eq 3 # "blah", "blah", "n"
        end

        it 'does not print a success message, to stdout' do
          expect(default_stdout.string).to_not include "Created"
        end

        it 'prints a failure message to stderr' do
          expect(default_stderr.string).to include "Aborted"
        end

        it 'exits with a failure exit status' do
          expect(status).to eq 1
        end

        it 'overwrites the template' do
          expect(File.read output_path).to eq old_body
        end
      end
    end

    context 'when the schema.rb path does not exist' do
      it 'prints a helpful error and exits unsuccessfully' do
        path   = "missing-path"
        status = call argv: ['--create', path], stderr: default_stderr
        expect(default_stderr.string).to include '"missing-path"'
        expect(status).to eq 1
      end
    end

    describe 'when the schema.rb path is not provided' do
      it 'prints a helpful error and exits unsuccessfully' do
        status = call argv: ['--create'], stderr: default_stderr
        expect(default_stderr.string).to match /no path was provided/i
        expect(status).to eq 1
      end
    end
  end

  describe 'otherwise it reports an error and exits with a failure status' do
    specify 'when there are no args in argv' do
      exitstatus = call argv: [], stderr: default_stderr
      expect(default_stderr.string).to match /no command was provided/i
      expect(exitstatus).to eq 1
    end

    specify 'when the command is not known' do
      exitstatus = call argv: ['notathing'], stderr: default_stderr
      expect(default_stderr.string).to include '"notathing"'
      expect(exitstatus).to eq 1
    end
  end
end
