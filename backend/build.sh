#!/usr/bin/env bash
echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo "⬇️ Downloading NLTK punkt..."
python -c "import nltk; nltk.download('punkt'); nltk.download('punkt_tab')"

# Collect static files (optional, if you're using Django admin or serving static)
python manage.py collectstatic --noinput

# Apply migrations
python manage.py migrate
