class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      t.datetime :trip_date
      t.string :home_state
      t.integer :trip_count

      t.timestamps
    end

  end
end
