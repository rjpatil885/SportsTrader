# My Django Project

This is a sample Django project that demonstrates how to set up and run a SportsTrader web application using the Django framework.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.x
- A database (e.g. PostgreSQL, MySQL, SqlLIte)

### Installing

1. Clone the repository to your local machine:

2. Navigate to the project directory:
cd SportsTrader

3. Install the required packages:
pip install -r requirements.txt

4 Apply the migrations:
python manage.py makemigrations
python manage.py migrate

5 Run the following command to start the development server:
python manage.py runserver

The server will be running on http://127.0.0.1:8000/