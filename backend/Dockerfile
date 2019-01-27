FROM python:2-onbuild
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app/
RUN pip install -r /usr/src/app/requirements.txt
RUN rm -rf /usr/src/app
COPY . /usr/src/app
CMD ["python", "./manage.py", "runserver", "0.0.0.0:8000"]
