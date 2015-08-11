class Subject < ActiveRecord::Base
	validates :name, presence: true

	belongs_to(
		:teacher, 
		class_name: "User",
		foreign_key: :teacher_id,
		primary_key: :id
	)

	has_many :sections
	has_one :classroom

end