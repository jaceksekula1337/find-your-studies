# Generated by Django 5.1.1 on 2025-06-08 16:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_question_reverse_scored_alter_question_identifier'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseTraitProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extraversion', models.FloatField()),
                ('agreeableness', models.FloatField()),
                ('conscientiousness', models.FloatField()),
                ('neuroticism', models.FloatField()),
                ('openness', models.FloatField()),
                ('course', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='trait_profile', to='courses.course')),
            ],
        ),
        migrations.DeleteModel(
            name='CourseQuestionScore',
        ),
    ]
