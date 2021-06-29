import numpy as np
import csv
from tensorflow.keras.preprocessing.sequence import make_sampling_table, pad_sequences
from tensorflow.keras import Model,Input
from tensorflow.keras.layers import (
    Dot,
    Embedding,
    Flatten,
    Dense,
    GlobalAveragePooling1D,
    LSTM,
    concatenate,
    Dropout,
    Bidirectional,
)

class RnnModel2():

    def __init__(self, embedding_dim, max_len):

        em_matrix = np.genfromtxt(fname = "static/files/vector_all_data.tsv", delimiter = "\t" )

        inp1 = Input(shape=(max_len,))
        x = Embedding(em_matrix.shape[0], embedding_dim, weights=[em_matrix])(inp1)
        x = Bidirectional(LSTM(256, return_sequences=True))(x)
        x = Bidirectional(LSTM(128))(x)
        x = Dense(256, activation="relu")(x)
        x = Dropout(0.1)(x)
        x = Dense(64, activation="relu")(x)
        x = Dense(6, activation="softmax")(x)    
        model = Model(inputs=inp1, outputs=x)
        model.compile(loss = 'binary_crossentropy', optimizer = 'adam', metrics=["accuracy"])
        self.model = model
        self.model.load_weights('static/files/model_weights')
        self.build_vocab()

    def build_vocab(self):
        with open("static/files/all_vocab_token.csv", mode='r') as infile:
            reader = csv.reader(infile)
            next(reader) #skip header
            vocab = {rows[0]:int(rows[2]) for rows in reader}
        vocab['UNK'] = len(vocab)
        self.vocab = vocab

    def predict(self, nlp_object):
        pad_seq = pad_sequences([[self.vocab[y.text] if y.text in self.vocab else self.vocab['UNK'] for y in nlp_object]], 50, dtype=int, padding='post',value=0)
        return self.model.predict(pad_seq)[0].tolist()