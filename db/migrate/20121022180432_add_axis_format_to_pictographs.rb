class AddAxisFormatToPictographs < ActiveRecord::Migration
  def change
    add_column :pictographs, :axis_format, :string, :default => '%n ---'

  end
end
