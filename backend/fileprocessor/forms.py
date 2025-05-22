# fileprocessor/forms.py
# fileprocessor/forms.py

from django import forms

class UploadFileForm(forms.Form):
    file = forms.FileField(label='Upload CSV or Excel file')
    natural_prompt = forms.CharField(
        label='Describe the pattern to find (in plain English)',
        widget=forms.TextInput(attrs={'placeholder': 'e.g. Find email addresses in the Email column'})
    )
    replacement_value = forms.CharField(
        label='Replacement value',
        required=False,
        widget=forms.TextInput(attrs={'placeholder': 'e.g. REDACTED'})
    )
