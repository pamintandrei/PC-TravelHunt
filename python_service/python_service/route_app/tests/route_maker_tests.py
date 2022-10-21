from django.test import TestCase
from route_app.domain.queries.route_maker import compute_likeability
from route_app.domain.queries.route_maker import merge_likeability_dicts
from route_app.domain.queries.route_maker import compute_likeability_new_building
from route_app.domain.queries.route_maker import bulk_compute_likeability_new_building
from route_app.domain.queries.route_maker import bulk_compute_likeability


class RouteMakerTests(TestCase):
    def setUp(self):
        super().setUp()
        self.building_1 = {
            "id": "1",
            "information": "This building is a building the best one, a;is!this",
            #TODO (andreipamint) Change test to support the location system we
            # are using after we decide how to handle it
            "location": "TBD",
        }
        self.building_2 = {
            "id": "2",
            "information": "This building",
            #TODO (andreipamint) Change test to support the location system we
            # are using after we decide how to handle it
            "location": "TBD",
        }
        self.building_3 = {
            "id": "3",
            "information": "building",
            #TODO (andreipamint) Change test to support the location system we
            # are using after we decide how to handle it
            "location": "TBD",
        }
        self.review_1 = {
            "username": "Hiparh",
            "review" : "3",
            "building_id" : "1",
        }
        self.review_2 = {
            "username": "Hiparh but funny",
            "review" : "7",
            "building_id" : "1",
        }
        self.review_3 = {
            "username": "Hiparh but passed ED",
            "review" : "5",
            "building_id" : "1",
        }
        self.review_4 = {
            "username": "Hiparh but passed ED",
            "review" : "3",
            "building_id" : "1",
        }
        self.review_5 = {
            "username": "Hiparh but passed ED",
            "review" : "10",
            "building_id" : "2",
        }
        

    def test_compute_likability(self):
        likability_review_1 = compute_likeability(
            self.building_1["information"], self.review_1["review"]
        )
        
        # The review was 3 so all words should have a -4 value
        self.assertEqual(-4, likability_review_1["a"])
        self.assertEqual(-4, likability_review_1["this"])
        # There are 7 unique words
        self.assertEqual (7, len(likability_review_1))
    
    def test_merge_likeability(self):
        likability_review_1 = compute_likeability(
            self.building_1["information"], self.review_1["review"]
        )
        likability_review_2 = compute_likeability(
            self.building_1["information"], self.review_2["review"]
        )
        likability_review_3 = compute_likeability(
            self.building_1["information"], self.review_3["review"]
        )
        merged_likeability = merge_likeability_dicts(
            [likability_review_1, likability_review_2, likability_review_3]
        )
        expected_merged_likeability = {
            "this" : -1,
            "building": -1,
            "is": -1,
            "a": -1,
            "the": -1,
            "best": -1,
            "one": -1,
        }
        self.assertEqual(expected_merged_likeability,merged_likeability)

    def test_compute_likeability_new_building(self):
        likability_review_1 = compute_likeability(
            self.building_1["information"], self.review_1["review"]
        )
        likability_review_2 = compute_likeability(
            self.building_1["information"], self.review_2["review"]
        )
        likability_review_3 = compute_likeability(
            self.building_1["information"], self.review_3["review"]
        )
        merged_likeability = merge_likeability_dicts(
            [likability_review_1, likability_review_2, likability_review_3]
        )
        self.assertEqual(
            -2,
            compute_likeability_new_building(
                self.building_2["information"], merged_likeability
            )
        )
        
    def test_buld_compute_likeability_new_building(self):
        review_list = [self.review_4,self.review_5]
        building_list = [self.building_1,self.building_2,self.building_3]
        expected_merged_likeability = {
            "this" : 6,
            "building": 6,
            "is": -4,
            "a": -4,
            "the": -4,
            "best": -4,
            "one": -4,
        }
        self.assertEqual(expected_merged_likeability,bulk_compute_likeability(building_list,review_list))
        expected_likeability = {
            "3": 6
        }
        self.assertEqual(expected_likeability,bulk_compute_likeability_new_building(building_list,review_list))
        building_list = [self.building_1,self.building_2]
        self.assertEqual({},bulk_compute_likeability_new_building(building_list,review_list))
        building_list = [self.building_3]
        self.assertEqual({"3": 0},bulk_compute_likeability_new_building(building_list,review_list))
        