class Student < ActiveRecord::Base
	validates :name, :gender, presence: true
	validates :section, presence:true

	belongs_to :section
	has_many :seat_assignments

end
