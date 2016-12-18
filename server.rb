require 'sinatra/base'

class Server < Sinatra::Base

  get '/' do
    # File.read('./index.html.erb')
    erb :index
  end

end
