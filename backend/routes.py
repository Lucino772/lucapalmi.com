from flask import Blueprint, render_template, request, send_from_directory, current_app, url_for
from .models.post import Post
import os
import uuid

routes = Blueprint("routes",__name__)

@routes.route("/")
def index():
    return render_template("index.html")

## BLOG ##
@routes.route("/blog")
def blog():
    posts = Post.objects().order_by('-created_at')
    last_post = None
    if len(posts) > 0:
        last_post = posts[0]
    return render_template("blog.html",posts=posts,last_post=last_post)

@routes.route('/blog/<id>')
def post(id):
    post = Post.objects(id=id).first()
    return render_template("post.html",post=post)


## OTHER ##
@routes.route("/robots.txt")
@routes.route("/sitemap.xml")
def seo_files():
    return send_from_directory(current_app.static_folder, request.path[1:])
