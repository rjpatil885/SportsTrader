
from django.shortcuts import render ,HttpResponse
from django.http import JsonResponse
from django.conf import settings
from .models import Event, Competitors
from django.db.models import Q
import json
from datetime import datetime
from operator import *

JSON_FILE = settings.JSON_FILE
def home(request):
  with open(JSON_FILE) as json_file:
    data = json.load(json_file)

  for event in data['Events']:
    
    sport_event_id = event['sport_event_id']
    start_date = event['start_date']
    competition_name = event['competition_name']
    competition_id = event['competition_id']
    competitors = event['competitors']
    venus = event['venue']
    probability_home_team_winner = event["probability_home_team_winner"]
    probability_draw = event["probability_draw"]
    probability_away_team_winner = event["probability_away_team_winner"]

    for competitor in competitors:
      
      c_id = competitor['id']
      c_name = competitor['name']
      c_country = competitor['country']
      c_gender = competitor['gender']
      c_abbreviation = competitor['abbreviation'],
    
      cp_info = Competitors(
      c_id = c_id,
      name=c_name,
      country = c_country,
      gender = c_gender,
      abbreviation = c_abbreviation,
      )

    try:
      cp_info.save()
    except:
      existing_competitor = Competitors.objects.get(name=c_name)
      existing_competitor.c_id = c_id
      existing_competitor.country = c_country
      existing_competitor.gender = c_gender,
      existing_competitor.abbreviation = c_abbreviation,
      existing_competitor.save()

    home_team = None
    away_team = None
    for competitor in competitors:
      if competitor['qualifier'] == 'home':
          home_team = competitor
      elif competitor['qualifier'] == 'away':
          away_team = competitor

    result , probability = probability_check(probability_home_team_winner, probability_draw, probability_away_team_winner)
    if venus is not None:
      if 'name' in venus:
          vns = venus['name']


    existing_event, created = Event.objects.get_or_create(
      sport_event_id=sport_event_id,
      start_date=start_date, 
      home_name = home_team['name'],
      away_name = away_team['name'],
      home_country = home_team['country'],
      away_country = away_team['country'],
      venue = vns,
      probability_home_team_winner = probability_home_team_winner,
      probability_draw = probability_draw,
      probability_away_team_winner = probability_away_team_winner,
      result = float(probability),
      result_type = result,
      competition_name = competition_name,
      )
 

  events = Event.objects.all()
  cmp_filter = Event.objects.order_by().values_list('competition_name').distinct()
  top_10_probable_events = Event.objects.all().order_by('-result')[:10]

  return render(request, 'home.html', {
    'cmp_filter':cmp_filter,
    'events': events,
    'top_10_probability':top_10_probable_events,

    })



def probability_check(probability_home_team_winner, probability_draw, probability_away_team_winner ):

    if probability_home_team_winner > probability_draw and probability_home_team_winner > probability_away_team_winner:
        result = "HOME_TEAM_WIN"
        probability = probability_home_team_winner
    elif probability_draw > probability_home_team_winner and probability_draw > probability_away_team_winner:
        result = "DRAW"
        probability = probability_draw
    else:
        result = "AWAY_TEAM_WIN"
        probability = probability_away_team_winner
    return result , probability