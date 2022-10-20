import re

# Mapping bettween the 1-10 reviews to scaled values
REVIEW_TO_VALUE = {
    "1": -10,
    "2": -9,
    "3": -4,
    "4": -2,
    "5": 0,
    "6": 1,
    "7": 3,
    "8": 7,
    "9": 9,
    "10": 10,
    
    }


def compute_likeability(building_information, building_review):
    # Normalize the words
    word_set = _preprocess_information(building_information)
    return {
        word: REVIEW_TO_VALUE[building_review] 
        for word in word_set
        }

def merge_likeability_dicts(list_of_likeability_dicts):
    initial_dict = list_of_likeability_dicts.pop(0)
    for iterative_dict in list_of_likeability_dicts:
        initial_dict = {
            key: initial_dict.get(key,0) + iterative_dict.get(key,0)
            for key in set(initial_dict).union(iterative_dict)
        }
    return initial_dict

def compute_likeability_new_building(
        building_information, prev_likeability_dict
):
    word_set = _preprocess_information(building_information)
    word_set_union = set(word_set).union(prev_likeability_dict)
    return sum(word_set_union)

def _create_word_set(info):
    # Break the information into a set of unique words
    word_list =  re.split(r"[ ,;!?]+", info)
    return set(word_list)

def _preprocess_information(info):
    info = info.lower()
    return _create_word_set(info)