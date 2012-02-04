# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120204205053) do

  create_table "pictographs", :force => true do |t|
    t.string   "title"
    t.decimal  "risk",                   :precision => 10, :scale => 0
    t.decimal  "incremental_risk",       :precision => 10, :scale => 0, :default => 0
    t.decimal  "reduced_risk",           :precision => 10, :scale => 0, :default => 0
    t.string   "risk_color",                                            :default => "#0000FF"
    t.string   "incremental_risk_color",                                :default => "#64beff"
    t.string   "reduced_risk_color",                                    :default => "#0000FF"
    t.string   "off_color",                                             :default => "#DCDCDC"
    t.integer  "cell_width",                                            :default => 25
    t.integer  "cell_height",                                           :default => 45
    t.integer  "cell_spacing",                                          :default => 5
    t.integer  "cols",                                                  :default => 10
    t.integer  "rows",                                                  :default => 10
    t.boolean  "axis_labels",                                           :default => true
    t.string   "axis_position",                                         :default => "left"
    t.string   "axis_font",                                             :default => "Arial"
    t.integer  "axis_font_size",                                        :default => 12
    t.integer  "axis_width",                                            :default => 50
    t.datetime "created_at",                                                                   :null => false
    t.datetime "updated_at",                                                                   :null => false
  end

end
