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

ActiveRecord::Schema.define(:version => 20121022180432) do

  create_table "pictographs", :force => true do |t|
    t.string   "title"
    t.integer  "cell_width",       :default => 22
    t.integer  "cell_height",      :default => 40
    t.integer  "cell_spacing",     :default => 5
    t.integer  "cols",             :default => 10
    t.integer  "rows",             :default => 10
    t.boolean  "axis_labels",      :default => true
    t.string   "axis_position",    :default => "left"
    t.string   "axis_font",        :default => "Arial"
    t.integer  "axis_font_size",   :default => 12
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
    t.string   "title_font",       :default => "Helvetica"
    t.integer  "title_font_size",  :default => 18
    t.string   "title_alignment",  :default => "left"
    t.string   "legend_font",      :default => "Arial"
    t.integer  "legend_font_size", :default => 12
    t.string   "icon"
    t.boolean  "axis_endpoints",   :default => false
    t.string   "legend_position",  :default => "right"
    t.string   "axis_format",      :default => "%n ---"
  end

  create_table "risks", :force => true do |t|
    t.integer  "pictograph_id"
    t.string   "hex"
    t.decimal  "value",             :precision => 10, :scale => 2
    t.string   "icon_file_name"
    t.integer  "icon_file_size"
    t.string   "icon_content_type"
    t.datetime "icon_updated_at"
    t.integer  "position"
    t.datetime "created_at",                                                         :null => false
    t.datetime "updated_at",                                                         :null => false
    t.text     "description"
    t.string   "population"
    t.boolean  "display",                                          :default => true
  end

end
