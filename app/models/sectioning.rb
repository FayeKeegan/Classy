class Sectioning < ActiveRecord::Base
	validates :student, :section, presence: true

	belongs_to :student
	belongs_to :section
end
