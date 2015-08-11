class Section < ActiveRecord::Base
	validates :name, presence: true
	validates :subject

	belongs_to :subject
end
