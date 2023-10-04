"""
    Database cursor script to handle transactions with the database
    sqlalchemy documentation link ==>
        http://docs.sqlalchemy.org/en/latest/orm/tutorial.html

"""

from contextlib import contextmanager
from sqlalchemy.orm import sessionmaker

# +-------------------------+-------------------------+
# User defined imports
# +-------------------------+-------------------------+

from model_config.db_model import  User, Todo  # imported from the model file

# +-------------------------+-------------------------+
# +-------------------------+-------------------------+

CursorObj = sessionmaker()

# +-------------------------+-------------------------+
# +-------------------------+-------------------------+

@contextmanager  # decorator to handle database connections
def sql_cursor():
    cursor = CursorObj()

    yield cursor

    try:
        cursor.commit()
    except Exception as e:
        cursor.rollback()
        raise e
        # add a logger here


# +-------------------------+-------------------------+
# +-------------------------+-------------------------+



# +-------------------------+-------------------------+
# +-------------------------+-------------------------+

