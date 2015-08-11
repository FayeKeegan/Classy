class Section < ActiveRecord::Base
	validates :name, presence: true
	validates :subject, presence: true
	
	has_many :students
	belongs_to :subject
end
