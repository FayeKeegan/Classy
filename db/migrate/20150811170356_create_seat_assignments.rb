class CreateSeatAssignments < ActiveRecord::Migration
  def change
    create_table :seat_assignments do |t|
    	t.integer :desk_id, null: false
    	t.integer :student_id, null: false
    	t.integer :seating_chart_id, null: false
      t.timestamps null: false
    end
  
  	add_index :seat_assignments, :seating_chart_id
  
  end
end
