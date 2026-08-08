from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
import os

from analyse_pdf import analyse_resume_gemini

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def extract_text(pdf_path):

    doc = fitz.open(pdf_path)

    text = ""

    for page in doc:

        text += page.get_text()

    return text


@app.route("/analyze", methods=["POST"])

def analyze():

    resume = request.files.get("resume")


    job_description = request.form.get("job_description")
    if resume is None:
        return jsonify({
            "error":"Resume file missing"
        }),400


    if job_description is None:
        return jsonify({
            "error":"Job description missing"
        }),400
    if not resume.filename.lower().endswith(".pdf"):
        return jsonify({
            "error": "Only PDF files are allowed"
        }), 400
    
    path = os.path.join(UPLOAD_FOLDER, resume.filename)

    resume.save(path)

    try:

        resume_text = extract_text(path)

        result = analyse_resume_gemini(
            resume_text,
            job_description
        )

        return jsonify({
            "analysis": result
        })

    except Exception as e:

        print("ERROR:", e)

        return jsonify({
            "error": str(e)
        }), 500

    finally:

        if os.path.exists(path):
            os.remove(path)


if __name__ == "__main__":

    app.run(debug=True)