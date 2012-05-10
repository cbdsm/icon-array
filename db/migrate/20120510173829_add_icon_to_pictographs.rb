class AddIconToPictographs < ActiveRecord::Migration
  def change
    add_column :pictographs, :icon, :string

  end
end
