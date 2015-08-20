class User < ActiveRecord::Base
	validates :username, :password_digest, :session_token, presence: true
	validates :password, length: { minimum: 6, allow_nil: true }

	validates :username, uniqueness: true
	has_many( 
		:sections,
		class_name: "Section",
		foreign_key: :teacher_id,
		primary_key: :id
	)
	has_many :classrooms
	has_many :sectionings, through: :sections
	has_many :students, through: :sectionings
	has_many :seating_charts, through: :sections

	attr_reader :password
	
	after_initialize :ensure_session_token

	def ensure_session_token
		self.session_token ||= SecureRandom.urlsafe_base64
	end

	def reset_session_token!
		self.session_token = SecureRandom.urlsafe_base64
		self.save!
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end
	
	def self.find_by_credentials(username, password)
		user = User.find_by_username(username)
		if user && user.is_password?(password)
			return user
		else
			return nil
		end
	end
end
