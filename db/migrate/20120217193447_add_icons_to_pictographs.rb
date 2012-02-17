class AddIconsToPictographs < ActiveRecord::Migration
  def change
    add_column :pictographs, :risk_icon_id, :integer, :default => nil

    add_column :pictographs, :incremental_risk_icon_id, :integer, :default => nil

    add_column :pictographs, :reduced_risk_icon_id, :integer, :default => nil

    add_column :pictographs, :off_icon_id, :integer, :default => nil

  end
end
