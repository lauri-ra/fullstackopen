import Content from './Components/Content';
import Header from './Components/Header';
import { courseParts } from './types';

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName}/>
      <Content parts={courseParts}/>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default App;