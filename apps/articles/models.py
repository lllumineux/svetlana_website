from django.db import models
from tinymce import models as tinymce_models


class Article(models.Model):
    name = models.CharField(max_length=256, default='')
    content = tinymce_models.HTMLField()
    is_hidden = models.BooleanField(default=True)
