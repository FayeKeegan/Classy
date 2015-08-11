class Desk < ActiveRecord::Base
	validates :row, :col, presence: true
	validates :classroom, presence: true

	belongs_to :classroom
end
