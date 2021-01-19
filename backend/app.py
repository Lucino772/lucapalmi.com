import os
from flask import Flask
from flask_mongoengine import MongoEngine
from .routes import routes

def create_app():
    app = Flask(__name__)
    db = MongoEngine(app)

    app.config['MONGODB_SETTINGS'] = {
        'host': os.getenv('app_dbhost')
    }

    app.register_blueprint(routes)

    return app