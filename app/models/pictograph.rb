class Pictograph < ActiveRecord::Base
  has_many :colors, :dependent => :destroy, :order => "position ASC"
  has_many :picto_icons, :dependent => :destroy, :order => "position ASC"
  has_many :icons, :through => :picto_icons
  
  # belongs_to :risk_icon, :class_name => 'Icon'
  # belongs_to :incremental_risk_icon, :class_name => 'Icon'
  # belongs_to :reduced_risk_icon, :class_name => 'Icon'
  # belongs_to :off_icon, :class_name => 'Icon'
  # 
  # accepts_nested_attributes_for :risk_icon
  # accepts_nested_attributes_for :incremental_risk_icon
  # accepts_nested_attributes_for :reduced_risk_icon
  # accepts_nested_attributes_for :off_icon
  
  def axis_line_height
    (axis_font_size * 1.5).round
  end
  
  def axis_margin_top
    ((cell_height + axis_line_height + cell_spacing) / 2).round
  end
  
  def bottom_axis_margin_top
    (cell_spacing + axis_line_height).round
  end
  
end
