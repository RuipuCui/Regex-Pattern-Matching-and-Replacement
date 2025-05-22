# fileprocessor/utils/regex_processor.py

import re

def apply_regex(df, column, pattern, replacement):
    if column not in df.columns:
        raise ValueError(f"Column '{column}' not found in data.")
    df[column] = df[column].astype(str).apply(lambda x: re.sub(pattern, replacement, x))
    return df
