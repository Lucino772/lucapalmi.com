from dotenv import load_dotenv
from backend.app import create_app

load_dotenv()

app = create_app()

if __name__ == "__main__":
    app.run(port=8000,debug=True,host='0.0.0.0')