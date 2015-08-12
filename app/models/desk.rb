class Desk < ActiveRecord::Base
	validates :row, :column, presence: true
	validates :classroom, presence: true

	belongs_to :classroom
	has_many :seat_assignments
end
