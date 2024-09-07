# courses/models.py

from django.db import models

class Discipline(models.Model):
    discipline_code = models.CharField(max_length=50)
    discipline_name = models.CharField(max_length=255)
    discipline_percentage_share = models.DecimalField(max_digits=5, decimal_places=2)
    discipline_leading = models.BooleanField()

    def __str__(self):
        return self.discipline_name

class OrganizationalUnit(models.Model):
    organizational_unit_uuid = models.UUIDField()
    organizational_unit_full_name = models.CharField(max_length=255)

    def __str__(self):
        return self.organizational_unit_full_name

class Course(models.Model):
    profile_name = models.CharField(max_length=255)
    course_uuid = models.UUIDField(unique=True)
    isced_name = models.CharField(max_length=255)
    legal_basis_type_code = models.CharField(max_length=10)
    course_code = models.CharField(max_length=100)
    main_institution_uuid = models.UUIDField()
    supervising_institution_uuid = models.UUIDField(null=True, blank=True)
    liquidation_date = models.DateField(null=True, blank=True)
    level_code = models.CharField(max_length=10)
    legal_basis_number = models.CharField(max_length=255)
    current_status_code = models.CharField(max_length=10)
    leading_institution_voivodeship = models.CharField(max_length=100)
    teacher_training = models.BooleanField()
    leading_institution_city = models.CharField(max_length=255)
    isced_code = models.CharField(max_length=100)
    co_led = models.BooleanField()
    course_old_code = models.CharField(max_length=100, null=True, blank=True)
    main_institution_kind = models.CharField(max_length=255)
    current_status_name = models.CharField(max_length=255)
    main_institution_kind_code = models.CharField(max_length=10)
    last_refresh = models.DateTimeField()
    legal_basis_type_name = models.CharField(max_length=255)
    level_name = models.CharField(max_length=100)
    leading_institution_voivodeship_code = models.CharField(max_length=10)
    creation_date = models.DateField()
    supervising_institution_name = models.CharField(max_length=255)
    course_name = models.CharField(max_length=255)
    leading_institution_name = models.CharField(max_length=255)
    philological = models.BooleanField()
    leading_institution_is_foreign = models.BooleanField()
    profile_code = models.CharField(max_length=10)
    main_institution_name = models.CharField(max_length=255)
    data_source = models.CharField(max_length=255)

    disciplines = models.ManyToManyField(Discipline)
    organizational_units = models.ManyToManyField(OrganizationalUnit)

    def __str__(self):
        return self.course_name
