# Pandas User Guide 
[Pandas](https://pandas.pydata.org/docs/index.html) is a popular data analysis framework for Python. This example project shows how you can use Awareness to ask questions over the documentation for a large and complex tool like this.

## Project Dataset
The dataset for this project is the latest version of the [Pandas User Guide](https://pandas.pydata.org/docs/user_guide/index.html). As of July 2024, they're on version 2.2.2 and the documentation is about 680k tokens in size. Here are the links to the individual sections:

```
https://pandas.pydata.org/docs/user_guide/10min.html
https://pandas.pydata.org/docs/user_guide/dsintro.html
https://pandas.pydata.org/docs/user_guide/basics.html
https://pandas.pydata.org/docs/user_guide/io.html
https://pandas.pydata.org/docs/user_guide/pyarrow.html
https://pandas.pydata.org/docs/user_guide/indexing.html
https://pandas.pydata.org/docs/user_guide/advanced.html
https://pandas.pydata.org/docs/user_guide/copy_on_write.html
https://pandas.pydata.org/docs/user_guide/merging.html
https://pandas.pydata.org/docs/user_guide/reshaping.html
https://pandas.pydata.org/docs/user_guide/text.html
https://pandas.pydata.org/docs/user_guide/missing_data.html
https://pandas.pydata.org/docs/user_guide/duplicates.html
https://pandas.pydata.org/docs/user_guide/categorical.html
https://pandas.pydata.org/docs/user_guide/integer_na.html
https://pandas.pydata.org/docs/user_guide/boolean.html
https://pandas.pydata.org/docs/user_guide/visualization.html
https://pandas.pydata.org/docs/user_guide/style.html
https://pandas.pydata.org/docs/user_guide/groupby.html
https://pandas.pydata.org/docs/user_guide/window.html
https://pandas.pydata.org/docs/user_guide/timeseries.html
https://pandas.pydata.org/docs/user_guide/timedeltas.html
https://pandas.pydata.org/docs/user_guide/options.html
https://pandas.pydata.org/docs/user_guide/enhancingperf.html
https://pandas.pydata.org/docs/user_guide/scale.html
https://pandas.pydata.org/docs/user_guide/sparse.html
https://pandas.pydata.org/docs/user_guide/gotchas.html
https://pandas.pydata.org/docs/user_guide/cookbook.html
```

## Example Questions & Answers
To evaluate the projects dataset we're going to use GPT-4o. The example Q&A pairs below are as of early July 2024 and cost around $3.00 per query.

---
**QUESTION:** i'm an experienced typescript developer that's new to both python and pandas. get me started \
**ANSWER:** \
Welcome to the world of Python and pandas! As an experienced TypeScript developer, you'll find some similarities and differences in how you work with data. Here's a quick guide to get you started with pandas:

### 1. Installation
First, ensure you have pandas installed. You can install it using pip:
```bash
pip install pandas
```

### 2. Basic Data Structures
Pandas primarily uses two data structures: `Series` and `DataFrame`.

- **Series**: A one-dimensional labeled array capable of holding any data type.
- **DataFrame**: A two-dimensional labeled data structure with columns of potentially different types.

### 3. Creating Data Structures
Here's how you can create a `Series` and a `DataFrame`:

```python
import pandas as pd

# Creating a Series
s = pd.Series([1, 2, 3, 4, 5])

# Creating a DataFrame
data = {
    'A': [1, 2, 3, 4],
    'B': [5, 6, 7, 8]
}
df = pd.DataFrame(data)
```

### 4. Viewing Data
You can quickly view your data using `head()` and `tail()` methods:

```python
print(df.head())  # View the first 5 rows
print(df.tail())  # View the last 5 rows
```

### 5. Selecting Data
You can select data by label or by position:

- **By Label**:
  ```python
  print(df.loc[0])  # Select the first row
  print(df['A'])    # Select column 'A'
  ```

- **By Position**:
  ```python
  print(df.iloc[0])  # Select the first row
  print(df.iloc[:, 0])  # Select the first column
  ```

### 6. Boolean Indexing
You can filter data using boolean indexing:

```python
print(df[df['A'] > 2])  # Select rows where column 'A' is greater than 2
```

### 7. Handling Missing Data
Pandas provides several methods to handle missing data:

```python
df.dropna()  # Drop rows with missing values
df.fillna(0)  # Fill missing values with 0
```

### 8. Aggregation and Grouping
You can perform aggregation and grouping operations:

```python
grouped = df.groupby('A')
print(grouped.sum())  # Sum of each group
```

### 9. Applying Functions
You can apply functions to your data:

```python
df['A'] = df['A'].apply(lambda x: x * 2)  # Apply a lambda function to column 'A'
```

### 10. Working with Dates
Pandas has strong support for date and time data:

```python
df['date'] = pd.to_datetime(['2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04'])
print(df['date'].dt.year)  # Extract the year from the date column
```

### 11. Merging and Concatenating
You can merge and concatenate DataFrames:

```python
df1 = pd.DataFrame({'key': ['A', 'B', 'C'], 'value': [1, 2, 3]})
df2 = pd.DataFrame({'key': ['A', 'B', 'D'], 'value': [4, 5, 6]})

# Merge DataFrames
merged_df = pd.merge(df1, df2, on='key', how='inner')

# Concatenate DataFrames
concatenated_df = pd.concat([df1, df2])
```

### 12. Exporting Data
You can export your DataFrame to various formats:

```python
df.to_csv('data.csv')  # Export to CSV
df.to_excel('data.xlsx')  # Export to Excel
```

### 13. Additional Resources
For more detailed information, you can refer to the "10 minutes to pandas" guide available at: [10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html).

This should give you a solid foundation to start working with pandas. Happy coding!

---
**QUESTION:** i have an excel file that i'd like to render as a pie chart. tell me how to do that using pandas \
**ANSWER:** \
To render a pie chart from an Excel file using pandas, follow these steps:

1. **Import the necessary libraries**:
   ```python
   import pandas as pd
   ```

2. **Read the Excel file into a DataFrame**:
   ```python
   df = pd.read_excel('your_file.xlsx')
   ```

3. **Plot the pie chart**:
   ```python
   df.plot(kind='pie', y='column_name')
   ```

Here's a complete example:

```python
import pandas as pd

# Read the Excel file into a DataFrame
df = pd.read_excel('your_file.xlsx')

# Plotting a pie chart for a specific column
df.plot(kind='pie', y='column_name')
```

Make sure to replace `'your_file.xlsx'` with the path to your Excel file and `'column_name'` with the name of the column you want to visualize as a pie chart.

For more details on plotting with pandas, you can refer to the pandas documentation on visualization.

---
**QUESTION:** give me a summary of how visualization works in  \
**ANSWER:** \
Visualization in pandas involves using various methods to create and customize plots and tables from data stored in Series and DataFrame objects. Here’s a summary of how visualization works in pandas:

### Plotting with pandas
1. **Basic Plotting**:
   - Use the `plot` method on Series and DataFrame objects, which is a wrapper around `plt.plot()` from the matplotlib library.
   - The `kind` keyword argument specifies the type of plot, such as 'line', 'bar', 'hist', 'box', 'kde', 'area', 'scatter', 'hexbin', and 'pie'.
   - Additional plotting methods like `DataFrame.hist()` and `DataFrame.boxplot()` provide interfaces for specific plot types.

2. **Advanced Plotting**:
   - pandas includes functions in `pandas.plotting` for advanced visualizations like Scatter Matrix, Andrews Curves, Parallel Coordinates, Lag Plot, Autocorrelation Plot, Bootstrap Plot, and RadViz.
   - Error bars can be added using the `xerr` and `yerr` keyword arguments in `plot()`.
   - Tables can be plotted using the `table` keyword in `DataFrame.plot()` and `Series.plot()`.

3. **Customization**:
   - Customize plots with keyword arguments for layout and formatting, such as `legend`, `xlabel`, `ylabel`, `logy`, `secondary_y`, `subplots`, and `layout`.
   - Colormaps can be used to enhance visual distinction in plots with many columns.
   - For more complex customizations, Series and DataFrame objects can be passed directly to Matplotlib functions.

4. **Interactive and Backend Support**:
   - pandas integrates well with Jupyter notebooks for interactive plotting.
   - Third-party plotting backends can be used by setting the `backend` argument in the `plot` function or globally.

### Table Visualization with Styler
1. **Styler Class**:
   - The `Styler` class is used for customizing the display of DataFrames, supporting output to HTML, LaTeX, String, and Excel formats.
   - Methods like `.format()`, `.format_index()`, and `.relabel_index()` allow for formatting values and headers.
   - Styles can be applied using `.set_table_styles()`, `.set_td_classes()`, `.apply()`, and `.map()`.

2. **Custom CSS and Styling**:
   - Custom CSS styles can be added using `.set_table_styles()`, `.set_td_classes()`, and `.set_table_attributes()`.
   - Built-in styling functions include `.highlight_null`, `.highlight_min`, `.highlight_max`, `.highlight_between`, `.background_gradient`, `.text_gradient`, and `.bar`.

3. **Optimization and Efficiency**:
   - For large DataFrames, optimization techniques include removing unnecessary HTML and using table styles for efficient CSS application.
   - Styles can be exported from one DataFrame and applied to another using `df1.style.export()` and `df2.style.use(style1.export())`.

4. **Interactive Features**:
   - The `Styler` class interacts well with widgets, allowing for interactive adjustments to the color palette.
   - The `magnify` function allows for customization of table styles, including hover effects.

### Documentation and Resources
- The pandas user guide provides detailed sections on "Chart visualization" and "Table Visualization".
- Additional resources and examples are available in the pandas documentation and various online guides.

By leveraging these tools and methods, pandas enables comprehensive and customizable data visualization, making it easier to analyze and present data effectively.

---
**QUESTION:** list all of the file types pandas can import. can all of those file types be exported to? \
**ANSWER:** \
Pandas can import data from the following file types:

1. CSV & text files
2. JSON
3. HTML
4. LaTeX
5. XML
6. Excel files (`.xlsx`, `.xlsm`, `.xls`, `.xlsb`)
7. OpenDocument Spreadsheets (`.ods`)
8. Binary Excel files (`.xlsb`)
9. Calamine (Excel and ODS files)
10. Clipboard
11. Pickling
12. HDF5 (PyTables)
13. Feather
14. Parquet
15. ORC
16. SQL queries
17. Google BigQuery
18. Stata format
19. SAS formats
20. SPSS formats
21. netCDF

Not all of these file types can be exported to. Pandas can export data to the following file types:

1. CSV
2. JSON
3. HTML
4. LaTeX
5. XML
6. Excel files (`.xlsx`, `.xlsm`, `.xls`)
7. OpenDocument Spreadsheets (`.ods`)
8. Clipboard
9. Pickling
10. HDF5 (PyTables)
11. Feather
12. Parquet
13. ORC
14. SQL queries
15. Google BigQuery
16. Stata format

Pandas cannot export to binary Excel files (`.xlsb`), SAS formats, or SPSS formats.
