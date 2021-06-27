import sys
import numpy as np
import spacy
import math

def clean(text):
    return text

def label(input_text):
    return math.floor(np.random.random()*6)

def word_emb(input_text):
    return [np.random.random() for _ in range(6)]
 
if __name__ == "__main__":
    # sys.argv[1] = Text in textfield
    cleaned_text = clean(sys.argv[1])
    if (cleaned_text == ""):
        print(404)
    else:
        result = {}
        nlp = spacy.load("de_core_news_lg", exclude=['tagger', 'morphologizer', 'parser', 'senter', 'ner', 'attribute_ruler', 'lemmatizer'])
        result["lab"] = label(cleaned_text)
        result["word_e"] = word_emb(cleaned_text)
        result["nn_forest"] = word_emb(cleaned_text)
        print(result)