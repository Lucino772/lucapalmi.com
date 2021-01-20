import os
from dotenv import load_dotenv
from backend.app import create_app

BASE_ENV_FILE = os.path.join(os.path.dirname(__file__),'.env')
load_dotenv(BASE_ENV_FILE)

APP_ENVIRONMENT = os.getenv('app_environment')
if APP_ENVIRONMENT == 'production':
    load_dotenv(os.path.join(os.path.dirname(__file__), '.env.production'))
else:
    load_dotenv(os.path.join(os.path.dirname(__file__), '.env.development'))

app = create_app()

if __name__ == "__main__":
    app.run(port=8000,debug=True,host='0.0.0.0')