const LIST_OF_GROUPS = "LIST_OF_GROUPS";
const LIST_OF_GROUP_COURSES = "LIST_OF_GROUP_COURSES";

const initialGroupState = {
    listOfGroups: [],
    specificGroup: {
        nameOfGroup: "",
        listOfGroupCourses: []
    }
}

const groupReducer = (state = initialGroupState, action) => {
    const newState = { ...state };
    switch (action.type) {

        case LIST_OF_GROUPS:
            console.log("rrrrrrr", action)
            newState.listOfGroups = action.groups;
            return newState;

        case LIST_OF_GROUP_COURSES:
            newState.specificGroup.listOfGroupCourses = action.courses;
            newState.specificGroup.nameOfGroup = action.name;
            return newState;

        default:
            return newState;

    }
}

export function listOfGroupsActionCreator(groups) {
    return { type: LIST_OF_GROUPS, groups: groups };
}

export function listOfGroupCoursesActionCreator(courses, name) {
    return { type: LIST_OF_GROUP_COURSES, courses: courses, name: name };
}


export default groupReducer;