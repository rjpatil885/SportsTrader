from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    path('',views.home, name ='event'),
    path('statistics/', views.statistics_view, name='statistics'),
    path('fetch_data/', views.win_filter, name='fetch_data'),
    path('fetch_qty/', views.quantity_filter , name='fetch_qty'),
    path('fetch_date/', views.date_filter , name='fetch_date'),
    path('competitor/',views.competitors_data, name='competitor'),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)