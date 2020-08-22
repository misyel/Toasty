#import stuff i think
from flask import Flask
from flask import render_template, redirect, url_for, session, request
#from requests_oauth2.services import GoogleClient
#from requests_oauth2 import OAuth2BearerToken
app = Flask(__name__)



@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template("frontpage.html")

@app.route('/bulletin-board')
def bulletin():
    return render_template("bulletin-board.html")

@app.route('/bookbag')
def bag():
    return render_template("bookbag.html")

@app.route('/chat')
def chat():
    return render_template("bookbag.html")

if __name__ == '__main__':
    app.run(debug=True)

#Google shit
