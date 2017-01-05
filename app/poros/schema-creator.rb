class SchemaCreator

  attr_reader :output

  def input(string)
    schema = string.split("\n")
    schema = delete_comments(schema)
    @references = []
    tables = create_tables(schema)
    references = create_references
    @output = {
      "references" => references,
      "tables" => tables
    }
  end

  def delete_comments(schema)
    t = schema.map do |line|
      line = line.strip
      line if line[0] != "#" && !line.empty?
    end.compact
  end

  def create_tables(schema)
    # tables = []
    tables = {}
    table_name = ""
    schema.each do |line|
      if line.include?("create_table")
        table_name = format_name(line)
        tables[table_name] = { "columns" => {} }
      elsif line.include?("t.")
        type = format_type(line)
        name = format_name(line)
        tables[table_name]["columns"][name] = type
      elsif line.include?("add_foreign_key")
        @references << parts = line.split(" ")
      end
    end
    tables
  end

  def create_references
    references = []
    @references.map do |reference|
      table = reference[1].delete(",")
      foreign_key = reference[2]
      references << {
        "table" => table,
        "foreign_key" => foreign_key
      }
    end
    references
  end

  def format_name(line)
    name = line.split(" ")[1].delete("\",")
  end

  def format_type(line)
    line.split(" ")[0].split(".")[1]
  end
end
