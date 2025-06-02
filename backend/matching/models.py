from django.db import models


class UserFeedback(models.Model):
    ratings = models.JSONField()  # {"f1": 5, "f2": 4, ...}
    why_wrong = models.TextField(blank=True)
    expected = models.TextField(blank=True)
    change_suggestion = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback at {self.submitted_at}"
# Create your models here.
