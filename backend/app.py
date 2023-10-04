

from flask import  request, jsonify, make_response, json
from flask_sqlalchemy import SQLAlchemy
from  werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from db_model import Todo, User

from serialers import TodoSerialers

from setting import app, db



jwt = JWTManager(app)



@app.route('/api/v1/create', methods=['POST'])
def Create():
    data = request.get_json()
    if (len(data['tittle']) >3 and len(data['description']) >3 and data['tittle'].lower() != data['description'].lower()):

        todo = Todo(tittle = data['tittle'],description = data['description'])
        db.session.add(todo)
        db.session.commit()
        datas = {
            "message" : " todo save successfully"
        }
        return make_response({"todo": datas}, 200)
    else :
        error = { 
            "message" : "todo not valid"
        }

        return make_response(jsonify({"todo": error}), 400)



@app.route('/api/v1/update/<id>', methods=['PUT'])
def Update(id):
    data = request.get_json()
    todo = Todo.query.filter_by(id= id).first()
    todo.tittle = data.get("tittle", todo.tittle)
    todo.description = data.get("description", todo.description)
    db.session.commit()
    return make_response(jsonify({"todo": "successful"}))



@app.route('/api/v1/displayall', methods=['GET'])
def Dispaly_All_Todo():
    qry = Todo.query.all()
    if qry:
        todo = TodoSerialers(many=True)
        data = todo.dump(qry)
        return make_response(jsonify({"todo": data}), 200)
    else:
        err = {
            "message" : " No data Found"
        }
        return make_response(jsonify({"todo": err}), 300)


@app.route('/api/v1/displayone/<id>', methods=['GET'])
def DispalyOneItem(id):
    data_exist = Todo.query.filter_by(id=id).first()
    if (data_exist) :
        todo = TodoSerialers(many=False)
        data = todo.dump(data_exist)
        return make_response(jsonify({"todo": data}), 200)
    else:
        return make_response(jsonify({"todo": "data do not exist"}), 404)


    
@app.route("/api/v1/delete/<int:id>", methods=['DELETE'])
def Delete(id):
    data = Todo.query.filter_by(id= id).one()
    db.session.delete(data)
    db.session.commit()
    return make_response(jsonify({"todo":"deleted succefully"}), 200)


@app.route('/api/v1/signup', methods =['POST'])
def signup():
    # creates a dictionary of the form data
    data = request.get_json()
    print(data)
  
    # gets name, email and password
    name = data.get('name'), 
    email= data.get('email')
    password = data.get('password')
    # checking for existing user
    user_info = User.query.filter_by(email=email).first()
    if not user_info:
        print(user_info , "i am here to work" ,  )
        data = User(
            name = name,
            email = email,
            password = generate_password_hash(password)
        )
        # insert user
        #db.add(data)
        #db.session.add(data)
        #db.session.commit()
        

        return make_response('Successfully registered.',  200)
    else:
        
        # returns 202 if user already exists
        return make_response('User already exists. Please Log in.', 202)



@app.route('/api/v1/login', methods=['POST'])
def login():
    data = request.get_json()
    # gets name, email and password
    email = data.get('email'), 
    password = data.get('password')
    #check_password_hash
    user_info = User.query.filter_by(email=email).first()
    if check_password_hash(user_info.password, password):
        access_token = create_access_token(identity=email)
        return jsonify(message='Login Successful', access_token=access_token)
    else:
        #print("incorrect password", is_password_valid, user_info.password)
        return make_response('invalid email or password.', 401)


if __name__ == "__main__":
    app.run(debug=True)