import { courseDetailsActionCreator, createNoteActionCreator, editStatusActionCreator, myCourseActionCreator, signUpForCourseActionCreator, teachingCourseActionCreator } from "../reducers/course-reducer";
import { createCourseActionCreator, listOfGroupCoursesActionCreator, listOfGroupsActionCreator } from "../reducers/group-reducer";
import { loginActionCreator, logoutActionCreator, profileActionCreator, roleActionCreator, teachersActionCreator } from "../reducers/user-reducer";
import swal from 'sweetalert';

const login = (body) => {

    return dispatch => fetch('https://camp-courses.api.kreosoft.space/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            swal({
                text: "Неправильный логин или пароль",
                timer: 1500
            });
            throw new Error('Не удалось войти')
        }
        return response.json();
    });
}

const registr = (body) => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/registration', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            if (response.status === 409) {
                swal("Данный email уже занят ⛔");
            }
            else {
                swal({
                    text: "Не удалось зарегистрироваться",
                    timer: 3000
                });
            }
            throw new Error('Не удалось зарегистрироваться')
        }
        return response.json();
    });
    // .then(data => {
    //     localStorage.setItem("token", data.token);
    //     dispatch(loginActionCreator());
    // }).catch(error => console.log(error))
}

const profile = () => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/profile', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("token");
            }
            throw new Error('Не удалось получить профиль')
        }
        return response.json();
    }).then(data => {
        dispatch(profileActionCreator(data));
    }).catch(error => console.log(error))
}

const editProfile = (body) => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/profile', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось редактировать профиль')
        }
        return response.json();
    }).then(data => {
        dispatch(profileActionCreator(data));
    }).catch(error => console.log(error))
}

const logout = () => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/logout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось выйти')
        }
        return response.json();
    }).then(data => {
        localStorage.removeItem("token");
        dispatch(logoutActionCreator());
    }).catch(error => console.log(error))
}

const role = () => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/roles', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось получить роль')
        }
        return response.json();
    }).then(data => {
        dispatch(roleActionCreator(data));
    }).catch(error => console.log(error))
}

const teachers = () => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/users', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось получить список пользователей')
        }
        return response.json();
    }).then(data => {
        //console.log("данные из запроса мои курсы", data)
        dispatch(teachersActionCreator(data));
    }).catch(error => console.log(error))
}

export const userAPI = {
    login: login,
    profile: profile,
    logout: logout,
    editProfile: editProfile,
    registr: registr,
    role: role,
    teachers: teachers
}

/////////group

const listOfGroups = () => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/groups', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось получить группы')
        }
        return response.json();
    }).then(data => {
        //console.log("tttt", data)
        dispatch(listOfGroupsActionCreator(data));
    }).catch(error => console.log(error))
}

const createGroup = (body) => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/groups', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            swal({
                text: "Не удалось создать группу :(",
                timer: 3000
            });
            throw new Error('Не удалось создать группу')
        }
        return response.json();
    }).then(data => {
        console.log("успешный запрос на создание группы");
        swal({
            text: "Группа успешно создана!!! 💖",
            timer: 1500
        });
        //dispatch(loginActionCreator());
    }).catch(error => console.log(error))
}

const editGroup = (body, id) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/groups/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            swal({
                text: "Не удалось редактировать группу 🥺",
                timer: 3000
            });
            throw new Error('Не удалось редактировать группу')
        }
        return response.json();
    }).then(data => {
        console.log("успешный запрос на редактирование группы");
        swal({
            text: "Группа успешно отредактированна!!! (❀❛ ֊ ❛„)♡",
            timer: 1500
        });
        //dispatch(loginActionCreator());
    }).catch(error => console.log(error))
}

const deleteGroup = (id) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/groups/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось удалить группу')
        }
        return response.json();
    }).then(data => {
        console.log("успешный запрос на удаление группы");
    }).catch(error => console.log(error))
}

const listOfGroupCourses = (id, name) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/groups/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось получить курсы группы')
        }
        return response.json();
    }).then(data => {
        // console.log("данные из запроса мои курсы", data)
        dispatch(listOfGroupCoursesActionCreator(data, name));
    }).catch(error => console.log(error))
}

export const groupAPI = {
    listOfGroups: listOfGroups,
    createGroup: createGroup,
    deleteGroup: deleteGroup,
    editGroup: editGroup,
    listOfGroupCourses: listOfGroupCourses
}


/////////course

const listOfMyCourses = () => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/courses/my', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось получить мои курсы')
        }
        return response.json();
    }).then(data => {
        console.log("данные из запроса мои курсы", data)
        dispatch(myCourseActionCreator(data));
    }).catch(error => console.log(error))
}

const listOfTeachingCourses = () => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/courses/teaching', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось получить преподаваемые курсы')
        }
        return response.json();
    }).then(data => {
        //console.log("tttt", data)
        dispatch(teachingCourseActionCreator(data));
    }).catch(error => console.log(error))
}

const courseDetails = (id) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/details`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось получить детали курса')
        }
        return response.json();
    }).then(data => {
        //console.log("данные из запроса мои курсы", data)
        dispatch(courseDetailsActionCreator(data));
    }).catch(error => console.log(error))
}

const editStatus = (body, id) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/status`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            swal({
                text: "Не удалось изменить статус ( ｡ • ᴖ • ｡)",
                timer: 1000
            });
            throw new Error('Не удалось поменять статус')
        }
        return response.json();
    }).then(data => {
        //console.log("успешный запрос на редактирование группы");
        dispatch(editStatusActionCreator(body.status));
    }).catch(error => console.log(error))
}

const signUpForCourse = (id, body) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/sign-up`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            swal({
                text: "Вероятно вы уже отправили заявку на этот курс •ᴗ•",
                timer: 3000
            });
            throw new Error('Не удалось подписаться на курс')
        }
        //return response.json();
    }).then(data => {
        console.log("успешно подписались на курс");
        swal({
            text: "Заявка отправлена 🎉🎉🎉",
            timer: 1500
        });
        dispatch(signUpForCourseActionCreator());
    }).catch(error => console.log(error))
}

const createCourse = (id, body) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/groups/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            swal({
                text: "Не удалось создать курс <(ꐦㅍ _ㅍ)>",
                timer: 3000
            });
            throw new Error('Не удалось создать курс');
        }
        return response.json();
    }).then(data => {
        console.log("успешно создан курс");
        swal({
            text: "Курс успешно создан (ෆ˙ᵕ˙ෆ)♡",
            timer: 1500
        });
        dispatch(listOfGroupCoursesActionCreator(data));
    }).catch(error => console.log(error))
}

const editCourse = (id, body) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/courses/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            swal({
                text: "Не удалось редактировать курс (·•᷄∩•᷅ )",
                timer: 3000
            });
            throw new Error('Не удалось редактировать курс')
        }
        return response.json();
    }).then(data => {
        console.log("успешно редактирован курс");
        swal({
            text: "Курс успешно редактирован ♡",
            timer: 1000
        });
        dispatch(courseDetailsActionCreator(data));
    }).catch(error => console.log(error))
}

const editRequirementsAndAnnotations = (id, body) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/requirements-and-annotations`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            swal({
                text: "Не удалось редактировать курс (·•᷄∩•᷅ )",
                timer: 3000
            });
            throw new Error('Не удалось редактировать курс(требования  аннотацию)')
        }
        return response.json();
    }).then(data => {
        console.log("успешно редактирован курс(требования и аннотация)");
        swal({
            text: "Успешно 🥳",
            timer: 1000
        });
        dispatch(courseDetailsActionCreator(data));
    }).catch(error => console.log(error))
}

const createNote = (id, body) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/notifications`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось создать уведомление')
        }
        return response.json();
    }).then(data => {
        console.log("успешно создано уведомление");
        dispatch(createNoteActionCreator(body));
    }).catch(error => console.log(error))
}

const addTeacher = (id, body) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/teachers`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            swal({
                text: "Не удалось добавить учителя :(",
                timer: 3000
            });
            throw new Error('Не удалось добавить учителя')
        }
        return response.json();
    }).then(data => {
        console.log("успешно добавлен учитель");
        dispatch(courseDetailsActionCreator(data));
    }).catch(error => console.log(error))
}

const editStudentStatus = (id, studentId, body) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/student-status/${studentId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось изменить статус ученика')
        }
        return response.json();
    }).then(data => {
        console.log("успешно изменен статус ученика");
        dispatch(courseDetailsActionCreator(data));
    }).catch(error => console.log(error))
}

const editMark = (id, studentId, body) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/marks/${studentId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось изменить отметка ученика')
        }
        return response.json();
    }).then(data => {
        console.log("успешно изменена отметка ученика");
        dispatch(courseDetailsActionCreator(data));
    }).catch(error => console.log(error))
}

const deleteCourse = (id) => {
    return dispatch => fetch(`https://camp-courses.api.kreosoft.space/courses/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось удалить курс')
        }
        return response.json();
    });
    // .then(data => {
    //     console.log("успешный запрос на удаление курса");
    //     swal({
    //         text: "Курс удален (˚ ˃̣̣̥⌓˂̣̣̥ )づ♡",
    //         timer: 3000
    //     });

    // }).catch(error => console.log(error))
}

export const courseAPI = {
    listOfMyCourses: listOfMyCourses,
    listOfTeachingCourses: listOfTeachingCourses,
    courseDetails: courseDetails,
    editStatus: editStatus,
    signUpForCourse: signUpForCourse,
    createCourse: createCourse,
    editCourse: editCourse,
    editRequirementsAndAnnotations: editRequirementsAndAnnotations,
    createNote: createNote,
    addTeacher: addTeacher,
    editStudentStatus: editStudentStatus,
    editMark: editMark,
    deleteCourse: deleteCourse
}