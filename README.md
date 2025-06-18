# Moneymanager
## Описание
Приложение позволяет вести учет денежных средств.
В рамках задания был реализован бэкенд с админкой и урощенный по функционалу фронтенд.
Добавление/изменениe/удаление для типов, категорий, подкатегорий и статусов происходит через админ-панель.

## Стек:
* Python
* Django(drf)
* JavaScript
* Css(bootstrap)
* Sqlite
* Docker.


## Запуcк
### Клонирование
Клонируйте репозиторий
```
git clone git@github.com:V0yager01/moneymanager.git
```
### Подготовка виртуального окружения
```
cd manager/
touch .env

SECRET_KEY=secretkey
DEBUG=True
ALLOWED_HOSTS=*

```
### Запуск композиции

```
docker-compose up --build
```

### Добавление суперпользователя
```
docker compose exec backend python manage.py createsuperuser
```


