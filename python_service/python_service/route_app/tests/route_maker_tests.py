from django.test import TestCase
from route_app.domain.queries.route_maker import compute_likeability


class RouteMakerTests(TestCase):
    def setUp(self):
        super().setUp()
        self.building_1 = {
            "id": 1,
            "information": "This building is a building the best one, a;is!this",
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
        

    def test_compute_likability(self):
        likability_review_1 = compute_likeability(
            self.building_1["information"], self.review_1["review"]
        )
        
        # The review was 3 so all words should have a -4 value
        self.assertEqual(-4, likability_review_1["a"])
        self.assertEqual(-4, likability_review_1["this"])
        # There are 7 unique words
        self.assertEqual (7, len(likability_review_1))
        
        
