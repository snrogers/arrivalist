require 'json'


# ----------------------------------------------------------------- #
# Seed Trips
# ----------------------------------------------------------------- #
Trip.delete_all

file = File.read('./db/national_travel.json')
trips = JSON.parse(file)['data']

Trip.create!(trips)
