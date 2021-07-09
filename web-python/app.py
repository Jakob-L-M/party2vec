from flask import Flask, render_template
import spacy
import re
from static.py_scripts.nn_forest import nn_forest
from static.py_scripts.embedding import RnnModel2
from static.py_scripts.tfidf import svc_model

app = Flask(__name__)
nlp = spacy.load('de_core_news_lg')
nn = nn_forest()
rnn = RnnModel2(300, 50)
svc = svc_model()

def pre_processing(text):
    # Copied form ./cleaned-data/cleaning_data.ipynb
    # Replacing German umlauts with the corresponding English letters
    text = text.replace("ä","ae").replace("Ä","Äe").replace("ö","oe").replace("Ö","Oe").replace("ü","ue").replace("Ü","Ue").replace("ß","ss")
    text = re.sub(r"@\S+", "user", text) # Replacing all tags to default "user"
    # Deleting all hashtags, emoticons, links and non alphanumeric characters from the text
    text = re.sub(r'http\S+', '', text)
    return text # re.sub(r"[^0-9A-Za-z ]"," ",text)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/py/<name>')
def py(name):
    return {'embedding': rnn.predict(nlp(name)), 'nn_forest': nn.predict(nlp(name).vector), 'tfidf': svc.predict([name])}


@app.route('/clean/<name>')
def clean(name):
    return {'clean': pre_processing(name)}


if __name__ == '__main__':
    app.run(debug=True)
