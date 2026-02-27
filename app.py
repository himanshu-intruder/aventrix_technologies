from flask import Flask, render_template
import os

# We tell Flask to look for html files in the same folder
app = Flask(__name__, template_folder='.')

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    # Render provides a specific PORT, so we must use it
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
