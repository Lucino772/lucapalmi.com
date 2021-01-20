from mongoengine import *

class Post(Document):
    title = StringField(max_length=255,required=True)
    thumbnail = URLField(require=True)
    content = StringField(required=True)
    created_at = DateTimeField(required=True)

    meta = {
        'db_alias': 'blog',
        'collection': 'articles'
    }