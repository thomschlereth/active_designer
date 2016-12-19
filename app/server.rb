require 'sinatra/base'
require 'json'
require 'pry'
require './app/poros/schema-creator'

class Server < Sinatra::Base

  get '/' do
    erb :home
  end

  get '/new' do
    @schema = JSON.parse(params["schema"], :symbolize_names => true)
    erb :new
  end

  get '/load' do
    erb :load
  end

  post '/schema.json' do
    content_type :json
    schema = SchemaCreator.new
    schema.input(params["string"])
    schema.output.to_json
  end

end
