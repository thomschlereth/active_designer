require 'sinatra/base'
require 'json'
require 'pry'
require './app/poros/schema-creator'

class Server < Sinatra::Base

  get '/' do
    erb :home
  end

  post '/new' do
    schema = SchemaCreator.new
    @tables = schema.format(params["schema"])
    erb :new
  end

  get '/load' do
    erb :load
  end

end
