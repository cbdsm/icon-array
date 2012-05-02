class ChangeDefaultPictoSize < ActiveRecord::Migration
  def up
    change_column :pictographs, :cell_width, :integer, :default => 22
    change_column :pictographs, :cell_height, :integer, :default => 40
  end

  def down
    change_column :pictographs, :cell_width, :integer, :default => 25
    change_column :pictographs, :cell_height, :integer, :default => 45
  end
end
