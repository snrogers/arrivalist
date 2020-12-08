class Api::V1::TripsController < Api::V1Controller
  def index
    @trips = <<~HEREDOC
        line 1
        line 2
        line 3
        HEREDOC

    render json: @trips
  end
end
