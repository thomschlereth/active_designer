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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161126225745) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attachments", force: :cascade do |t|
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "product_style_id"
    t.index ["product_style_id"], name: "index_attachments_on_product_style_id", using: :btree
  end

  create_table "product_styles", force: :cascade do |t|
    t.integer "style_id"
    t.integer "product_id"
    t.integer "attachment_id"
    t.index ["attachment_id"], name: "index_product_styles_on_attachment_id", using: :btree
    t.index ["product_id"], name: "index_product_styles_on_product_id", using: :btree
    t.index ["style_id"], name: "index_product_styles_on_style_id", using: :btree
  end

  create_table "products", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "attachment_id"
    t.index ["attachment_id"], name: "index_products_on_attachment_id", using: :btree
  end

  create_table "styles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "attachments", "product_styles"
  add_foreign_key "product_styles", "attachments"
  add_foreign_key "product_styles", "products"
  add_foreign_key "product_styles", "styles"
  add_foreign_key "products", "attachments"
end
