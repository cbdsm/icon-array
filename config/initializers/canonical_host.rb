Rails.application.config.middleware.use Rack::CanonicalHost do
  case ENV['RACK_ENV'].to_sym
    # when :development then 'lvh.me:3000' #make sure this is in your dns or /etc/hosts file
    # when :staging then 'staging.iconarray.com'
    # when :production then 'www.iconarray.com'
  end
end