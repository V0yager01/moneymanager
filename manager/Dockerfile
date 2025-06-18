FROM python:3.11

WORKDIR /app

COPY /requirements.txt .

RUN pip install -r requirements.txt --no-cache-dir

COPY . . 

RUN python manage.py collectstatic --noinput

RUN python manage.py migrate

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "manager.wsgi"]