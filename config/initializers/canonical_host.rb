# This is required to force Heroku to use our domain
# NOTE: If you have forked this gem from the original, you can comment this out, or use your own domains
Rails.application.config.middleware.use Rack::CanonicalHost do
  case ENV['RACK_ENV'].to_sym
    when :staging then 'staging.iconarray.com'
    when :production then 'www.iconarray.com'
  end
end