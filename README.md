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
![image](https://github.com/user-attachments/assets/de28017d-d622-4803-9298-a2458309475a)
![image](https://github.com/user-attachments/assets/cf94e873-f371-4e2d-83e6-9043f034fa8d)
![image](https://github.com/user-attachments/assets/a672765a-7372-4ab6-b3a6-b04df14c1923)
![image](https://github.com/user-attachments/assets/e4ad710c-f47c-4535-b650-d2c2f6d73010)
![image](https://github.com/user-attachments/assets/715e855f-818a-4fc0-91a4-726c14c05f0b)





