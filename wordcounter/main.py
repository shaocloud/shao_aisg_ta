"""Entry point for the word counter

We will consider hyphenated words as separate words, even if the word before is a prefix.
"""
import sys
import os
import re

PG_FILENAME = "assets/pg16317.txt"

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

    for word in re.split('[^a-zA-Z]', text):
        word = normalize_word(word)

        if word:
            dictionary[word] = dictionary.get(word, 0) + 1

    sort = sorted(dictionary.items(), key=lambda item: item[1], reverse=True)

    for word, count in sort[10:20]:
        print(f"{word}: {count}")

if __name__ == "__main__":
    print("Hello World!")