class SeatingChart < ActiveRecord::Base
	validates :name, presence: true
	validates :section, presence: true
	
	belongs_to :section
	has_many :students, through: :section
	has_many :seat_assignments

end
