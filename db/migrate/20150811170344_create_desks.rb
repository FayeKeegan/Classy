class CreateDesks < ActiveRecord::Migration
  def change
    create_table :desks do |t|
    	t.integer :row, null: false
    	t.integer :column, null: false
    	t.integer :classroom_id, null: false
      t.timestamps null: false
    end
  
  	add_index :desks, :classroom_id
  
  end

end
