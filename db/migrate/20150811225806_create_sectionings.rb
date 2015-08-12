class CreateSectionings < ActiveRecord::Migration
  def change
    create_table :sectionings do |t|
    	t.integer :student_id, null: false
    	t.integer :section_id, null: false
      t.timestamps null: false
    end
  end
end
