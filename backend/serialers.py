from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from flask_sqlalchemy import SQLAlchemy
from marshmallow import fields
from setting import db
from db_model import Todo



class TodoSerialers(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Todo
        sqla_session = db.session

    id = fields.Number(dump_only=True)
    tittle = fields.String(required=True)
    description = fields.String(required=True)