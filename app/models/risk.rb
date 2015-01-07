class Risk < ActiveRecord::Base
  belongs_to :pictograph
  
  acts_as_list :scope => :pictograph_id
  
  scope :on, where("position != 0")
  scope :off, where("position = 0")
  scope :displayed, where(:display => true)
  
  # after_initialize :init
  
  has_attached_file :icon, 
                    # :path => ":rails_root/public/system/icons/:id/:style_:basename.:extension",
                    # :url => "/system/icons/:id/:style_:basename.:extension",
                    :styles => {:default => "25x45>", 
                                :large => "50x90>",
                                :print => "150x270>"},
                    :storage => :s3,
                    :s3_credentials => {
                      :access_key_id => ENV['S3_KEY'],
                      :secret_access_key => ENV['S3_SECRET'],
                      :bucket => ENV['S3_BUCKET'],
                      :acl => 'public-read',
                      :max_file_size => 1073741824
                    },
                    :path => "icons/:id/:style_:basename.:extension",
                    :default_url => "/images/missing/:class_:style.png"

  validates_attachment_size :icon, :less_than => 5.megabytes
  validates_attachment_content_type :icon, :content_type => ['image/jpeg', 'image/png', 'image/gif']
  # should we also accept SVGs? Probably yes! 
         
  def self.random_hex
    out = '#'
    for i in 1..3
      x = rand(255).to_s(16)
      x = '0' + x if x.length < 2
      out += x
    end
    if out == '#ffffff'
      out = self.random_hex
    end
    return out
  end

  def decimal?
    if self.value.blank?
      false 
    else
      self.value % 1.0 != 0.0
    end
  end

  def decimal_value
    if self.value.blank?
      0.0
    else
      self.value - self.value.floor
    end
  end

  def thousand_value
    pictograph.thousand? ? (value / 4) : value
  end


  # private
  #   def init
  #     self.population ||= "out of #{self.pictograph.cells}"
  #   end

end
