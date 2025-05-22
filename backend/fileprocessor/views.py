import os
import uuid
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import pandas as pd
import json
from .utils.file_handler import read_uploaded_file
from .utils.llm_integration import prompt_to_regex
from .utils.regex_processor import apply_regex
from django.conf import settings

@csrf_exempt
def process_file(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        prompt = request.POST.get('natural_prompt')
        replacement = request.POST.get('replacement_value', '')

        try:
            df = read_uploaded_file(file)
            df.columns = df.columns.str.strip()
            target_column, pattern = prompt_to_regex(prompt)
            df = apply_regex(df, target_column, pattern, replacement)

            # ✅ Save the processed file
            filename = f"processed_{uuid.uuid4().hex}.csv"
            path = os.path.join(settings.MEDIA_ROOT, 'processed')
            os.makedirs(path, exist_ok=True)
            file_path = os.path.join(path, filename)
            df.to_csv(file_path, index=False)

            download_url = f"{request.scheme}://{request.get_host()}/media/processed/{filename}"

            return JsonResponse({
                'columns': df.columns.tolist(),
                'rows': df.to_dict(orient='records'),
                'download_url': download_url,
                'message': 'File processed successfully.'
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


