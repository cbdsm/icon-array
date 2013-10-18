class Pictograph < ActiveRecord::Base
  has_many :risks, :dependent => :destroy, :order => "position ASC"
  
  accepts_nested_attributes_for :risks, :allow_destroy => true
  
  after_initialize :set_attr
  
  attr_accessor :legend_width, :print, :scale_width, :scale_height
  
  def self.icons
    # Dir.glob(Rails.root.to_s + '/app/assets/images/icons/*.png').collect{|i| i.gsub(Rails.root.to_s + '/app/assets/images/', '')}
    Dir.glob(Rails.root.to_s + '/public/images/icons/*.png').collect{|i| i.gsub(Rails.root.to_s + '/public/images/icons/', '')}
  end
    
  def self.legend_positions  
    %w[right below]
  end

  def self.cell_groupings  
    {:normal => "Standard Icon Array", :thousand => "Grouped cells (1000 unit)"}
  end

  def cells
    rows * cols
  end

  def thousand?
    cell_grouping == 'thousand'
  end

  def thousand_height
    (cell_height * 4) + (cell_spacing * 4)
  end
  
  def axis_line_height
    (axis_font_size * 1.5).round
  end
  
  def axis_width
    if axis_labels
      (axis_font_size / 2) * axis_format.length
    else
      0
    end
  end
  
  def table_width
    if thousand?
      (cell_width  * cols) + (cell_spacing * (cols - 1)) + axis_width
    else
      (cell_width  * cols) + (cell_spacing * (cols - 1)) + axis_width + (cols * 2)
    end
  end

  def table_height
    (cell_height  * rows) + (cell_spacing * (rows - 1))
  end
  
  def axis_margin_top
    if thousand?
      ((thousand_height + axis_line_height + cell_spacing) / 2).round
    else
      ((cell_height + axis_line_height + cell_spacing) / 2).round
    end
  end
  
  def axis_adjustment
    cell_spacing + cell_width
  end
  
  def export_width
    out = table_width + axis_width
    out += legend_width if show_legend? and legend_position != 'below'
    out += axis_adjustment if axis_width == 0 # export margin
    out += 30 if axis_width == 0 and legend_position == 'below'
    return out
  end
  
  def export_height
    out = table_height + 100 
    out += (50 * risks.length) if show_legend? and legend_position == 'below'
    return out
  end

  def bottom_axis_margin_top
    if thousand?
      out = (cell_spacing + axis_line_height).round + cell_height
    else
      out = (cell_spacing + axis_line_height).round
    end

    out -= cell_height if print
    return out
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
      @legend_width = legend_position == 'below' ? (table_width - 30) : 410
      @scale_width = legend_scale? ? cell_width : 16
      @scale_height = legend_scale? ? cell_height : 30
    end
  
end
