class CreateRisks < ActiveRecord::Migration
  def change
    create_table :risks do |t|
      t.integer :pictograph_id
      t.string :hex
      t.decimal :value
      t.string :icon_file_name
      t.integer :icon_file_size
      t.string :icon_content_type
      t.datetime :icon_updated_at
      t.integer :position

      t.timestamps
    end
  end
end
