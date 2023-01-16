from django.db import models

class Event(models.Model):

    sport_event_id = models.CharField(max_length=255)
    start_date = models.DateTimeField(blank=True)

    home_name = models.CharField(max_length=255)
    home_country = models.CharField(max_length=255)
    away_name = models.CharField(max_length=255)
    away_country = models.CharField(max_length=255)

    venue = models.CharField(max_length=255, blank=True)
    probability_home_team_winner = models.FloatField()
    probability_draw = models.FloatField()
    probability_away_team_winner = models.FloatField()
    result = models.FloatField(max_length=255, blank=True)
    result_type = models.CharField(max_length=255, blank=True)
    competition_name = models.CharField(max_length=255)
    
class Competitors(models.Model):

    c_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255,unique=True)
    country = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    abbreviation = models.CharField(max_length=255)
