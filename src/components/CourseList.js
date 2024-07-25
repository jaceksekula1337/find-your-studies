export default function CourseList({ courses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div
          key={course.courseUuid}
          className="transition-all duration-300 relative overflow-hidden
            bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer
            flex flex-col"
        >
          <div className="relative overflow-hidden rounded-t-xl h-48">
            <image
              src="https://via.placeholder.com/400"
              alt={course.courseName}
              className="w-full h-full object-cover"
            />
            <div className="transition-opacity duration-300 ease-in-out absolute h-full w-full bg-blue-700 opacity-0 hover:opacity-60" />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{course.courseName}</h2>
            <p className="mb-2">Instytucja: {course.leadingInstitutionName}</p>
            <p className="mb-2">Miasto: {course.leadingInstitutionCity}</p>
            <p className="mb-2">
              Województwo: {course.leadingInstitutionVoivodeship}
            </p>
            <p className="mb-2">Poziom: {course.levelName}</p>
            <p className="mb-2">Profil: {course.profileName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
