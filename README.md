# party2vec

## Research Problem
Can German parties be classified by the political tweets of their 'Bundestag' members? To tackle this problem, we want to create word embeddings for each party with at least ten persons in the 19th 'Bundestag'.

## A description of who does what
Sven:
* Embedding research and creation

Taras:
* Visualization

Jakob:
* Data mining and cleaning

## A clear statement of the approach you will be taking, including how you intend to evaluate the results, and your justification for choosing these methods.
The goal is research how well tweets from different party members can be classified. To approach this problem, we are going through the following steps:
* Get the needed data
* Read papers/literature to learn how to create word embeddings
* Create our own embedding for the different parties
* Visualization of our result
    * Similarities of parties

To evaluate we will use current Tweets, which were not present in the training dataset. We hope that our method will be able to correctly predict the parties. The challenge would also be to classify politicians that were not present in the training data at all.

## Which third-party resources you will be using and how you will be using them.
* spaCy
* sklearn
* pandas
* numpy
* tenserflow
* [SNScraper](https://github.com/JustAnotherArchivist/snscrape)
* Bundestwitter [Twitterlist](https://twitter.com/i/lists/912241909002833921)

## Which resources you will be constructing yourself.
* Dataset of Tweets by politicians of each party
    * Aiming at ~1mil words per party
