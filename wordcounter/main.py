"""Entry point for the word counter

Reads a text file and counts the frequency of each word.
Outputs the top 10 to 20 most common words to the console.

Saves the rest to wordcount.txt for anaylsis

NOTE:
We will consider hyphenated words as separate words,
even if the word before is a prefix.
"""
import re

# Constants

PG_FILENAME = "assets/pg16317.txt"
WORDCOUNT_FILENAME = "wordcount.txt"

# Init word dict
dictionary = {}

def normalize_word(word):
    """Normalizes the word by stripping and converting to lowercase.
    
    Args:
        word (str): The word to normalize.

    Returns:
        str: The normalized word.
    """
    return word.strip().lower()

# open file and read content
with open(PG_FILENAME, "r", encoding="utf-8") as file:
    text = file.read()
    print(f"File {PG_FILENAME} read successfully.")

    # split into words based on non-alphabetic characters
    for word in re.split('[^a-zA-Z]', text):
        word = normalize_word(word)

        # add to dict if word is not falsy
        if word:
            dictionary[word] = dictionary.get(word, 0) + 1

    # write sorted dict to file, based on frequency
    sort = sorted(dictionary.items(), key=lambda item: item[1], reverse=True)

    # Write sorted counts to file
    with open(WORDCOUNT_FILENAME, "w", encoding="utf-8") as output_file:
        for word, count in sort:
            output_file.write(f"{word}: {count}\n")

    print(f"Words ranked from 10th to 20th by frequency:")
    # Print the 10th to 20th most common words
    for word, count in sort[10:20]:
        print(f"{word}: {count}")