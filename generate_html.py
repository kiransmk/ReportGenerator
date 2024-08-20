import pandas as pd
from jinja2 import Environment, FileSystemLoader
import sys
import re
from collections import defaultdict
import mimetypes
from datetime import datetime

# Define MIME type to language mapping
mime_to_language = {
    'text/x-python': 'python',
    'text/javascript': 'javaScript',
    'text/html': 'html',
    'text/css': 'CSS',
    'text/csv': 'csv',
    'application/java-archive': 'Java',
    'text/x-csrc': 'C',
    'text/x-c++src': 'C++',
    'application/json': 'JSON',
    'application/xml': 'XML',
    'text/markdown': 'Markdown',
    # Add more mappings as needed
}

def read_csv_to_object(input_csv):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(input_csv)
    
    # Convert DataFrame to a list of dictionaries
    data = df.to_dict(orient='records')
    return data

def get_language_from_path(file_path):
    # Get the MIME type
    mime_type, _ = mimetypes.guess_type(file_path)

    # Map MIME type to language
    return mime_to_language.get(mime_type, 'code')

def highlight_matching_string(data):
    # Add <mark> around the matching string in each line
    for row in data:
        searchKey = row['flagKey']
        row['lines'] = re.sub(f'({re.escape(searchKey)})', r'<mark>\1</mark>', row['lines'], flags=re.IGNORECASE)
        row['language'] = get_language_from_path(row['path'])
    return data

def group_by_flagKey(data):
    grouped_data = defaultdict(list)
    for row in data:
        if row['language'] != 'csv':
            grouped_data[row['flagKey']].append(row)
    return grouped_data

def generate_html(data, output_html, repoName, branchName):
    # Load the Jinja2 template
    env = Environment(loader=FileSystemLoader('.'))
    template = env.get_template('template.html')

    # Create a timestamp
    timestamp = datetime.now().strftime("%B %d, %Y at %I:%M %p")

    # Render the template with the data
    html_content = template.render(data=data, timestamp=timestamp, repoName=repoName, branchName=branchName)

    # Write the HTML content to a file
    with open(output_html, 'w') as file:
        file.write(html_content)

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python generate_html.py <input_csv> <output_html> repoName branchName")
    else:
        input_csv = sys.argv[1]
        output_html = sys.argv[2]
        repoName = sys.argv[3]
        branchName = sys.argv[4]
        
        # Read CSV data into an object
        data = read_csv_to_object(input_csv)
        
        # Highlight matching strings in the data
        data = highlight_matching_string(data)

        # Group data by flagKey
        grouped_data = group_by_flagKey(data)

        # Generate HTML using the data
        generate_html(grouped_data, output_html, repoName, branchName)
