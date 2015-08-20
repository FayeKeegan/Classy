class Section < ActiveRecord::Base
	validates :name, presence: true
	validates :teacher, presence: true
	
	belongs_to :classroom
	belongs_to(
		:teacher, 
		foreign_key: :teacher_id,
		class_name: "User",
		primary_key: :id
	)
	has_many :seating_charts, dependent: :destroy
	has_many :sectionings, dependent: :destroy
	has_many :students, through: :sectionings
end
