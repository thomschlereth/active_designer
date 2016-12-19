require 'rubygems'
require 'bundler'

$: << File.dirname(__FILE__)
require 'app/server'
run Server.new
