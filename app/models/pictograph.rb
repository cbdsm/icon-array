class Pictograph < ActiveRecord::Base
  
  def axis_line_height
    (axis_font_size * 1.5).round
  end
  
  def axis_margin_top
    cell_height - ((axis_line_height / 2) + (cell_spacing / 2)).round
  end
  
  def bottom_axis_margin_top
    cell_height - (axis_line_height + (cell_spacing / 2)).round
  end
  
end
