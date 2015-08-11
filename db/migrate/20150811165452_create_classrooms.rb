class CreateClassrooms < ActiveRecord::Migration
  def change
    create_table :classrooms do |t|
    	t.integer :width, null: false
    	t.integer :height, null: false
    	t.integer :subject_id, null: false
      t.timestamps null: false
    end

  end
end
