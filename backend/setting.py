
from flask import Flask
from sqlalchemy import (create_engine)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from flask_cors import CORS

app = Flask(__name__)
app.app_context().push()

#DATABASE_URL= create_engine('mysql+pymysql://root:@localhost:3306/todoApi', echo=True)
app.config['SQLALCHEMY_DATABASE_URI'] = ('mysql+pymysql://root:@localhost:3306/todoApi')
modelBase = declarative_base()
app.config['SECRET_KEY'] = 'jmkbnjjhhfg@bgfbgfvvf@vcfv@cfvfvfvvfv'
db = SQLAlchemy(app)
CORS(app)


class Config(object):
    DEBUG = False
    TESTING = False
    DATABASE_URL = 'sqlite://:memory:'

class ProductionConfig(Config):
    DATABASE_URL = 'mysql://user@localhost/foo'

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True