class Icon < ActiveRecord::Base
  # has_many :pictographs
  has_many :picto_icons
  has_many :pictographs, :through => :picto_icons
  
  has_attached_file :image, 
                    # :path => ":rails_root/public/system/icons/:id/:style_:basename.:extension",
                    # :url => "/system/icons/:id/:style_:basename.:extension",
                    :styles => {:default => "25x45>", 
                                :large => "50x90>",
                                :print => "150x270>"},
                    :storage => :s3,
                    :s3_credentials => "#{Rails.root.to_s}/config/amazon_s3.yml",
                    :path => "icons/:id/:style_:basename.:extension",
                    :default_url => "/images/missing/:class_:style.png"

  validates_attachment_size :image, :less_than => 5.megabytes
  validates_attachment_content_type :image, :content_type => ['image/jpeg', 'image/png', 'image/gif']
    # should we also accept SVGs? Probably yes!
end
