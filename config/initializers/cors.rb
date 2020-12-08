Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # UNSAFE
    resource '*',
      credentials: false,
      headers: :any,
      methods: :any
  end
end
