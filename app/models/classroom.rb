class Classroom < ActiveRecord::Base
	validates :width, :height, presence: true
	validates :subject, presence: true

	belongs_to :subject

end
