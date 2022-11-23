from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests, json, os



app = Flask(__name__)



from home import homepage_router
app.register_blueprint(homepage_router)
