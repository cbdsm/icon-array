class AddTitleAttributesToPictographs < ActiveRecord::Migration
  def change
    add_column :pictographs, :title_font, :string, :default => 'Helvetica'
    add_column :pictographs, :title_size, :integer, :default => 18
    add_column :pictographs, :title_alignment, :string, :default => 'left'

  end
end
