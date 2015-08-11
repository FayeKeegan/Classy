class CreateSubjects < ActiveRecord::Migration
  def change
    create_table :subjects do |t|
    	t.string :name, null: false
    	t.integer :teacher_id, null: false
      t.timestamps null: false
    end

  	add_index :subjects, :teacher_id

  end
end
