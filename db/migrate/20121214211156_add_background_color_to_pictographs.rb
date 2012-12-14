class AddBackgroundColorToPictographs < ActiveRecord::Migration
  def change
    add_column :pictographs, :background_color, :string, :default => '#ffffff'
  end
end
