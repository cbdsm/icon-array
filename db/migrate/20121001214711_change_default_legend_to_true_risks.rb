class ChangeDefaultLegendToTrueRisks < ActiveRecord::Migration
  def up
    change_column :risks, :display, :boolean, :default => true
  end

  def down
    change_column :risks, :display, :boolean, :default => false
  end
end
