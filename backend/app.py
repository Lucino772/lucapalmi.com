import os
from flask import Flask
from flask_mongoengine import MongoEngine
from .routes import routes

def create_app():
    app = Flask(__name__)
    
    app.config['MONGODB_SETTINGS'] = {
        'host': os.getenv('app_dbhost'),
        'alias': 'blog'
    }

    db = MongoEngine(app)

    app.register_blueprint(routes)

    return app