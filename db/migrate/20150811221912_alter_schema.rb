class AlterSchema < ActiveRecord::Migration
  def change
  	remove_column :classrooms, :subject_id

    remove_column :sections, :subject_id
  	add_column :sections, :teacher_id, :integer
  	add_column :sections, :classroom_id, :integer

  	create_table :sectioning do |t|
    	t.integer :student_id, null: false
    	t.integer :student_section, null: false
      t.timestamps null: false
    end

    remove_column :seating_charts, :classroom_id
    add_column :seating_charts, :section_id, :integer

   	remove_column :students, :section_id
  end
end
