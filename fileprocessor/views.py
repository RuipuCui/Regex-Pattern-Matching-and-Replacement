# fileprocessor/views.py

from django.shortcuts import render
from .forms import UploadFileForm
from .utils.file_handler import read_uploaded_file

def upload_file_view(request):
    table_html = None
    error = None

    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = form.cleaned_data['file']
            try:
                df = read_uploaded_file(uploaded_file)
                table_html = df.to_html(classes='table table-striped', index=False)
            except Exception as e:
                error = str(e)
    else:
        form = UploadFileForm()

    return render(request, 'fileprocessor/upload.html', {
        'form': form,
        'table_html': table_html,
        'error': error
    })
