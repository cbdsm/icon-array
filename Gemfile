source 'https://rubygems.org'
ruby '1.9.3'

gem 'rails', '3.2.11'
# gem 'heroku' # deprecated
# gem 'thin'
gem 'puma'

gem "aws-sdk"
gem 'paperclip'
gem 'acts_as_list'
gem 'imgkit'
gem 'mini_magick'
gem 'rack-canonical-host'
gem "deep_merge", :require => 'deep_merge/rails_compat'
gem 'bitly'

group :production do
	gem "pg"
	gem "rails_12factor"
end

group :development do
	gem 'mysql2', "~> 0.3.11"
	gem 'quiet_assets'
end


# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'libv8', '~> 3.11.8'
  # gem 'therubyracer'

  gem 'uglifier', '>= 1.0.3'
  
end
gem 'jquery-ui-rails', '>=2.0.2'
gem 'jquery-rails', '>=2.0.2'
gem 'jquery-cookie-rails'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'
