class AddLegendScaleToPictographs < ActiveRecord::Migration
  def change
    add_column :pictographs, :legend_scale, :boolean, :default => true
  end
end
