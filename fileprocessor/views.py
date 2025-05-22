# fileprocessor/views.py

import os
import uuid
from django.conf import settings
from django.shortcuts import render
from .forms import UploadFileForm
from .utils.file_handler import read_uploaded_file
from .utils.regex_processor import apply_regex
from .utils.llm_integration import prompt_to_regex
import pandas as pd

def upload_file_view(request):
    table_html = None
    error = None
    download_link = None

    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = form.cleaned_data['file']
            natural_prompt = form.cleaned_data['natural_prompt']
            replacement_value = form.cleaned_data['replacement_value']
            try:
                df = read_uploaded_file(uploaded_file)

                # Stage 2: Use LLM to generate regex and column
                target_column, regex_pattern = prompt_to_regex(natural_prompt)

                # Apply regex
                df = apply_regex(df, target_column, regex_pattern, replacement_value)

                filename = f"processed_{uuid.uuid4().hex}.csv"
                file_path = os.path.join(settings.MEDIA_ROOT, 'processed', filename)
                df.to_csv(file_path, index=False)

                download_link = f"/media/processed/{filename}"
                table_html = df.to_html(classes='table table-bordered', index=False)
            except Exception as e:
                error = str(e)
    else:
        form = UploadFileForm()

    return render(request, 'fileprocessor/upload.html', {
        'form': form,
        'table_html': table_html,
        'download_link': download_link,
        'error': error
    })

