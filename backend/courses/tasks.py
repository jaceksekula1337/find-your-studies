import requests
from .models import Course, Discipline, OrganizationalUnit
from datetime import datetime
from django.utils import timezone

API_URL = 'https://radon.nauka.gov.pl/opendata/polon/courses?resultNumbers=100'

def fetch_courses():
    token = None
    while True:
        params = {'resultNumbers': 100}
        if token:
            params['token'] = token

        response = requests.get(API_URL, params=params)
        
        if response.status_code != 200:
            print(f"Błąd przy pobieraniu danych: {response.status_code}")
            break
        
        data = response.json()

        # Przetwarzanie wyników
        for item in data.get('results', []):
            course, created = Course.objects.update_or_create(
                course_uuid=item.get('courseUuid'),
                defaults={
                    'profile_name': item.get('profileName', ''),
                    'isced_name': item.get('iscedName', ''),
                    'legal_basis_type_code': item.get('legalBasisTypeCode', ''),
                    'course_code': item.get('courseCode', ''),
                    'main_institution_uuid': item.get('mainInstitutionUuid', ''),
                    'supervising_institution_uuid': item.get('supervisingInstitutionUuid', ''),
                    'liquidation_date': item.get('liquidationDate', None),
                    'level_code': item.get('levelCode', ''),
                    'legal_basis_number': item.get('legalBasisNumber', ''),
                    'current_status_code': item.get('currentStatusCode', ''),
                    'leading_institution_voivodeship': item.get('leadingInstitutionVoivodeship', 'Unknown'),
                    'teacher_training': item.get('teacherTraining', '') == 'Tak',
                    'leading_institution_city': item.get('leadingInstitutionCity', ''),
                    'isced_code': item.get('iscedCode', ''),
                    'co_led': item.get('coLed', '') == 'Tak',
                    'course_old_code': item.get('courseOldCode', ''),
                    'main_institution_kind': item.get('mainInstitutionKind', ''),
                    'current_status_name': item.get('currentStatusName', ''),
                    'main_institution_kind_code': item.get('mainInstitutionKindCode', ''),
                    'last_refresh': timezone.make_aware(datetime.fromtimestamp(int(item.get('lastRefresh', '0')) / 1000)),
                    'legal_basis_type_name': item.get('legalBasisTypeName', ''),
                    'level_name': item.get('levelName', ''),
                    'leading_institution_voivodeship_code': item.get('leadingInstitutionVoivodeshipCode', ''),
                    'creation_date': item.get('creationDate', ''),
                    'supervising_institution_name': item.get('supervisingInstitutionName', ''),
                    'course_name': item.get('courseName', ''),
                    'leading_institution_name': item.get('leadingInstitutionName', ''),
                    'philological': item.get('philological', '') == 'Tak',
                    'leading_institution_is_foreign': item.get('leadingInstitutionIsForeign', '') == 'Tak',
                    'profile_code': item.get('profileCode', ''),
                    'main_institution_name': item.get('mainInstitutionName', ''),
                    'data_source': item.get('dataSource', ''),
                }
            )

            # Przetwarzanie dyscyplin
            course.disciplines.clear()
            for discipline_data in item.get('disciplines', []):
                discipline, _ = Discipline.objects.get_or_create(
                    discipline_code=discipline_data.get('disciplineCode', ''),
                    defaults={
                        'discipline_name': discipline_data.get('disciplineName', ''),
                        'discipline_percentage_share': discipline_data.get('disciplinePercentageShare', 0),
                        'discipline_leading': discipline_data.get('disciplineLeading', '') == 'Tak',
                    }
                )
                course.disciplines.add(discipline)

            # Przetwarzanie jednostek organizacyjnych
            course.organizational_units.clear()
            for org_unit_data in item.get('organizationalUnits', []):
                org_unit, _ = OrganizationalUnit.objects.get_or_create(
                    organizational_unit_uuid=org_unit_data.get('organizationalUnitUuid', ''),
                    defaults={'organizational_unit_full_name': org_unit_data.get('organizationalUnitFullName', '')}
                )
                course.organizational_units.add(org_unit)

        # Sprawdzenie, czy jest token do kolejnej strony
        token = data.get('token')
        if not token:
            break
