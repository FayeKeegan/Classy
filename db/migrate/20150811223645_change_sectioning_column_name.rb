class ChangeSectioningColumnName < ActiveRecord::Migration
  def change
  	remove_column :sectioning, :student_section
  	add_column :sectioning, :section_id, :integer
  end
end
