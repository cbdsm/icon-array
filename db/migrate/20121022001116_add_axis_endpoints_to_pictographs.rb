class AddAxisEndpointsToPictographs < ActiveRecord::Migration
  def change
    add_column :pictographs, :axis_endpoints, :boolean, :default => false

  end
end
