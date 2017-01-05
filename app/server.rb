require 'sinatra/base'
require 'json'
require 'pry'
require './app/poros/schema-creator'

class Server < Sinatra::Base

  get '/' do
    erb :home
  end

  get '/new' do
    if params["schema"]
      @schema = JSON.parse(params["schema"], :symbolize_names => true)
    end
    erb :new
  end

  get '/load' do
    erb :load
  end

  post '/schema.json' do
    content_type :json
    schema = SchemaCreator.new
    # binding.pry
    schema.format(params["string"]).to_json
    # s = schema.output.to_json
  end

end
