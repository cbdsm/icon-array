class Pictograph < ActiveRecord::Base
  has_many :risks, :dependent => :destroy, :order => "position ASC"
  
  accepts_nested_attributes_for :risks, :allow_destroy => true
  
  after_initialize :set_attr
  
  attr_accessor :legend_width, :print
  
  def self.icons
    # Dir.glob(Rails.root.to_s + '/app/assets/images/icons/*.png').collect{|i| i.gsub(Rails.root.to_s + '/app/assets/images/', '')}
    Dir.glob(Rails.root.to_s + '/public/images/icons/*.png').collect{|i| i.gsub(Rails.root.to_s + '/public/images/icons/', '')}
  end
    
  def self.legend_positions  
    %w[right below]
  end

  def cells
    rows * cols
  end
  
  def axis_line_height
    (axis_font_size * 1.5).round
  end
  
  def axis_width
    if axis_labels
      axis_font_size * axis_format.length
    else
      0
    end
  end
  
  def table_width
    (cell_width  * cols) + (cell_spacing * (cols - 1)) + axis_width + (cols * 2)
  end
  
  def axis_margin_top
    ((cell_height + axis_line_height + cell_spacing) / 2).round
  end
  
  def axis_adjustment
    cell_spacing + cell_width
  end
  
  def export_width
    out = table_width + axis_width
    out += legend_width if show_legend?
    out += axis_adjustment if axis_width == 0 # export margin
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
