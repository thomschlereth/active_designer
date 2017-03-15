# Active Designer

Active Designer is a gem that allows a user to easily create a visual format of their Active Record schema.rb file for an SQL database. With just one command from the command line, it creates an HTML file in the root of the user’s Ruby project. Active Designer is an easy to use Visual Interface that opens locally in the browser and works offline to CRUD tables and columns!

### Instructions

Install the gem.

`$ gem install active_designer`

This should output:

```
Successfully installed active_designer-1.1.4
Parsing documentation for active_designer-1.1.4
Done installing documentation for active_designer after 0 seconds
1 gem installed
```

From the root of your project run the command:

`$ active_designer --create pathway_to_db e.g(./db/schema.rb)`

```
Created active_designer/index.html
```

Now you are ready to open the file you just created

`$ open active_designer/index.html`


Have fun!

![ScreenShot](https://raw.github.com/thompickett/active_designer/master/example.png)
