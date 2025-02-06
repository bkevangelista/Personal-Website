FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# API Key is fetched at runtime
ENV GCP_API_KEY=""

RUN pytest tests/

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
