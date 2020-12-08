require 'open-uri'
require 'json'


class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      t.datetime :trip_date
      t.string :home_state
      t.integer :trip_count

      t.timestamps
    end

    open('https://arrivalist-puzzles.s3.amazonaws.com/national_travel.json') do |response|
      data = []

      responseJson = JSON.parse(response)

      trips = responseJson['data']
      trips.each do |trip|
        data << trip
      end

      Trip.create!(data)
    end

  end
end
