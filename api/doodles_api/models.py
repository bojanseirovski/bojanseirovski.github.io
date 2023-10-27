from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class Doodles(models.Model):
    image = models.TextField(null = True)
    timestamp = models.DateTimeField(auto_now_add = True, auto_now = False, blank = True)
    user = models.ForeignKey(UserModel, on_delete = models.CASCADE, blank = True, null = True)

    def __str__(self):
        return self.image
