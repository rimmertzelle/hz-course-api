const fs = require('fs');
const coursesFolder = './courses/json/';
const allCourseRoutes = fs.readdirSync(coursesFolder);
const courses = [];

/**
* Function to get a specific json file from the filesystem
* @param a filename with extention of a course
* @return a JSON object of the course
*/
const getCourse = (course) => {
  let courseData = fs.readFileSync(''+coursesFolder+course, 'utf8', (err, data) => {
      if(err) console.log(err);
      return data;
  });
  return JSON.parse(courseData);
}

for (let i = 0; i < allCourseRoutes.length; i++) {
  let courseTemp = getCourse(allCourseRoutes[i]);
  courses[i] = {
    "title": courseTemp.course.title,
    "level": courseTemp.course.level,
    "description": courseTemp.course.description,
    "self_uri": `/courses/${courseTemp.course.abbr}`
  }
}

//* Exports all available courses in JSON */
exports.getCourses = (req, res) => {
  if(req.params.format == 'json'){
    res.send(courses);
  } else{
    res.render('courses', {courses});
  }

};

//* Exports a specific course in JSON */
exports.getCourse = (req, res) => {
  let courseName = req.params.course;
  let courseNameJson = courseName+'.json';
  if (allCourseRoutes.includes(courseNameJson)){
    let courseTemp = getCourse(courseNameJson);
    if(req.params.format == 'json'){
      res.send(courseTemp);
    }else{
      res.render('course', {courseTemp});
    }

  }else{
    res.json('sorry i can not find that course');
  }
}
