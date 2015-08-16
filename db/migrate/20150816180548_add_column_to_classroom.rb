class AddColumnToClassroom < ActiveRecord::Migration
  def change
  	add_column :classrooms, :name, :string
  end
end
