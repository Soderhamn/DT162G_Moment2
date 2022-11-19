/* Klass för frontend-delen av att hantera kurser
Av: Marcus Andersson, maan2117@student.miun.se, HT 2022*/

export class Course { //Exportera klassen Course så den kan användas i andra filer
    id = null;
    courseId = "";
    courseName = "";
    coursePeriod = null;

    async getAllCourses() { //Metod för att hämta alal kurser från api:et
        let courses = await fetch("http://127.0.0.1:3000/courses/"); //Hämta alla kurser från apiet
        return courses.json(); //Returnerar alla kurser
    }

    async getCourse(fetchId) { //Metod för att hämta enskild kurs
        let course = await fetch(`http://127.0.0.1/courses/${fetchId}`);
        let courseObj = course.json();

        this.id = courseObj._id; //Tilldela värden från kurs-objektet till instansens medlemsvariabler
        this.courseId = courseObj.courseId;
        this.courseName = courseObj.courseName;
        this.coursePeriod = courseObj.coursePeriod;
    }

    async deleteCourse(id) { //Metod för att radera kurs
        console.log("i deletecourse");
        let message = await fetch(`http://127.0.0.1/courses/${id}`, { method: "DELETE" }); //Delete som metod
        console.log("i deletecourse. Message: " + message);
        return message.json(); //Returnera meddelandet från API:et
    }

}

