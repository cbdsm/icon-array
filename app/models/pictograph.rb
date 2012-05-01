class Pictograph < ActiveRecord::Base
  has_many :risks, :dependent => :destroy, :order => "position ASC"
  
  accepts_nested_attributes_for :risks
  
  after_initialize :set_attr
  
  attr_accessor :legend_width
    
  def cells
    rows * cols
  end
  
  def axis_line_height
    (axis_font_size * 1.5).round
  end
  
  def axis_width
    axis_font_size * 4
  end
  
  def table_width
    (cell_width  * cols) + (cell_spacing * (cols - 1)) + axis_width + (cols * 2)
  end
  
  def axis_margin_top
    ((cell_height + axis_line_height + cell_spacing) / 2).round
  end
  
  def export_width
    out = table_width + axis_width
    out += legend_width if show_legend?
    return out
  end
  
  def bottom_axis_margin_top
    (cell_spacing + axis_line_height).round
  end
  
  def show_legend?
    self.risks.collect(&:display).include? true
  end
  
  def off_value
    # we can't use the 'on' scope yet--because these often haven't been saved
    cells - risks.collect{|r| r.value.to_f }.sum
  end
  
  private
    def set_attr
      @legend_width = 410
    end
  
end
