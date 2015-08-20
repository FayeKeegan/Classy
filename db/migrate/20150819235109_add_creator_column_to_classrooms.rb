class AddCreatorColumnToClassrooms < ActiveRecord::Migration
  def change
  	add_column :classrooms, :user_id, :integer, null:false
  	add_index :classrooms, :user_id
  end
end
