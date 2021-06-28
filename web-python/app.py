from flask import Flask, render_template
import spacy
from static.py_scripts.nn_forest import nn_forest

app = Flask(__name__)
nlp = spacy.load('de_core_news_lg')
nn = nn_forest()

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/py/<name>')
def py(name):
    return {'embedding': [2,3,4,5,6,7], 'nn_forest': nn.predict(nlp(name).vector), 'tfidf': 2}


if __name__ == '__main__':
    app.run(debug=True)
