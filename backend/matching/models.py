from django.db import models

class UserFeedback(models.Model):
    ratings = models.JSONField()
    why_wrong = models.TextField(blank=True)
    expected = models.TextField(blank=True)
    change_suggestion = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    most_accurate = models.TextField(blank=True)
    user_answers = models.JSONField(blank=True, null=True)
    user_profile = models.JSONField(blank=True, null=True)  # <--- NOWE
    recommended_courses = models.JSONField(blank=True, null=True)
    demographics = models.JSONField(blank=True, null=True)  # <--- nowe pole

    def __str__(self):
        return f"Feedback at {self.submitted_at}"
