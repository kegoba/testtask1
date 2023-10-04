from copy import deepcopy
import unittest
import json
import app
import tempfile
from setting import db, app

from flask import current_app


app = app('config')



BASE_URL = 'http://127.0.0.1:5000/api/v1/'

class TestFlaskApi(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.testing = True

        with self.app.app_context():
            self.test_app = current_app.test_client()

    def test_get_all(self):
        response = self.app.get(BASE_URL+'displayall')
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.data)

    def test_post(self):
        # missing value field = bad
        data1 = {"description": "tell something"}
        response = self.app.post(BASE_URL+"create",
                                 data=json.dumps(data1),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 500)
        # when both field have the same value
        data2 = {"tittle": "time", "description": 'Time'}
        response = self.app.post(BASE_URL+"create",
                                 data=json.dumps(data2),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # whenany on the field length is less 3
        data3 = {"tittle": "sc", "description": "twqq"}
        response = self.app.post(BASE_URL+"create",
                                 data=json.dumps(data3),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # when the data is okay
        data4 = {"tittle": "the man is good",  "description" : "what is like about the man"}
        response = self.app.post(BASE_URL+"create",
                                 data=json.dumps(data4),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual((response.data), b'{"todo":{"message":" todo save successfully"}}\n')

    def test_update(self):
        data= {"tittle": "good news", "description":"Nigeria great now"}
        response = self.app.put(BASE_URL+'update/3',
                                data=json.dumps(data),
                                content_type='application/json')
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.get_data())
        self.assertEqual(res, {"todo": "successful"})
         #when ID is not  found
        response = self.app.put(BASE_URL+'update/0')
        self.assertEqual(response.status_code, 400)

    def test_delete(self):
        response = self.app.delete(BASE_URL+'delete/3')
        #when ID is found
        #self.assertEqual(response.status_code, 200)
         #when ID is not  found
        response = self.app.delete(BASE_URL+'delete/0')
        self.assertEqual(response.status_code, 404)
        
    def tearDown(self):
        # reset app.items to initial state
        #db.drop_all()
        pass

    

if __name__ == "__main__":
    unittest.main()