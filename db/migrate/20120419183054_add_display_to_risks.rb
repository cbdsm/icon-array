class AddDisplayToRisks < ActiveRecord::Migration
  def change
    add_column :risks, :display, :boolean, :default => true

  end
end
