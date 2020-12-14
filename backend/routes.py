from flask import Blueprint, render_template, request, send_from_directory, current_app

routes = Blueprint("routes",__name__)

@routes.route("/")
def index():
    return render_template("index.html")

@routes.route("/blog")
def blog():
    return render_template("blog.html")


@routes.route("/robots.txt")
@routes.route("/sitemap.xml")
def seo_files():
    return send_from_directory(current_app.static_folder, request.path[1:])
