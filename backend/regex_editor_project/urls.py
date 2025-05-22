# regex_editor_project/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('upload/', include('fileprocessor.urls')),
    path('api/', include('fileprocessor.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
