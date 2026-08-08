from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
import json

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

generation_config = types.GenerateContentConfig(
    temperature=1,
    top_p=0.95,
    top_k=40,
    max_output_tokens=8192,
    response_mime_type="application/json",  # <-- force JSON output
)


def analyse_resume_gemini(resume_content, job_description):
    prompt = f"""
    You are a professional resume analyzer.

    Resume:
    {resume_content}

    Job Description:
    {job_description}

    Task:
    - Analyze the resume against the job description.
    - Give a match score out of 100.
    - Highlight missing skills or experiences.
    - Suggest improvements.
    - Write a short summary.

    Respond ONLY with valid JSON in exactly this shape, no extra text:
    {{
      "score": 70,
      "missing_skills": ["...", "..."],
      "suggestions": ["...", "..."],
      "summary": "..."
    }}
    """

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
            config=generation_config
        )
        return json.loads(response.text)  # parse JSON server-side

    except Exception as e:
        print("Gemini Error:")
        print(type(e))
        print(e)
        raise