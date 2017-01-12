class SchemaCreator

  attr_reader :output

  def format(string)
    schema = delete_comments(string.split("\n"))
    create_tables(schema)
  end

  def delete_comments(schema)
    t = schema.map do |line|
      line = line.strip
      line if line[0] != "#" && !line.empty?
    end.compact
  end

  def create_tables(schema)
    tables = {}
    table_index = 100
    column_index = 100
    table_id = nil
    schema.each do |line|
      if line.include?("create_table")
        table_index += 1
        column_index = 100
        table_name = format_name(line)
        table_id = "tbl-" + table_index.to_s
        tables[table_id] = {
          name: table_name,
          original_name: table_name,
          status: "original",
          columns: {},
          references: [],
          id: table_id
        }
      elsif line.include?("t.")
        column_index += 1
        column_type = format_type(line)
        column_name = format_name(line)
        column_id = "col-#{table_index.to_s}-#{column_index.to_s}"
        tables[table_id][:columns][column_id] = {
          name: column_name,
          original_name: column_name,
          type: column_type,
          original_type: column_type,
          id: column_id,
          status: { original: true, new: false, modified: false }
        }
      elsif line.include?("add_foreign_key")
        parts = line.split(" ")
        table_name = parts[1].delete("\",")
        table = tables.find { |table| table[1][:name] == table_name }
        table[1][:references] << parts[2].delete("\"")
      end
    end
    tables
  end

  def format_name(line)
    name = line.split(" ")[1].delete("\",")
  end

  def format_type(line)
    line.split(" ")[0].split(".")[1]
  end
end
