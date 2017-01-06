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
    tables = []
    table_name = ""
    schema.each do |line|
      if line.include?("create_table")
        table_name = format_name(line)
        tables << { table_name: table_name,
                    columns: {},
                    references: [],
                    status: "original"
                  }
      elsif line.include?("t.")
        type = format_type(line)
        name = format_name(line)
        tables.last[:columns][name] = type
      elsif line.include?("add_foreign_key")
        parts = line.split(" ")
        table_name = parts[1].delete("\",")
        table = tables.find { |table| table[:table_name] == table_name }
        table[:references] << parts[2].delete("\"")
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
