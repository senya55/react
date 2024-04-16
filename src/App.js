import logo from './logo.svg';
import './App.css';
import MainHeader from './components/header/mainHeader';
import MainPageMenu from './components/mainPage/mainPageMenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import MainAuth from './components/auth/comp/mainAuth';
import MainProfile from './components/profile/comp/mainProfile';
import MainRegistr from './components/registr/comp/mainRegistr';
import MainGroup from './components/group/comp/mainGroup';
import MainListOfCourses from './components/listOfCourses/comp/mainListOfCourses';
import MainListOfMyCourses from './components/listOfMyCourses/mainListOfMyCourses';
import MainListOfTeachingCourses from './components/listOfTeachingCourses/mainListOfTeachingCourses';
import MainDetailsOfCourse from './components/course/mainDetailsOfCourse';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <MainHeader />
          <Routes>
            <Route path='' Component={MainPageMenu} />
            <Route path='/profile' Component={MainProfile} />
            <Route path='/registration' Component={MainRegistr} />
            <Route path='/login' Component={MainAuth} />
            <Route path='/groups' Component={MainGroup} />
            <Route path='/listOfCourses/:id' Component={MainListOfCourses} />
            <Route path='/courses/my' Component={MainListOfMyCourses} />
            <Route path='/courses/teaching' Component={MainListOfTeachingCourses} />
            <Route path='/courses/:id/details' Component={MainDetailsOfCourse} />
          </Routes>
          {/* <MainGroupMenu /> */}
        </div>
      </BrowserRouter>
    </Provider>


  );
}

export default App;

//test123
//test@gmail.com
//994d10ea-e7f5-4b61-644d-08dc44445562

//gymboss@gachi.com
//B0yNextD00r

//testUser111@gmail.com
//testUser111