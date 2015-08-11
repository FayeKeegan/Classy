class Classroom < ActiveRecord::Base
	validates :width, :height, presence: true
	validates :subject, presence: true

	belongs_to :subject
	has_many :seating_charts
	has_many :desks

end
