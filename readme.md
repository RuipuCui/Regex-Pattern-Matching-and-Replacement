# 🔍 Regex Pattern Matching and Replacement Web App

A full-stack web application that allows users to:

-  Upload CSV or Excel files
-  Describe a pattern to match using natural language (e.g. "find email addresses")
-  Automatically convert the description to a regular expression using an LLM
-  Replace matches with a custom value (e.g. "REDACTED")
- View the cleaned dataset in a table
-  Download the processed file

---

##  Tech Stack

| Frontend     | Backend     | AI & Utilities      |
|--------------|-------------|---------------------|
| React (Vite or CRA) | Django (REST API) | OpenAI API (Regex generation) |
| Axios        | Django REST | Pandas, Regex       |
| Lucide Icons | CORS Headers | dotenv (.env config) |

---

## 🛠 Setup Instructions

### 🔧 Backend (Django)

1. Create a virtual environment:

    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Set your OpenAI API key in a `.env` file:

    ```env
    OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
    ```

4. Run migrations and start the server:

    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

---

### 🎨 Frontend (React)

1. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

The app will be available at:  
- React: `http://localhost:3000`  
- Django API: `http://localhost:8000/api/process/`