import sys
import numpy as np
import spacy
import math
import json
import re

def pre_processing(text):
    # Copied form ./cleaned-data/cleaning_data.ipynb
    # Replacing German umlauts with the corresponding English letters
    text = text.replace("ä","ae").replace("Ä","Äe").replace("ö","oe").replace("Ö","Oe").replace("ü","ue").replace("Ü","Ue").replace("ß","ss")
    text = re.sub(r"@\S+", "user", text) # Replacing all tags to default "user"
    # Deleting all hashtags, emoticons, links and non alphanumeric characters from the text
    return ' '.join(re.sub("([^0-9A-Za-z \t])|(\w+:\/\/\S+)"," ",text).split())    

def label(input_text):
    return math.floor(np.random.random()*6)

def word_emb(input_text):
    return [np.random.random() for _ in range(6)]
 

def nn_forest(input_text):
    W = []
    B = []
    with open('public/python/nn_model.txt', 'r') as json_file:
        data = json.load(json_file)
        for layer in data:
            W.append(np.array(layer['weights']))
            B.append(np.array(layer['bias']))
    vector = nlp(input_text).vector
    for i in range(len(W) - 1):
        vector = np.maximum(0,np.matmul(vector,W[i]) + B[i])
    vector = np.matmul(vector,W[len(W) - 1]) + B[len(W) - 1]
    
    return np.exp(vector)/np.sum(np.exp(vector))


if __name__ == "__main__":
    # sys.argv[1] = Text in textfield
    cleaned_text = pre_processing(sys.argv[1])
    if (cleaned_text == ""):
        print(404)
    else:
        result = {}
        nlp = spacy.load("public/python/de_core_news_lg/de_core_news_lg-2.3.0", exclude=['tagger', 'morphologizer', 'parser', 'senter', 'ner', 'attribute_ruler', 'lemmatizer'])
        result["lab"] = label(cleaned_text)
        result["word_e"] = word_emb(cleaned_text)
        result["nn_forest"] = nn_forest(cleaned_text).tolist()
        print(result)