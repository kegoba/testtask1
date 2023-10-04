
import datetime
from setting import  db





# +-------------------------+-------------------------+
# self declaration variables
# +-------------------------+-------------------------+


# +-------------------------+-------------------------+
# todo Table
# +-------------------------+-------------------------+
class Todo(db.Model):
    __tablename__ = "todo"
    id = db.Column(db.Integer, nullable=False, primary_key=True, autoincrement=True)
    tittle = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500) ,nullable=False)
 

    
# +-------------------------+-------------------------+
# user table schema
# +-------------------------+-------------------------+
class User(db.Model):

    __tablename__ = "user"
    id = db.Column(db.Integer, nullable=False, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique = True)
    password = db.Column(db.String(250), nullable=False)
    date_created = db.Column(db.DateTime,
                          default=datetime.datetime.now())
    
    def __str__(self):
        return f"id : {self.id}"


# +-------------------------+-------------------------+


# run this when you want to create or delete tables

if __name__ == '__main__':
  
    #db.drop_all()
    db.create_all()
   