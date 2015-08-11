class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
    	t.string :name, null: false
    	t.integer :subject_id, null: false
      t.timestamps null: false
    end
  	
  	add_index :sections, :subject_id

  end
end
