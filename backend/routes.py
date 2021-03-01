from flask import Blueprint, render_template, request, send_from_directory, current_app, url_for
from .models.article import Article
import os
import uuid

routes = Blueprint("routes",__name__)

@routes.route("/")
def index():
    return render_template("index.html")

## Projects ##
@routes.route("/project/<id>")
def project(id=None):
    return render_template("project.html")

## BLOG ##
@routes.route("/blog")
def blog():
    articles = Article.objects().order_by('-created_at')
    last_article = None
    if len(articles) > 0:
        last_article = articles[0]
    return render_template("blog.html",articles=articles,last_article=last_article)

@routes.route('/blog/<id>')
def article(id):
    article = Article.objects(id=id).first()
    return render_template("article.html",article=article)


## OTHER ##
@routes.route("/robots.txt")
@routes.route("/sitemap.xml")
def seo_files():
    return send_from_directory(current_app.static_folder, request.path[1:])
