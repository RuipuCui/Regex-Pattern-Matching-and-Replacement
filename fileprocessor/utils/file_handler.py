# fileprocessor/utils/file_handler.py

import pandas as pd

def read_uploaded_file(file_obj):
    """
    Reads a file-like object (CSV or Excel) and returns a Pandas DataFrame.
    """
    filename = file_obj.name.lower()
    if filename.endswith('.csv'):
        return pd.read_csv(file_obj)
    elif filename.endswith('.xlsx') or filename.endswith('.xls'):
        return pd.read_excel(file_obj)
    else:
        raise ValueError("Unsupported file format. Please upload a CSV or Excel file.")
