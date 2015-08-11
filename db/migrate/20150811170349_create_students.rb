class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
    	t.string :name, null: false
    	t.integer :section_id, null: false
    	t.integer :reading_level, null: false
    	t.integer :math_level, null: false
    	t.string :gender, null: false
      t.timestamps null: false
    end
  	
  	add_index :students, :section_id
  
  end
end
