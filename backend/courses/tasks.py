import requests
from .models import Course, Discipline, OrganizationalUnit
from datetime import datetime

API_URL = 'https://radon.nauka.gov.pl/opendata/polon/courses?resultNumbers=100'

def fetch_courses():
    token = None
    while True:
        params = {'resultNumbers': 100}
        if token:
            params['token'] = token

        response = requests.get(API_URL, params=params)
        data = response.json()

        # Przetwarzanie wyników
        for item in data['results']:
            course, created = Course.objects.update_or_create(
                course_uuid=item['courseUuid'],
                defaults={
                    'profile_name': item['profileName'],
                    'isced_name': item['iscedName'],
                    'legal_basis_type_code': item['legalBasisTypeCode'],
                    'course_code': item['courseCode'],
                    'main_institution_uuid': item['mainInstitutionUuid'],
                    'supervising_institution_uuid': item.get('supervisingInstitutionUuid'),
                    'liquidation_date': item.get('liquidationDate'),
                    'level_code': item['levelCode'],
                    'legal_basis_number': item['legalBasisNumber'],
                    'current_status_code': item['currentStatusCode'],
                    'leading_institution_voivodeship': item['leadingInstitutionVoivodeship'],
                    'teacher_training': item['teacherTraining'] == 'Tak',
                    'leading_institution_city': item['leadingInstitutionCity'],
                    'isced_code': item['iscedCode'],
                    'co_led': item['coLed'] == 'Tak',
                    'course_old_code': item.get('courseOldCode'),
                    'main_institution_kind': item['mainInstitutionKind'],
                    'current_status_name': item['currentStatusName'],
                    'main_institution_kind_code': item['mainInstitutionKindCode'],
                    'last_refresh': datetime.fromtimestamp(int(item['lastRefresh']) / 1000),
                    'legal_basis_type_name': item['legalBasisTypeName'],
                    'level_name': item['levelName'],
                    'leading_institution_voivodeship_code': item['leadingInstitutionVoivodeshipCode'],
                    'creation_date': item['creationDate'],
                    'supervising_institution_name': item['supervisingInstitutionName'],
                    'course_name': item['courseName'],
                    'leading_institution_name': item['leadingInstitutionName'],
                    'philological': item['philological'] == 'Tak',
                    'leading_institution_is_foreign': item['leadingInstitutionIsForeign'] == 'Tak',
                    'profile_code': item['profileCode'],
                    'main_institution_name': item['mainInstitutionName'],
                    'data_source': item['dataSource'],
                }
            )

            # Przetwarzanie dyscyplin
            course.disciplines.clear()
            for discipline_data in item['disciplines']:
                discipline, _ = Discipline.objects.get_or_create(
                    discipline_code=discipline_data['disciplineCode'],
                    defaults={
                        'discipline_name': discipline_data['disciplineName'],
                        'discipline_percentage_share': discipline_data['disciplinePercentageShare'],
                        'discipline_leading': discipline_data['disciplineLeading'] == 'Tak',
                    }
                )
                course.disciplines.add(discipline)

            # Przetwarzanie jednostek organizacyjnych
            course.organizational_units.clear()
            for org_unit_data in item['organizationalUnits']:
                org_unit, _ = OrganizationalUnit.objects.get_or_create(
                    organizational_unit_uuid=org_unit_data['organizationalUnitUuid'],
                    defaults={'organizational_unit_full_name': org_unit_data['organizationalUnitFullName']}
                )
                course.organizational_units.add(org_unit)

        # Sprawdzenie, czy jest token do kolejnej strony
        token = data.get('token')
        if not token:
            break
