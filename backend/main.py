from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import openai
import json
from datetime import datetime
import uuid

app = FastAPI(title="rooh.AI Backend API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class JournalEntryRequest(BaseModel):
    text: str
    user_id: str

class JournalEntryResponse(BaseModel):
    mood: str
    emotion: str
    intensity: int
    ai_response: str
    suggestions: List[str]

class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    support_style: str
    language: str
    traits: List[str]

class ChatMessage(BaseModel):
    content: str
    user_id: str
    conversation_id: Optional[str] = None

class MoodEntry(BaseModel):
    id: str
    user_id: str
    date: str
    text: str
    mood: str
    emotion: str
    intensity: int
    ai_response: str
    suggestions: List[str]

# Mock database (replace with actual database)
users_db = {}
mood_entries_db = []
conversations_db = {}

# OpenAI configuration (replace with your API key)
# openai.api_key = "your-openai-api-key"

def analyze_mood_with_ai(text: str, user_profile: dict) -> dict:
    """
    Analyze journal entry and generate AI response using OpenAI
    For demo purposes, this returns mock data
    """
    # Mock analysis - replace with actual OpenAI API call
    mood_analysis = {
        "mood": determine_mood(text),
        "emotion": determine_emotion(text),
        "intensity": determine_intensity(text),
        "ai_response": generate_ai_response(text, user_profile),
        "suggestions": generate_suggestions(text, user_profile)
    }
    
    return mood_analysis

def determine_mood(text: str) -> str:
    """Determine primary mood from text"""
    text_lower = text.lower()
    if any(word in text_lower for word in ['happy', 'joy', 'excited', 'great']):
        return 'happy'
    elif any(word in text_lower for word in ['sad', 'down', 'depressed', 'upset']):
        return 'sad'
    elif any(word in text_lower for word in ['anxious', 'worried', 'nervous', 'stress']):
        return 'anxious'
    elif any(word in text_lower for word in ['angry', 'frustrated', 'mad', 'irritated']):
        return 'angry'
    elif any(word in text_lower for word in ['calm', 'peaceful', 'relaxed', 'serene']):
        return 'calm'
    else:
        return 'neutral'

def determine_emotion(text: str) -> str:
    """Determine secondary emotion"""
    emotions = ['hopeful', 'overwhelmed', 'grateful', 'confused', 'determined', 'lonely', 'content']
    # Simple random selection for demo - replace with actual analysis
    import random
    return random.choice(emotions)

def determine_intensity(text: str) -> int:
    """Determine emotional intensity (1-5)"""
    # Count emotional indicators
    emotional_words = ['very', 'extremely', 'really', 'so', 'quite', 'pretty', 'incredibly']
    intensity = 3  # Default
    
    text_lower = text.lower()
    for word in emotional_words:
        if word in text_lower:
            intensity = min(5, intensity + 1)
    
    return intensity

def generate_ai_response(text: str, user_profile: dict) -> str:
    """Generate personalized AI response based on support style"""
    support_style = user_profile.get('support_style', 'empathetic')
    
    responses = {
        'motivational': [
            "I can see you're processing some deep feelings. Remember, every challenge is an opportunity for growth. You have the strength within you to navigate through this.",
            "Your willingness to reflect shows incredible self-awareness. That's a powerful tool for personal development. Keep moving forward, one step at a time."
        ],
        'empathetic': [
            "Thank you for sharing your feelings with me. I can sense the emotions you're experiencing, and I want you to know that you're not alone in this.",
            "Your emotions are valid, and it's okay to feel whatever you're feeling right now. Take your time to process these thoughts."
        ],
        'analytical': [
            "Based on what you've shared, it seems like you're experiencing a complex mix of emotions. Let's break this down and identify patterns.",
            "Your reflection shows clear emotional awareness. Consider what triggers led to these feelings and what coping strategies might be most effective."
        ],
        'practical': [
            "Here are some concrete steps you can take right now to address what you're feeling. Start with small, manageable actions.",
            "Let's focus on actionable solutions. Based on your situation, here are some practical approaches you might consider."
        ]
    }
    
    import random
    style_responses = responses.get(support_style, responses['empathetic'])
    return random.choice(style_responses)

def generate_suggestions(text: str, user_profile: dict) -> List[str]:
    """Generate personalized suggestions"""
    all_suggestions = [
        "Try the 4-7-8 breathing technique: Inhale for 4, hold for 7, exhale for 8",
        "Take a 10-minute walk in nature to clear your mind",
        "Practice progressive muscle relaxation before bed",
        "Write down three things you're grateful for today",
        "Listen to calming music or nature sounds",
        "Try journaling for 5 minutes each morning",
        "Practice mindful meditation for 10 minutes",
        "Connect with a friend or family member",
        "Engage in a creative activity you enjoy",
        "Do some gentle stretching or yoga"
    ]
    
    import random
    return random.sample(all_suggestions, 3)

# API Routes

@app.get("/")
async def root():
    return {"message": "rooh.AI Backend API is running"}

@app.post("/journal-entry", response_model=JournalEntryResponse)
async def analyze_journal_entry(request: JournalEntryRequest):
    """Analyze journal entry and provide AI response"""
    try:
        # Get user profile (mock data for demo)
        user_profile = users_db.get(request.user_id, {
            'support_style': 'empathetic',
            'language': 'english',
            'traits': []
        })
        
        # Analyze mood and generate response
        analysis = analyze_mood_with_ai(request.text, user_profile)
        
        # Store mood entry
        mood_entry = MoodEntry(
            id=str(uuid.uuid4()),
            user_id=request.user_id,
            date=datetime.now().isoformat(),
            text=request.text,
            **analysis
        )
        mood_entries_db.append(mood_entry.dict())
        
        return JournalEntryResponse(**analysis)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/user/{user_id}/profile")
async def get_user_profile(user_id: str):
    """Get user profile and preferences"""
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    return users_db[user_id]

@app.post("/user/{user_id}/profile")
async def update_user_profile(user_id: str, profile: UserProfile):
    """Update user profile and preferences"""
    users_db[user_id] = profile.dict()
    return {"message": "Profile updated successfully"}

@app.get("/user/{user_id}/mood-entries")
async def get_mood_entries(user_id: str):
    """Get user's mood entries for dashboard"""
    user_entries = [entry for entry in mood_entries_db if entry['user_id'] == user_id]
    return user_entries

@app.post("/chat")
async def chat_with_ai(message: ChatMessage):
    """Handle chat messages with AI"""
    try:
        # Get user profile for personalized response
        user_profile = users_db.get(message.user_id, {})
        
        # Generate AI response (mock for demo)
        ai_response = generate_chat_response(message.content, user_profile)
        
        # Store conversation
        conversation_id = message.conversation_id or str(uuid.uuid4())
        if conversation_id not in conversations_db:
            conversations_db[conversation_id] = []
        
        conversations_db[conversation_id].extend([
            {
                "id": str(uuid.uuid4()),
                "content": message.content,
                "sender": "user",
                "timestamp": datetime.now().isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "content": ai_response,
                "sender": "ai",
                "timestamp": datetime.now().isoformat()
            }
        ])
        
        return {
            "response": ai_response,
            "conversation_id": conversation_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def generate_chat_response(message: str, user_profile: dict) -> str:
    """Generate chat response based on user message"""
    message_lower = message.lower()
    
    if any(word in message_lower for word in ['anxious', 'worried', 'nervous']):
        return "I understand you're feeling anxious. That's a completely valid emotion. Let's try a quick breathing exercise together: Breathe in for 4 counts, hold for 4, then exhale for 6. Would you like me to guide you through some other anxiety management techniques?"
    elif any(word in message_lower for word in ['sad', 'down', 'depressed']):
        return "I hear that you're feeling down, and I want you to know that your feelings are important and valid. Sometimes sadness is our mind's way of processing difficult experiences. What's been weighing on your heart lately?"
    elif any(word in message_lower for word in ['happy', 'good', 'great']):
        return "I'm so glad to hear you're feeling positive! It's wonderful when we can appreciate these moments of happiness. What's been bringing joy to your life recently?"
    else:
        responses = [
            "Thank you for sharing that with me. Can you tell me more about how you're experiencing this?",
            "I'm listening. Your thoughts and feelings are important. What else is on your mind?",
            "That sounds like it's been on your mind. How has this been affecting your daily life?",
            "I appreciate you opening up to me. What would feel most supportive for you right now?"
        ]
        import random
        return random.choice(responses)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)