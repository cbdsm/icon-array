class AddPopulationToRisks < ActiveRecord::Migration
  def change
    add_column :risks, :population, :string

  end
end
