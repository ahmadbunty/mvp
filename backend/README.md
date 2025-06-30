# rooh.AI Backend

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file with:
```
OPENAI_API_KEY=your_openai_api_key
FIREBASE_CREDENTIALS_PATH=path_to_firebase_credentials.json
```

4. Run the server:
```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

### Journal Analysis
- `POST /journal-entry` - Analyze journal entry and get AI response
- `GET /user/{user_id}/mood-entries` - Get user's mood history

### User Management
- `GET /user/{user_id}/profile` - Get user profile
- `POST /user/{user_id}/profile` - Update user profile

### Chat
- `POST /chat` - Send message to AI and get response

### Health Check
- `GET /health` - API health status

## Features

- **Emotion Analysis**: Analyzes journal entries for mood and emotional intensity
- **Personalized AI Responses**: Tailored responses based on user's support style preferences
- **Chat Interface**: Real-time text chat with AI counselor
- **User Profiles**: Customizable user preferences and traits
- **Mood Tracking**: Historical mood data for analytics

## Integration with OpenAI

Replace the mock functions with actual OpenAI API calls:

```python
import openai

def analyze_with_gpt(text, user_context):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"You are a supportive mental wellness assistant..."},
            {"role": "user", "content": text}
        ]
    )
    return response.choices[0].message.content
```

## Firebase Integration

For production, integrate with Firebase:
- Authentication for user management
- Firestore for storing user data and mood entries
- Real-time updates for chat functionality