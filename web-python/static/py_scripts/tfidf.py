from joblib import load

class svc_model():

    def __init__(self):
        self.model = load('static/files/pipe_svc_tfidf.joblib')
    
    def predict(self, tweet):
        prediction = self.model.predict(tweet)
        return int(prediction[0])
