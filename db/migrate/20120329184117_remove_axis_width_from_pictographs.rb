class RemoveAxisWidthFromPictographs < ActiveRecord::Migration
  def up
    remove_column :pictographs, 'axis_width'
    remove_column :pictographs, 'risk'
    remove_column :pictographs, 'reduced_risk'
    remove_column :pictographs, 'incremental_risk'
    remove_column :pictographs, 'risk_color'
    remove_column :pictographs, 'reduced_risk_color'
    remove_column :pictographs, 'incremental_risk_color'
    remove_column :pictographs, 'off_color'
  end

  def down    
    add_column :pictographs, 'axis_width', :integer, :default => 50
    add_column :pictographs, 'risk', :decimal
    add_column :pictographs, 'reduced_risk', :decimal, :default => 0.0
    add_column :pictographs, 'incremental_risk', :decimal, :default => 0.0
    add_column :pictographs, 'risk_color', :string, :default => '#0000FF'
    add_column :pictographs, 'reduced_risk_color', :string, :default => '#0000FF'
    add_column :pictographs, 'incremental_risk_color', :string, :default => '#64beff'
    add_column :pictographs, 'off_color', :string, :default => '#DCDCDC'
  end
end
