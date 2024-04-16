const MY_COURSES = "MY_COURSES";
const TEACHING_COURSES = "TEACHING_COURSES";
const COURSE_DETAILS = "COURSE_DETAILS";
const EDIT_STATUS = "EDIT_STATUS";
const CREATE_NOTE = "CREATE_NOTE";
//const SIGN_UP_FOR_COURSE = "SIGN_UP_FOR_COURSE";

const initialCourseState = {
    listOfMyCourses: [],
    listOfTeachingCourses: [],
    courseDetails: {
        name: "",
        status: "",
        semester: "",
        startYear: 0,
        maximumStudentsCount: 0,
        studentsEnrolledCount: 0,
        studentsInQueueCount: 0,
        requirements: "",
        annotations: "",
        mainTeacherId: "",
        notifications: [],
        teachers: [],
        students: []

    }
}

const courseReducer = (state = initialCourseState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case MY_COURSES:
            newState.listOfMyCourses = action.myCourses;
            return newState;
        case TEACHING_COURSES:
            //console.log("rrrrrrr", action)
            newState.listOfTeachingCourses = action.teachingCourses;
            return newState;
        case COURSE_DETAILS:
            newState.courseDetails.name = action.info.name;
            newState.courseDetails.status = action.info.status;
            newState.courseDetails.semester = action.info.semester;
            newState.courseDetails.startYear = action.info.startYear;
            newState.courseDetails.maximumStudentsCount = action.info.maximumStudentsCount;
            newState.courseDetails.studentsEnrolledCount = action.info.studentsEnrolledCount;
            newState.courseDetails.studentsInQueueCount = action.info.studentsInQueueCount;
            newState.courseDetails.requirements = action.info.requirements;
            newState.courseDetails.annotations = action.info.annotations;
            newState.courseDetails.notifications = action.info.notifications;
            newState.courseDetails.teachers = action.info.teachers;
            newState.courseDetails.students = action.info.students;
            return newState;
        case EDIT_STATUS:
            //console.log("rrrrrrr", action)
            newState.courseDetails.status = action.status;
            return newState;
        case CREATE_NOTE:
            //console.log("rrrrrrr", action)
            newState.courseDetails.notifications = [...newState.courseDetails.notifications, action.note];
            return newState;

        default:
            return newState;

    }
}

export function myCourseActionCreator(myCourses) {
    return { type: MY_COURSES, myCourses: myCourses };
}

export function teachingCourseActionCreator(teachingCourses) {
    return { type: TEACHING_COURSES, teachingCourses: teachingCourses };
}

export function courseDetailsActionCreator(info) {
    return { type: COURSE_DETAILS, info: info };
}


export function editStatusActionCreator(status) {
    return { type: EDIT_STATUS, status: status };
}

export function createNoteActionCreator(note) {
    return { type: CREATE_NOTE, note: note };
}


export default courseReducer;