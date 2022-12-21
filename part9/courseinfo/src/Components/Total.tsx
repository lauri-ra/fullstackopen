import { CoursePart } from "../types";

const Total = ({ parts }: {parts: CoursePart[]}) => {
    return (
        <div>
            <p>
                {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    )
};

export default Total;