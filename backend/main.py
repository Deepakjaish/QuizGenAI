from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

app = FastAPI(title="QuizGen AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# OpenRouter Configuration
# ----------------------------

api_key = os.getenv("OPENROUTER_API_KEY")

if not api_key:
    raise RuntimeError("OPENROUTER_API_KEY not found in .env")

client = OpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1",
)

# ----------------------------
# Request Model
# ----------------------------

class QuizRequest(BaseModel):
    topic: str = Field(min_length=2, max_length=100)
    difficulty: str = "Medium"
    num_questions: int = Field(default=5, ge=1, le=20)


@app.post("/generate-quiz")
async def generate_quiz(req: QuizRequest):

    prompt = f"""
You are an expert quiz creator.

Generate exactly {req.num_questions} multiple choice questions.

Topic:
{req.topic}

Difficulty:
{req.difficulty}

Rules:

- 4 options
- Exactly one correct answer
- Explanation after every answer
- No duplicate questions
- Clean formatting
"""

    def stream():

        try:

            response = client.chat.completions.create(
                model="openai/gpt-oss-20b:free",
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                stream=True,
            )

            for chunk in response:

                if (
                    chunk.choices
                    and chunk.choices[0].delta.content
                ):

                    yield chunk.choices[0].delta.content

        except Exception as e:

            yield f"\n\nError:\n{str(e)}"

    return StreamingResponse(
        stream(),
        media_type="text/plain"
    )


app.mount(
    "/",
    StaticFiles(directory="../frontend", html=True),
    name="frontend",
)