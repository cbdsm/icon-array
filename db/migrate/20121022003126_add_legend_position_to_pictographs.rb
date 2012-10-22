class AddLegendPositionToPictographs < ActiveRecord::Migration
  def change
    add_column :pictographs, :legend_position, :string, :default => 'right'

  end
end
