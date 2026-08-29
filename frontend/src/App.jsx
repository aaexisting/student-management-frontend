import {useState} from 'react'

function App() {
  const [page, setPage] = useState('welcome')
  const [students, setStudents] = useState([])
  const [username ,setUsername] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [loginUsername , setLoginUsername] = useState(" ")
  const [loginPassword , setLoginPassword] = useState(" ")
  const [token , setToken] = useState(" ")
  const [role, setRole] = useState(" ")
  const [courses , setCourses]  = useState([])
  const [courseName, setCourseName] = useState(" ")
  const [courseStudents, setCourseStudents] = useState([])
  const [studentName, setStudentName] = useState(" ")
  const [studentAge, setStudentAge] = useState(" ")
  const [studentMajor, setStudentMajor] = useState(" ")
  const [updateId, setUpdateId] = useState(" ")
  const [updateName, setUpdateName] = useState(" ")
  const [updateAge, setUpdateAge] = useState(" ")
  const [updateMajor, setUpdateMajor] = useState(" ")
  const [deleteId, setDeleteId] = useState("")
  const [courseHours , setCourseHours] = useState("")
  const [deleteCourseName, setDeleteCourseName] = useState("")
  const [enrollmentId , setEnrollmentId] = useState(" ")
  const [enrollmentCourseName , setEnrollmentCourseName]  = useState(" ")




async function getStudents() {
      const response = await fetch(
          'https://student-management-api.fastapicloud.dev/students',
          {
              method : "GET",
              headers : {
                  'Authorization': `Bearer ${token}`,
              }
          }
      )

      const data = await response.json()
      setStudents(data)
}


async function getCourses(){
      const response = await fetch(
          'https://student-management-api.fastapicloud.dev/courses',
          {
              method : "GET",
              headers : {
                     'Authorization': `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()
    console.log("Courses", data)
    setCourses(data)

}

async function getStudentsByCourse(){
      const response = await fetch(
           `https://student-management-api.fastapicloud.dev/courses/${courseName}/students`,
          {
              method : "GET",
              headers:
                  {
                      'Authorization': `Bearer ${token}`,
                  },
          }
      )
      const data = await response.json()
      setCourseStudents(data)
}

async function registerUser() {
  try {
    const response = await fetch(
      'https://student-management-api.fastapicloud.dev/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();
    console.log("status:", response.status);
    console.log("response:", data);

    if (response.status === 200 || response.status === 201) {
      alert("Registered successfully! You can now log in.");
      setPage("login");
    } else {
      alert(data.detail || "Registration failed");
    }
  } catch (error) {
    console.error("Register error:", error);
  }
}

async function loginUser() {
       try {
    const formBody = new URLSearchParams();
    formBody.append('username', loginUsername);
    formBody.append('password', loginPassword);

    const response = await fetch(
      'https://student-management-api.fastapicloud.dev/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      }
    );

    const data = await response.json();
    console.log("status:", response.status);
    console.log("response:", data);

    if (response.status === 200) {
      alert ("Logged in successfully!") ;
      setToken(data.access_token)
      setRole(data.role)
      console.log("Token saved!")

      if (data.role === "admin"){
          setPage("adminDashboard")
      } else {
          setPage("studentDashboard")
      }

    }
    else{ alert(data.detail || "Login failed");

    }

  } catch (error) {
    console.error("Login error:", error);
  }
}

async function addStudent() {
  try {
    const response = await fetch(
      "https://student-management-api.fastapicloud.dev/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: studentName,
          age: Number(studentAge),
          major: studentMajor,
        }),
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

    if (response.ok) {
      alert("Student added successfully!");
      setStudentName("");
      setStudentAge("");
      setStudentMajor("");
      setPage("students");
      getStudents();
    } else {
      alert(data.detail || "Failed to add student");
    }

  } catch (error) {
    console.error("ERROR:", error);
    alert("Could not connect to server");
  }
}

async function updateStudent() {
  try {
      const updateData = {};
      if (updateName.trim()) {
      updateData.name = updateName;
    }
    if (updateAge.trim()) {
      updateData.age = Number(updateAge);
    }
    if (updateMajor.trim()) {
        updateData.major = updateMajor;
    }
    const response = await fetch(
      `https://student-management-api.fastapicloud.dev/students/${updateId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Student updated successfully!");

      setUpdateId("");
      setUpdateName("");
      setUpdateAge("");
      setUpdateMajor("");

      setPage("students");
      getStudents();
    } else {
      alert(JSON.stringify(data.detail || data));
    }
  } catch (error) {
    console.error(error);
    alert("Could not connect to server");
  }
}

async function deleteStudent() {
  try {
    const response = await fetch(
     `https://student-management-api.fastapicloud.dev/students/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Student deleted successfully!");

      setDeleteId("");
      setPage("students");
      getStudents();
    } else {
      alert(JSON.stringify(data.detail || data));
    }

  } catch (error) {
    console.error("Delete error:", error);
    alert("Could not connect to server");
  }
}

async function addCourse(){
      try{
          const response = await fetch(
              `https://student-management-api.fastapicloud.dev/courses`,
              {
                  method : "POST",
                  headers : {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                  },
                  body : JSON.stringify({
                      course_names: [enrollmentCourseName],
                  }),
              }
          );
          const data = await response.json()

          if (response.ok){
              alert("Course added successfully!");
              setCourseName("");
              setCourseHours("");
              setPage("courses");
          } else {
              alert(JSON.stringify(data.detail || data));
          }
      }  catch (error) {
          console.error(error);
          alert("Could not connect to server");
      }
}

async function deleteCourse() {
  try {
    const response = await fetch(
      `https://student-management-api.fastapicloud.dev/courses/${deleteCourseName}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Course deleted successfully!");
      setDeleteCourseName("");
      setPage("courses");
      getCourses();
    } else {
      alert(JSON.stringify(data.detail || data));
    }
  } catch (error) {
    console.error(error);
    alert("Could not connect to server");
  }
}

async function addCourseToStudent() {
        try {
            const response = await fetch(
                `https://student-management-api.fastapicloud.dev/students/${enrollmentId}/courses/${enrollmentCourseName}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                     body: JSON.stringify({
                         course_names: [enrollmentCourseName],
                     }),
                }
            );
            const data = await response.json()

            if (response.ok){
                alert("Student is enrolled!");
                setEnrollmentId("")
                setEnrollmentCourseName("")
            } else {
                alert(JSON.stringify(data.detail || data));
            }
        } catch (error) {
            console.error(error);
            alert("Could not connect to server");
        }
}

async function deleteCourseFromStudent() {
        try {
            const response = await fetch(
                `https://student-management-api.fastapicloud.dev/students/${enrollmentId}/courses/${enrollmentCourseName}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json()

            if (response.ok){
                alert("Course removed from student successfully!");
                setEnrollmentId("")
                setEnrollmentCourseName("")
            } else {
                alert(JSON.stringify(data.detail || data));
            }
        } catch (error) {
            console.error(error);
            alert("Could not connect to server");
        }
}

  return (

      <div>
          {page === "welcome" && (
              <div>
                  <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                      Student Management System
                  </h1>
                  <h2>Welcome!</h2>
                  <p>Please Login or Register to continue.</p>
                  <button onClick={() => setPage("register")}
                          style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                      📝 Register
                  </button>

                  <button onClick={() => setPage("login")}
                          style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                            }}>
                      🔐 Login
                  </button>
              </div>
          )}


           {page === "register" && (
               <div>
                   <h2>Register Page</h2>
                   <input
                       type="text"
                       placeholder="Username"
                       onChange={(e) => setUsername(e.target.value)}
                   />

                   <input
                       type="password"
                       placeholder="Password"
                       onChange={(e) => setPassword(e.target.value)}
                   />

                   <button onClick={registerUser}>
                       Register
                   </button>

                   <button onClick={() => setPage("welcome")}>
                       Back
                   </button>
               </div>
           )}

            {page === "login" && (
                <div>
                    <h2>Login Page</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setLoginUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />

                    <button onClick={loginUser}>
                        Login
                    </button>

                    <button onClick={() => setPage("welcome")}>
                        Back
                    </button>
                </div>
            )}


              {page === "adminDashboard" && (
                  <div>
                      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                          Student Management System
                      </h1>
                      <h2>👨‍💼 Admin Dashboard</h2>

                      <button onClick={() => setPage("studentMenu")}
                              style={{
                                  width: '160px',
                                  height: '100px',
                                  fontSize: '18px',
                                  borderRadius: '12px',
                                  border: '1px solid #ccc',
                                  cursor: 'pointer',
                                  margin: '8px',
                              }}>
                          🎓 Students
                      </button>

                      <button onClick={() => setPage("courseMenu")}
                              style={{
                                  width: '160px',
                                  height: '100px',
                                  fontSize: '18px',
                                  borderRadius: '12px',
                                  border: '1px solid #ccc',
                                  cursor: 'pointer',
                                  margin: '8px',
                              }}>
                          📚 Courses
                      </button>

                      <button onClick={() => setPage("enrollment")}
                              style={{
                                  width: '160px',
                                  height: '100px',
                                  fontSize: '18px',
                                  borderRadius: '12px',
                                  border: '1px solid #ccc',
                                  cursor: 'pointer',
                                  margin: '8px',
                              }}>
                          🔗 Enrollment
                      </button>
                  </div>
              )}

          {page === "studentDashboard" && (
              <div>
                  <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                      Student Management System
                  </h1>
                  <h2>👨‍🎓 Student Dashboard</h2>

                  <button onClick={() => setPage("myCourses")}
                style={{
                    width: '160px',
                    height: '100px',
                    fontSize: '18px',
                    borderRadius: '12px',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    margin: '8px',
                }}>
                      📚 My Courses
                  </button>

                  <button onClick={() => setPage("timetable")}
                style={{
                    width: '160px',
                    height: '100px',
                    fontSize: '18px',
                    borderRadius: '12px',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    margin: '8px',
                }}>
                      🕐 My Timetable
                  </button>

                  <button onClick={() => setPage("schedule")}
                style={{
                    width: '160px',
                    height: '100px',
                    fontSize: '18px',
                    borderRadius: '12px',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    margin: '8px',
                }}>
                      📅 Schedule Planner
                  </button>
              </div>
          )}




              {page === "studentMenu" && (
                  <div>
                      <h2>👨‍🎓 Students</h2>
                      <button onClick={() => setPage("students")}
                      style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                            👥 View Students
                      </button>

                      <button onClick={() => setPage("addStudent")}
                      style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                            ➕ Add Student
                      </button>

                      <button onClick={() => setPage("updateStudent")}
                      style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                            ✏️ Update Student
                      </button>

                      <button onClick={() => setPage("deleteStudent")}
                      style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                            🗑️ Delete Student
                      </button>

                      <button onClick={() => setPage("courseStudents")}
                      style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                            🔎 View Students In Course
                      </button>
                      <br />
                      <br />
                      <button onClick={() => setPage("adminDashboard")}>
                          ← Back to Dashboard
                      </button>
                  </div>
              )}

          {page === "courseMenu" && (
              <div>
                  <h2>📚 Courses</h2>
                      <button onClick={() => setPage("courses")}
                      style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                          📋 View Courses
                      </button>

                      <button onClick={() => setPage("addCourse")}
                      style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                        ➕ Add Course
                      </button>

                      <button onClick={() => setPage("deleteCourse")}
                      style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                        🗑️ Delete Course
                      </button>



                      <br />
                      <br />
                      <button onClick={() => setPage("adminDashboard")}>
                        ← Back to Dashboard
                      </button>
              </div>
          )}

          {page === "enrollment" && (
              <div>
                  <h2> 🔗Student Enrollment</h2>

                      <button onClick={() => setPage("addCourseToStudent")}
                      style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                        ➕ Add Course
                      </button>

                      <button onClick={() => setPage("deleteCourseFromStudent")}
                      style={{
                              width: '160px',
                              height: '100px',
                              fontSize: '18px',
                              borderRadius: '12px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              margin: '8px',
                          }}>
                        🗑️ Delete Course
                      </button>



                      <br />
                      <br />
                      <button onClick={() => setPage("adminDashboard")}>
                        ← Back to Dashboard
                      </button>
              </div>
          )}




      {page === 'students' && (
        <div>
          <h2>Students</h2>
          <button onClick={getStudents}>Get Students</button>
          {students.map((student) => (
            <div key={student.id}>
              <h3>{student.name}</h3>
              <p>Age: {student.age}</p>
              <p>Major: {student.major}</p>
            </div>
          ))}
          <button onClick={() => setPage('studentMenu')}>Back</button>
        </div>
      )}

      {page === 'courses' && (
        <div>
          <h2>Courses Page</h2>
          <button onClick={getCourses}>Get Courses</button>
          {courses.map((course) => (
            <div key={course.id}>
              <h3>{course.name}</h3>
              <p>Credit Hours: {course.credit_hours}</p>
            </div>
          ))}
          <button onClick={() => setPage('courseMenu')}>Back</button>
        </div>
      )}

      {page === 'courseStudents' && (
        <div>
          <h2>Students By Course</h2>
          <input
            type="text"
            placeholder="enter course name"
            onChange={(e) => setCourseName(e.target.value)}
          />
          <button onClick={getStudentsByCourse}>View Students</button>
          {courseStudents.map((student) => (
            <div key={student.id}>
              <h3>{student.name}</h3>
              <p>Age: {student.age}</p>
              <p>Major: {student.major}</p>
            </div>
          ))}
          <button onClick={() => setPage('studentMenu')}>Back</button>
        </div>
      )}

      {page === 'addStudent' && (
        <div>
          <h2>Add Student</h2>
          <input
            type="text"
            placeholder="Student Name"
            onChange={(e) => setStudentName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            onChange={(e) => setStudentAge(e.target.value)}
          />

          <input
              type = "text"
              placeholder = "Major"
              onChange={(e) => setStudentMajor(e.target.value)}
          />

          <button onClick={addStudent}>
              Add Student
          </button>

          <button onClick={() => setPage('studentMenu')}>Back</button>
        </div>
      )}

        {page === 'addCourse' && (
        <div>
          <h2>Add Course</h2>
          <input
            type="text"
            placeholder="Course Name"
            onChange={(e) => setCourseName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Credit Hours"
            onChange={(e) => setCourseHours(e.target.value)}
          />

          <button onClick={addCourse}>
              Add Course
          </button>

          <button onClick={() => setPage('courseMenu')}>Back</button>
          </div>
      )}


        {page === "deleteStudent" && (
            <div>
                <h2> Delete Student</h2>

                <input
                    type = "number"
                    placeholder = "Student Id"
                    onChange={(e) => setDeleteId(e.target.value)}
                 />

                <button onClick={deleteStudent}>
                    Delete Student
                </button>

                <button onClick={() => setPage('studentMenu')}>Back</button>
             </div>
      )}

         {page === "deleteCourse" && (
            <div>
                <h2> Delete Course</h2>

                <input
                    type = "text"
                    placeholder = "Course Name"
                    onChange={(e) => setDeleteCourseName(e.target.value)}
                 />

                <button onClick={deleteCourse}>
                    Delete Course
                </button>

                <button onClick={() => setPage('courseMenu')}>Back</button>
             </div>
      )}


           {page === "addCourseToStudent" && (
              <div>
                  <h2>Student Enrollment</h2>

                  <input
                      type = "number"
                      placeholder = "student ID"
                       onChange={(e) => setEnrollmentId(e.target.value)}
                  />

                  <input
                      type = "text"
                      placeholder = "Course Name"
                       onChange={(e) => setEnrollmentCourseName(e.target.value)}
                  />

                  <button onClick={addCourseToStudent}>
                      Enroll
                  </button>

                  <button onClick={() => setPage('adminDashboard')}>Back</button>

              </div>
          )}

           {page === "deleteCourseFromStudent" && (
              <div>
                  <h2>Student Enrollment</h2>

                  <input
                      type = "number"
                      placeholder = "student ID"
                       onChange={(e) => setEnrollmentId(e.target.value)}
                  />

                  <input
                      type = "text"
                      placeholder = "Course Name"
                       onChange={(e) => setEnrollmentCourseName(e.target.value)}
                  />

                  <button onClick={deleteCourseFromStudent}>
                      Delete
                  </button>

                  <button onClick={() => setPage('adminDashboard')}>Back</button>

              </div>
          )}






        {page === "updateStudent" && (
             <div>
                 <h2>Update Student</h2>

                 <input
                     type="number"
                     placeholder="Student Id"
                     onChange={(e) => setUpdateId(e.target.value)}
                 />

                 <input
                     type="text"
                     placeholder="New Name"
                     onChange={(e) => setUpdateName(e.target.value)}
                 />

                 <input
                     type = "number"
                     placeholder = "New Age"
                     onChange={(e) => setUpdateAge(e.target.value)}
                 />

                 <input
                     type = "text"
                     placeholder = "New Major"
                     onChange={(e) => setUpdateMajor(e.target.value)}
                 />

                 <button onClick={updateStudent}>
                     Update Student
                 </button>

                 <button onClick={() => setPage('studentMenu')}>Back</button>
              </div>
      )}

      </div>
  )
}



export default App