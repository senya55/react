import { courseDetailsActionCreator, editStatusActionCreator, myCourseActionCreator, teachingCourseActionCreator } from "../reducers/course-reducer";
import { listOfGroupCoursesActionCreator, listOfGroupsActionCreator } from "../reducers/group-reducer";
import { loginActionCreator, logoutActionCreator, profileActionCreator, roleActionCreator, teachersActionCreator } from "../reducers/user-reducer";

const login = (body) => {
    return dispatch => fetch('https://camp-courses.api.kreosoft.space/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Не удалось войти')
        }
        return response.json();
    }).then(data => {
        localStorage.setItem("token", data.token);
        dispatch(loginActionCreator());
    }).catch(error => console.log(error))
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
            throw new Error('Не удалось зарегистрироваться')
        }
        return response.json();
    }).then(data => {
        localStorage.setItem("token", data.token);
        dispatch(loginActionCreator());
    }).catch(error => console.log(error))
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
            throw new Error('Не удалось создать группу')
        }
        return response.json();
    }).then(data => {
        console.log("успешный запрос на создание группы");
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
            throw new Error('Не удалось редактировать группу')
        }
        return response.json();
    }).then(data => {
        console.log("успешный запрос на редактирование группы");
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
            throw new Error('Не удалось подписаться на курс')
        }
        return response.json();
    }).then(data => {
        console.log("успешно подписались на курс");
        //dispatch(editStatusActionCreator(body.status));
    }).catch(error => console.log(error))
}

export const courseAPI = {
    listOfMyCourses: listOfMyCourses,
    listOfTeachingCourses: listOfTeachingCourses,
    courseDetails: courseDetails,
    editStatus: editStatus,
    signUpForCourse: signUpForCourse
}

