class DropIcons < ActiveRecord::Migration
  def up
    drop_table :icons
    remove_column :pictographs, :risk_icon_id
    remove_column :pictographs, :incremental_risk_icon_id
    remove_column :pictographs, :reduced_risk_icon_id
    remove_column :pictographs, :off_icon_id
  end

  def down
    create_table :icons do |t|
      t.string :image_file_name
      t.integer :image_file_size
      t.string :image_content_type

      t.timestamps
    end
    
    add_column :pictographs, :risk_icon_id, :integer, :default => nil
    add_column :pictographs, :incremental_risk_icon_id, :integer, :default => nil
    add_column :pictographs, :reduced_risk_icon_id, :integer, :default => nil
    add_column :pictographs, :off_icon_id, :integer, :default => nil
  end
end
