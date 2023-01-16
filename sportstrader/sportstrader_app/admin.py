from django.contrib import admin
from .models import Event, Competitors
# Register your models here.
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):

  list_display= ['sport_event_id']

@admin.register(Competitors)
class CompetitorsAdmin(admin.ModelAdmin):

  list_display = ['name']