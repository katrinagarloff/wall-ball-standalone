class Player < ApplicationRecord
  has_many :rounds
  has_many :scores, through: :rounds

end
