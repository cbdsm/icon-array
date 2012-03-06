class Risk < ActiveRecord::Base
  belongs_to :pictograph
  
  # acts_as_list :scope => :position
  
  scope :on, where("position != 0")
  scope :off, where("position = 0")
  
  has_attached_file :icon, 
                    # :path => ":rails_root/public/system/icons/:id/:style_:basename.:extension",
                    # :url => "/system/icons/:id/:style_:basename.:extension",
                    :styles => {:default => "25x45>", 
                                :large => "50x90>",
                                :print => "150x270>"},
                    :storage => :s3,
                    :s3_credentials => "#{Rails.root.to_s}/config/amazon_s3.yml",
                    :path => "icons/:id/:style_:basename.:extension",
                    :default_url => "/images/missing/:class_:style.png"

  validates_attachment_size :icon, :less_than => 5.megabytes
  validates_attachment_content_type :icon, :content_type => ['image/jpeg', 'image/png', 'image/gif']
    # should we also accept SVGs? Probably yes! 
    
  def self.random_hex
    r = rand(255)
    g = rand(255)
    b = rand(255)
    return '#' + r.to_s(16) + g.to_s(16) + b.to_s(16)
  end
  
end
