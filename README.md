# party2vec

## Research Problem
Can German parties be classified by the political tweets of their 'Bundestag' members? To tackle this problem, we want to create word embeddings for each party with at least ten politicians in the 19th 'Bundestag'.

## A description of who does what
Sven:
* Embedding research and creation
* Creation of vocabularies

Taras:
* Visualization
* Data cleaning

Jakob:
* Data scraping
* Visualization of raw data

## A clear statement of the approach you will be taking, including how you intend to evaluate the results, and your justification for choosing these methods.
The goal is to research how well tweets from different party members can be classified. To approach this problem, we are going through the following steps:
* Get the needed data
    * Make as unbiased choices as possible
* Read papers/literature to learn how to create word embeddings
    * Discuss approaches and pick the one we suspect to bring the most promising results
* Create our own embedding for the different parties
    * Use of vocabularies and stop words unique to each party
* Visualization of our result
    * Website for accessibility
    * Option for other to get there own tweets classified
    * Similarities of parties
        * Can we show that a certain party has more similarities with a certain party that with all others?

To evaluate we will use current Tweets, which were not present in the training dataset. We hope that our method will be able to correctly predict the parties. The challenge would also be to classify politicians that were not present in the training data at all.

## Which third-party resources you will be using and how you will be using them.
* [spaCy](https://spacy.io/)
    * Tokenization, Lemmatization
* [scikit-learn](https://scikit-learn.org/stable/)
    * Creation of training and testing datasets
    * Evaluation of results with (Confusion Matrix) 
* [pandas](https://pandas.pydata.org/)
    * Management of Datasets
    * Selection certain data
* [Tenserflow/Keras](https://keras.io/)
    * Training and evaluating of word embeddings
* [SNScraper](https://github.com/JustAnotherArchivist/snscrape)
    * Twitter scraping
* Bundestwitter [Twitterlist](https://twitter.com/i/lists/912241909002833921)
    * List of politician
    * Double checked with the [Open Data](https://www.bundestag.de/services/opendata) of the Bundestag

## Which resources you will be constructing yourself.
* Dataset of Tweets of each party
    * Aiming at ~1mil words per party
* Vocabularies and Stop-Words
