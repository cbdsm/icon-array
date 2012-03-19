class AddDescriptionToRisks < ActiveRecord::Migration
  def change
    add_column :risks, :description, :text

  end
end
