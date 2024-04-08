const LOGIN = "LOGIN";
const PROFILE = "PROFILE";
const LOGOUT = "LOGOUT";
const ROLE = "ROLE";
const TEACHERS = "TEACHERS";
const initialUserState = {
    isAuth: 0,
    profile: {
        fullName: "",
        email: "",
        birthDate: ""
    },
    role: {
        isTeacher: false,
        isStudent: false,
        isAdmin: false
    },
    allUsers: []
}

const userReducer = (state = initialUserState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOGIN:
            newState.isAuth = 1;
            return newState;
        case PROFILE:
            newState.profile = action.profile;
            return newState;
        case LOGOUT:
            newState.isAuth = 0;
            return newState;
        case ROLE:
            newState.role = action.role;
            return newState;
        case TEACHERS:
            newState.allUsers = action.teachres;
            return newState;
        default:
            return newState;

    }
}

export function loginActionCreator() {
    return { type: LOGIN };
}

export function profileActionCreator(profile) {
    return { type: PROFILE, profile: profile };
}

export function logoutActionCreator() {
    return { type: LOGOUT };
}

export function roleActionCreator(role) {
    return { type: ROLE, role: role };
}

export function teachersActionCreator(teachres) {
    return { type: TEACHERS, teachres: teachres };
}

export default userReducer;