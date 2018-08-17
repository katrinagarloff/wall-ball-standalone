class CreateScore < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.integer :time
    end
  end
end
