class AddStudentFirstAndLastName < ActiveRecord::Migration
  def change

  	remove_column :students, :name
  	add_column :students, :first_name, :string
  	add_column :students, :last_name, :string
  end
end
