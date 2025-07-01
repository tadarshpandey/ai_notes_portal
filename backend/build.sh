#!/usr/bin/env bash

echo "⬇️ Downloading NLTK punkt..."
python -m nltk.downloader punkt

echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Collect static files (optional, if you're using Django admin or serving static)
python manage.py collectstatic --noinput

# Apply migrations
python manage.py migrate
