class Api::V1::TripsController < Api::V1Controller
  def index
    home_state = params[:home_state]
    trip_date_min = params[:trip_date_min]
    trip_date_max = params[:trip_date_max]

    trips = Trip.all.order(trip_date: :asc)
    trips = trips.where(home_state: home_state) if home_state.present?
    trips = trips.where(trip_date: trip_date_min..) if trip_date_min.present?
    trips = trips.where(trip_date: ..trip_date_max) if trip_date_max.present?

    render json: trips
  end
end
