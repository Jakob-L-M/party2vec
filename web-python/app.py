from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/py/<name>')
def py(name):
    print(name)
    return {'embedding': [2,3,4,5,6,7], 'nn_forest': [1,2,2,2,2,2], 'tfidf': 2}


if __name__ == '__main__':
    app.run(debug=True)
