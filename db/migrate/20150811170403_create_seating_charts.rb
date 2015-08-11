class CreateSeatingCharts < ActiveRecord::Migration
  def change
    create_table :seating_charts do |t|
    	t.string :name, null:false
    	t.integer :classroom_id, null: false
      t.timestamps null: false
    end
  
  	add_index :seating_charts, :classroom_id
  
  end
end
