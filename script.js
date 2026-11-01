// =================================================
// PAGE FUNCTIONS
// =================================================


function showRegister() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("registerPage")
        .classList.remove("hidden");

}


function showLogin() {

    document
        .getElementById("registerPage")
        .classList.add("hidden");

    document
        .getElementById("adminLoginPage")
        .classList.add("hidden");

    document
        .getElementById("dashboardPage")
        .classList.add("hidden");

    document
        .getElementById("adminDashboardPage")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

}


function showAdminLogin() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("adminLoginPage")
        .classList.remove("hidden");

}



// =================================================
// GET ALL STUDENTS
// =================================================


function getStudents() {

    return JSON.parse(
        localStorage.getItem("students")
    ) || [];

}



// =================================================
// SAVE ALL STUDENTS
// =================================================


function saveStudents(students) {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}



// =================================================
// STUDENT REGISTER
// =================================================


document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("studentName")
                    .value
                    .trim();


            const id =
                document
                    .getElementById("studentId")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("studentEmail")
                    .value
                    .trim();


            const course =
                document
                    .getElementById("studentCourse")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("studentPassword")
                    .value;


            let students =
                getStudents();



            // CHECK DUPLICATE EMAIL

            const emailExists =
                students.some(
                    function(student) {

                        return (
                            student.email.toLowerCase()
                            ===
                            email.toLowerCase()
                        );

                    }
                );


            if (emailExists) {

                alert(
                    "This email is already registered."
                );

                return;

            }



            // CHECK DUPLICATE STUDENT ID

            const idExists =
                students.some(
                    function(student) {

                        return (
                            student.id.toLowerCase()
                            ===
                            id.toLowerCase()
                        );

                    }
                );


            if (idExists) {

                alert(
                    "This Student ID is already registered."
                );

                return;

            }



            const student = {

                id: id,

                name: name,

                email: email,

                course: course,

                password: password,

                photo: ""

            };


            students.push(student);


            saveStudents(students);


            alert(
                "Account created successfully! 🎉"
            );


            document
                .getElementById("registerForm")
                .reset();


            showLogin();

        }
    );



// =================================================
// STUDENT LOGIN
// =================================================


document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const students =
                getStudents();


            const student =
                students.find(
                    function(student) {

                        return (
                            student.email.toLowerCase()
                            ===
                            email.toLowerCase()
                            &&
                            student.password
                            ===
                            password
                        );

                    }
                );


            if (!student) {

                alert(
                    "Wrong email or password ❌"
                );

                return;

            }


            openStudentDashboard(student);

        }
    );



// =================================================
// OPEN STUDENT DASHBOARD
// =================================================


function openStudentDashboard(student) {


    document
        .getElementById("loginPage")
        .classList.add("hidden");


    document
        .getElementById("dashboardPage")
        .classList.remove("hidden");


    document
        .getElementById("dashboardName")
        .textContent =
        student.name;


    document
        .getElementById("profileName")
        .textContent =
        student.name;


    document
        .getElementById("profileId")
        .textContent =
        student.id;


    document
        .getElementById("profileEmail")
        .textContent =
        student.email;


    document
        .getElementById("profileCourse")
        .textContent =
        student.course;



    if (student.photo) {

        document
            .getElementById("profilePhoto")
            .src =
            student.photo;

    }

    else {

        document
            .getElementById("profilePhoto")
            .src =
            "https://via.placeholder.com/110";

    }


    updateCounts();

}



// =================================================
// STUDENT LOGOUT
// =================================================


function logout() {


    document
        .getElementById("dashboardPage")
        .classList.add("hidden");


    document
        .getElementById("loginPage")
        .classList.remove("hidden");


    document
        .getElementById("loginForm")
        .reset();

}



// =================================================
// OPEN EDIT PROFILE
// =================================================


function openEditProfile() {


    const students =
        getStudents();


    const email =
        document
            .getElementById("profileEmail")
            .textContent;


    const student =
        students.find(
            function(student) {

                return student.email === email;

            }
        );


    if (!student) {

        return;

    }


    document
        .getElementById("editName")
        .value =
        student.name;


    document
        .getElementById("editId")
        .value =
        student.id;


    document
        .getElementById("editEmail")
        .value =
        student.email;


    document
        .getElementById("editCourse")
        .value =
        student.course;


    document
        .getElementById("editProfileCard")
        .classList.remove("hidden");

}



// =================================================
// CLOSE EDIT PROFILE
// =================================================


function closeEditProfile() {


    document
        .getElementById("editProfileCard")
        .classList.add("hidden");


    document
        .getElementById("editPhoto")
        .value = "";

}



// =================================================
// SAVE EDITED PROFILE
// =================================================


document
    .getElementById("editProfileForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let students =
                getStudents();


            const oldEmail =
                document
                    .getElementById("profileEmail")
                    .textContent;


            const studentIndex =
                students.findIndex(
                    function(student) {

                        return (
                            student.email
                            ===
                            oldEmail
                        );

                    }
                );


            if (studentIndex === -1) {

                alert(
                    "Student profile not found."
                );

                return;

            }


            const newName =
                document
                    .getElementById("editName")
                    .value
                    .trim();


            const newId =
                document
                    .getElementById("editId")
                    .value
                    .trim();


            const newEmail =
                document
                    .getElementById("editEmail")
                    .value
                    .trim();


            const newCourse =
                document
                    .getElementById("editCourse")
                    .value
                    .trim();



            // CHECK DUPLICATE EMAIL

            const duplicateEmail =
                students.some(
                    function(student, index) {

                        return (
                            index !== studentIndex
                            &&
                            student.email.toLowerCase()
                            ===
                            newEmail.toLowerCase()
                        );

                    }
                );


            if (duplicateEmail) {

                alert(
                    "This email is already used by another student."
                );

                return;

            }



            // CHECK DUPLICATE ID

            const duplicateId =
                students.some(
                    function(student, index) {

                        return (
                            index !== studentIndex
                            &&
                            student.id.toLowerCase()
                            ===
                            newId.toLowerCase()
                        );

                    }
                );


            if (duplicateId) {

                alert(
                    "This Student ID is already used."
                );

                return;

            }



            students[studentIndex].name =
                newName;


            students[studentIndex].id =
                newId;


            students[studentIndex].email =
                newEmail;


            students[studentIndex].course =
                newCourse;



            const photoInput =
                document
                    .getElementById("editPhoto");


            if (
                photoInput.files.length > 0
            ) {


                const file =
                    photoInput.files[0];


                const reader =
                    new FileReader();


                reader.onload =
                    function() {


                        students[studentIndex].photo =
                            reader.result;


                        saveStudents(students);


                        openStudentDashboard(
                            students[studentIndex]
                        );


                        closeEditProfile();


                        alert(
                            "Profile updated successfully! 🎉"
                        );

                    };


                reader.readAsDataURL(file);

            }

            else {


                saveStudents(students);


                openStudentDashboard(
                    students[studentIndex]
                );


                closeEditProfile();


                alert(
                    "Profile updated successfully! 🎉"
                );

            }

        }
    );



// =================================================
// ADMIN LOGIN
// =================================================


// DEMO ADMIN LOGIN
//
// Username: admin
// Password: admin123


document
    .getElementById("adminLoginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                document
                    .getElementById("adminUsername")
                    .value;


            const password =
                document
                    .getElementById("adminPassword")
                    .value;


            if (
                username === "admin"
                &&
                password === "admin123"
            ) {


                document
                    .getElementById("adminLoginPage")
                    .classList.add("hidden");


                document
                    .getElementById("adminDashboardPage")
                    .classList.remove("hidden");


                document
                    .getElementById("adminLoginForm")
                    .reset();


                displayStudents();


                displayAdminMaterials();


                updateAdminStats();

            }

            else {

                alert(
                    "Wrong admin username or password ❌"
                );

            }

        }
    );



// =================================================
// ADMIN LOGOUT
// =================================================


function adminLogout() {


    document
        .getElementById("adminDashboardPage")
        .classList.add("hidden");


    document
        .getElementById("loginPage")
        .classList.remove("hidden");

}



// =================================================
// DISPLAY ALL STUDENTS
// =================================================


function displayStudents() {


    const container =
        document
            .getElementById(
                "studentList"
            );


    const students =
        getStudents();


    document
        .getElementById(
            "totalStudents"
        )
        .textContent =
        students.length;



    if (students.length === 0) {


        container.innerHTML = `

            <p>
                No students registered yet.
            </p>

        `;


        return;

    }


    container.innerHTML = "";


    students.forEach(
        function(student) {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "student-item";


            const photo =
                student.photo
                ||
                "https://via.placeholder.com/65";


            item.innerHTML = `

                <div class="student-left">


                    <img

                        src="${photo}"

                        class="student-photo"

                        alt="Student Photo"

                    >


                    <div
                        class="student-info">


                        <h3>
                            ${student.name}
                        </h3>


                        <p>
                            🆔 ID:
                            ${student.id}
                        </p>


                        <p>
                            📧 Email:
                            ${student.email}
                        </p>


                        <p>
                            🎓 Course:
                            ${student.course}
                        </p>


                    </div>

                </div>


                <button

                    class="delete-student-btn"

                    onclick="
                        deleteStudent(
                            '${student.id}'
                        )
                    ">

                    🗑️ Delete Student

                </button>

            `;


            container.appendChild(item);

        }
    );

}



// =================================================
// DELETE STUDENT
// =================================================


function deleteStudent(studentId) {


    const students =
        getStudents();


    const student =
        students.find(
            function(student) {

                return student.id === studentId;

            }
        );


    if (!student) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete " +
            student.name +
            "'s account?"
        );


    if (!confirmed) {

        return;

    }


    const updatedStudents =
        students.filter(
            function(student) {

                return student.id !== studentId;

            }
        );


    saveStudents(
        updatedStudents
    );


    displayStudents();


    updateAdminStats();


    alert(
        "Student account deleted successfully."
    );

}



// =================================================
// UPLOAD MATERIAL
// =================================================


document
    .getElementById("uploadForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const type =
                document
                    .getElementById("materialType")
                    .value;


            const subject =
                document
                    .getElementById("materialSubject")
                    .value
                    .trim();


            const title =
                document
                    .getElementById("materialTitle")
                    .value
                    .trim();


            const file =
                document
                    .getElementById("materialFile")
                    .files[0];


            if (!file) {

                alert(
                    "Please select a file."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function() {


                    const material = {

                        id: Date.now(),

                        type: type,

                        subject: subject,

                        title: title,

                        fileName: file.name,

                        fileData: reader.result

                    };


                    let materials =
                        JSON.parse(
                            localStorage.getItem(
                                "materials"
                            )
                        ) || [];


                    materials.push(
                        material
                    );


                    localStorage.setItem(
                        "materials",
                        JSON.stringify(
                            materials
                        )
                    );


                    alert(
                        "Material uploaded successfully! 🎉"
                    );


                    document
                        .getElementById(
                            "uploadForm"
                        )
                        .reset();


                    displayAdminMaterials();


                    updateAdminStats();


                    updateCounts();

                };


            reader.readAsDataURL(file);

        }
    );



// =================================================
// DISPLAY ADMIN MATERIALS
// =================================================


function displayAdminMaterials() {


    const container =
        document
            .getElementById(
                "adminMaterialList"
            );


    let materials =
        JSON.parse(
            localStorage.getItem(
                "materials"
            )
        ) || [];


    if (materials.length === 0) {


        container.innerHTML = `

            <p>
                No materials uploaded yet.
            </p>

        `;


        return;

    }


    container.innerHTML = "";


    materials.forEach(
        function(material) {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "admin-item";


            item.innerHTML = `

                <div>

                    <h3>
                        ${getTypeName(
                            material.type
                        )}
                    </h3>

                    <p>

                        <strong>
                            ${material.title}
                        </strong>

                    </p>

                    <p>

                        Subject:
                        ${material.subject}

                    </p>

                    <p>

                        File:
                        ${material.fileName}

                    </p>

                </div>


                <button

                    class="delete-btn"

                    onclick="
                        deleteMaterial(
                            ${material.id}
                        )
                    ">

                    🗑️ Delete

                </button>

            `;


            container.appendChild(
                item
            );

        }
    );

}



// =================================================
// DELETE MATERIAL
// =================================================


function deleteMaterial(id) {


    if (
        !confirm(
            "Delete this material?"
        )
    ) {

        return;

    }


    let materials =
        JSON.parse(
            localStorage.getItem(
                "materials"
            )
        ) || [];


    materials =
        materials.filter(
            function(material) {

                return material.id !== id;

            }
        );


    localStorage.setItem(
        "materials",
        JSON.stringify(
            materials
        )
    );


    displayAdminMaterials();


    updateAdminStats();


    updateCounts();

}



// =================================================
// STUDENT RESOURCE DISPLAY
// =================================================


function showResources(type) {


    const container =
        document
            .getElementById(
                "resourceList"
            );


    let materials =
        JSON.parse(
            localStorage.getItem(
                "materials"
            )
        ) || [];


    const filtered =
        materials.filter(
            function(material) {

                return material.type === type;

            }
        );


    if (filtered.length === 0) {


        container.innerHTML = `

            <div class="resource-item">

                <h3>
                    No materials available
                </h3>

                <p>
                    Admin has not uploaded
                    anything in this category yet.
                </p>

            </div>

        `;


        return;

    }


    container.innerHTML = "";


    filtered.forEach(
        function(material) {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "resource-item";


            item.innerHTML = `

                <h3>
                    📚 ${material.title}
                </h3>


                <p>

                    <strong>
                        Subject:
                    </strong>

                    ${material.subject}

                </p>


                <p>

                    <strong>
                        File:
                    </strong>

                    ${material.fileName}

                </p>


                <a

                    class="download-btn"

                    href="${material.fileData}"

                    download="${material.fileName}">

                    ⬇️ Download

                </a>

            `;


            container.appendChild(
                item
            );

        }
    );

}



// =================================================
// GET TYPE NAME
// =================================================


function getTypeName(type) {


    if (
        type === "assignments"
    ) {

        return "📝 Assignment";

    }


    if (
        type === "notes"
    ) {

        return "📖 Subject Notes";

    }


    if (
        type === "pyqs"
    ) {

        return "📄 PYQ";

    }


    if (
        type === "questions"
    ) {

        return "❓ Question Bank";

    }


    return "📚 Material";

}



// =================================================
// UPDATE STUDENT COUNTS
// =================================================


function updateCounts() {


    let materials =
        JSON.parse(
            localStorage.getItem(
                "materials"
            )
        ) || [];


    const assignments =
        materials.filter(
            material =>
                material.type ===
                "assignments"
        ).length;


    const notes =
        materials.filter(
            material =>
                material.type ===
                "notes"
        ).length;


    const pyqs =
        materials.filter(
            material =>
                material.type ===
                "pyqs"
        ).length;


    document
        .getElementById(
            "assignmentCount"
        )
        .textContent =
        assignments;


    document
        .getElementById(
            "notesCount"
        )
        .textContent =
        notes;


    document
        .getElementById(
            "pyqCount"
        )
        .textContent =
        pyqs;

}



// =================================================
// UPDATE ADMIN STATS
// =================================================


function updateAdminStats() {


    const students =
        getStudents();


    const materials =
        JSON.parse(
            localStorage.getItem(
                "materials"
            )
        ) || [];


    document
        .getElementById(
            "totalStudents"
        )
        .textContent =
        students.length;


    document
        .getElementById(
            "totalMaterials"
        )
        .textContent =
        materials.length;

}