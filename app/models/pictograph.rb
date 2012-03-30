class Pictograph < ActiveRecord::Base
  has_many :risks, :dependent => :destroy, :order => "position ASC"
  
  accepts_nested_attributes_for :risks
    
  def cells
    rows * cols
  end
  
  def axis_line_height
    (axis_font_size * 1.5).round
  end
  
  def axis_width
    axis_font_size * 3
  end
  
  def table_width
    (cell_width  * cols) + (cell_spacing * (cols - 1)) + axis_width
  end
  
  def axis_margin_top
    ((cell_height + axis_line_height + cell_spacing) / 2).round
  end
  
  def bottom_axis_margin_top
    (cell_spacing + axis_line_height).round
  end
  
  def off_value
    # we can't use the 'on' scope yet--because these often haven't been saved
    cells - risks.collect{|r| r.value.to_f }.sum.to_i
  end
  
end
