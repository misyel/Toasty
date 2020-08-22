#import stuff i think
from flask import render_template, redirect, url_for, session, request
from requests_oauth2.services import GoogleClient
from requests_oauth2 import OAuth2BearerToken

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template("frontpage.html")

@app.route('/bulletin-board')
def index():
    return render_template("bulletin-board.html")

@app.route('/bookbag')
def index():
    return render_template("bookbag.html")

@app.route('/chat')
def index():
    return render_template("bookbag.html")



#Google shit

google_auth = GoogleClient(
    client_id="463567652450-1nvs7u2n0tqeiesku1g44v7id115aa8r.apps.googleusercontent.com",
    client_secret="DrnlWFeQ5RORtxplDmKIW2sC",
    # Do not change this value
    redirect_uri="http://localhost:5000/oauth2callback"
)


@app.route('/login')
def login():
    if not session.get("access_token"):
        return redirect("/oauth2callback")
    with requests.Session() as s:
        s.auth = OAuth2BearerToken(session["access_token"])
        r = s.get("https://www.googleapis.com/plus/v1/people/me?access_token={}".format(session.get("access_token")))
    r.raise_for_status()
    data = r.json()
    session["displayName"] = data["displayName"]
    session["routeName"] = data["displayName"].replace(" ", "_")
    return render_template("profile.html", data=data)

@app.route("/student/<user>")
def profile(user):
    if not session.get("access_token"):
        return redirect("/oauth2callback")
    with requests.Session() as s:
        s.auth = OAuth2BearerToken(session["access_token"])
        r = s.get("https://www.googleapis.com/plus/v1/people/me?access_token={}".format(session.get("access_token")))
    r.raise_for_status()
    data = r.json()
    session["displayName"] = data["displayName"]
    session["routeName"] = data["displayName"].replace(" ", "_")
    return render_template("profile.html", data=data)


@app.route("/oauth2callback")
def google_oauth2callback():
    code = request.args.get("code")
    error = request.args.get("error")
    if error:
        return "error :( {!r}".format(error)
    if not code:
        return redirect(google_auth.authorize_url(
            scope=["profile", "email"],
            response_type="code",
        ))
    data = google_auth.get_token(
        code=code,
        grant_type="authorization_code",
    )
    session["access_token"] = data.get("access_token")
    return redirect("/login")


@app.route("/logout")
def logout():
    session.pop("access_token")
    session.pop("displayName")

    return redirect("/")
