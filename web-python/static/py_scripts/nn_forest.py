import numpy as np
import json


class nn_forest():

    W = []
    B = []

    def __init__(self):
        with open('static/files/nn_model.txt', 'r') as json_file:
            data = json.load(json_file)
            for layer in data:
                self.W.append(np.array(layer['weights']))
                self.B.append(np.array(layer['bias']))

    def predict(self, vector):
        n = len(self.W) - 1
        for i in range(n):
            vector = np.maximum(0, np.matmul(vector, self.W[i]) + self.B[i])
        vector = np.matmul(vector, self.W[n]) + self.B[n]
        return (np.exp(vector)/np.sum(np.exp(vector))).tolist()
