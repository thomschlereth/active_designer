module ActiveDesigner
  class SchemaCreator

    attr_reader :output

    def format(schema)
      schema = delete_comments(schema.split("\n"))
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
      reference_index = 100
      table_id = nil
      schema.each do |line|
        if line.include?("create_table")
          table_index += 1
          column_index = 100
          reference_index = 100
          table_name = format_name(line)
          table_id = "tbl-" + table_index.to_s
          tables[table_id] = {
            name: table_name,
            original_name: table_name,
            status: { original: true, modified: false, new: false, deleted: false },
            columns: {},
            references: {},
            id: table_id
          }
        elsif line.include?("t.")
          column_name = format_name(line)
          if !column_name.include?('_id')
            column_index += 1
            column_type = format_type(line)
            column_id = "col-#{table_index.to_s}-#{column_index.to_s}"
            tables[table_id][:columns][column_id] = {
              name: column_name,
              original_name: column_name,
              type: column_type,
              original_type: column_type,
              id: column_id,
              status: { original: true, new: false, modified: false, deleted: false }
            }
          end
        elsif line.include?("add_foreign_key")
          reference_index += 1
          components = line.split(" ")
          table_name = components[1].delete("\",")
          foreign_table_name = components[2].delete("\"")
          table_id = ""
          foreign_table_id = ""
          tables.each do |table|
            table_id = table[0] if table[1][:name] == table_name
            foreign_table_id = table[0] if table[1][:name] == foreign_table_name
          end
          reference_id = "ref-#{table_id.split('-')[1]}-#{reference_index}"
          tables[table_id][:references][reference_id] = {
            id: reference_id,
            table_id: table_id,
            foreign_table_name: foreign_table_name,
            foreign_table_id: foreign_table_id,
            status: { original: true, new: false, deleted: false }
          }
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
end
