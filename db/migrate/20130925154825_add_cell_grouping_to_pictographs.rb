class AddCellGroupingToPictographs < ActiveRecord::Migration
  def change
    add_column :pictographs, :cell_grouping, :string, :default => 'normal'
  end
end
