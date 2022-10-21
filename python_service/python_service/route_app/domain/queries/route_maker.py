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

def bulk_compute_likeability(buildings, reviews):
    mapping_building_id_info = {
        building["id"]: building["information"]
        for building in buildings
    }
    mapping_review_id_number = {
        review["building_id"]: review["review"]
        for review in reviews
    }
    likeability_dictionaries = [
        compute_likeability(
            mapping_building_id_info.get(building_id, ""),
            mapping_review_id_number.get(building_id)
        )
        for building_id in mapping_review_id_number
    ]
    merged_likeability = merge_likeability_dicts(likeability_dictionaries)
    return merged_likeability

def bulk_compute_likeability_new_building(buildings, reviews):
    mapping_building_id_info = {
        building["id"]: building["information"]
        for building in buildings
    }
    mapping_review_id_number = {
        review["building_id"]: review["review"]
        for review in reviews
    }
    unreviewd_buildings = {
        building:mapping_building_id_info[building]
        for building in mapping_building_id_info
        if building not in mapping_review_id_number
    }
    merged_likeability = bulk_compute_likeability(buildings, reviews)
    return {
        building_id: compute_likeability_new_building(
            unreviewd_buildings[building_id], merged_likeability
        )
        for building_id in unreviewd_buildings
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
    word_set_intersect = set(word_set).intersection(prev_likeability_dict)
    return sum([prev_likeability_dict[key] for key in word_set_intersect])

def _create_word_set(info):
    # Break the information into a set of unique words
    word_list =  re.split(r"[ ,;!?]+", info)
    return set(word_list)

def _preprocess_information(info):
    info = info.lower()
    return _create_word_set(info)