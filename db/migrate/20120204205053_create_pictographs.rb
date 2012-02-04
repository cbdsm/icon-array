class CreatePictographs < ActiveRecord::Migration
  def change
    create_table :pictographs do |t|
      t.string :title
      t.decimal :risk
      t.decimal :incremental_risk, :default => 0.0
      t.decimal :reduced_risk, :default => 0.0
      t.string :risk_color, :default => '#0000FF'
      t.string :incremental_risk_color, :default => '#64beff'
      t.string :reduced_risk_color, :default => '#0000FF'
      t.string :off_color, :default => '#DCDCDC'
      t.integer :cell_width, :default => 25
      t.integer :cell_height, :default => 45
      t.integer :cell_spacing, :default => 5
      t.integer :cols, :default => 10
      t.integer :rows, :default => 10
      t.boolean :axis_labels, :default => true
      t.string :axis_position, :default => 'left'
      t.string :axis_font, :default => 'Arial'
      t.integer :axis_font_size, :default => '12'
      t.integer :axis_width, :default => 50

      t.timestamps
    end
  end
end
