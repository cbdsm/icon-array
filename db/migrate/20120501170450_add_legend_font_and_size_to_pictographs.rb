class AddLegendFontAndSizeToPictographs < ActiveRecord::Migration
  def change
    add_column :pictographs, :legend_font, :string, :default => 'Arial'
    add_column :pictographs, :legend_font_size, :integer, :default => 12
    rename_column :pictographs, :title_size, :title_font_size
  end
end
