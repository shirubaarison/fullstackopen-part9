import "./index.css"

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description?: string;
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];


interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <h1>{props.name}</h1>
  )
};

// type Course = {
//   name: string;
//   exerciseCount: number;
// }

interface ContentProps {
  courses: CoursePart[];
}

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
      <div className="lol">
        <h2>{props.name} {props.exerciseCount} </h2> 
        <p id="kk">{props.description}</p> 
      </div>
    )
    case "group":
      return (
      <div className="lol">
        <h2>{props.name} {props.exerciseCount} </h2> 
        <p id="kk">{props.description}</p> 
        <p>project exercises {props.groupProjectCount}</p>
      </div>
      )
    case "background":
      return (
      <div className="lol">
        <h2>{props.name} {props.exerciseCount} </h2> 
        <p id="kk">{props.description}</p> 
        <p>submit to {props.backgroundMaterial}</p>
      </div>
      )
    case "special":
      return (
      <div className="lol">
        <h2>{props.name} {props.exerciseCount} </h2> 
        <p id="kk">{props.description}</p> 
        <p>Requirements: {props.requirements.join(", ")}</p>
      </div>
    )
    default:
      return null;
    }
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <>
    {props.courses.map(course => <Part key={course.name} {...course} />)}
    </>
  )
};

interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps) => {
  return (
    <p>Number of exercises {props.totalExercises}</p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;