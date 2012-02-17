class CreateIcons < ActiveRecord::Migration
  def change
    create_table :icons do |t|
      t.string :image_file_name
      t.integer :image_file_size
      t.string :image_content_type

      t.timestamps
    end
  end
end
