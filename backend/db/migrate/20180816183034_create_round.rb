class CreateRound < ActiveRecord::Migration[5.2]
  def change
    create_table :rounds do |t|
      t.references :player, foreign_key: true
      t.references :score, foreign_key: true
    end
  end
end
