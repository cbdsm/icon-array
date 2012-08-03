Rails.application.config.middleware.use Rack::CanonicalHost do
  case ENV['RACK_ENV'].to_sym
    #make sure this is in your dns or /etc/hosts file
    # when :development then 'lvh.me:3000' 
    # when :staging then 'staging.iconarray.com'
    # when :production then 'www.iconarray.com'
  end
end