import { CoursePart } from "../types";

const Part = ({part}: { part:CoursePart }) => {
    switch(part.type) {
        case "normal":
            return (
                <div style={{marginBottom: "10px"}}>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br/>
                    <i>{part.description}</i>
                </div>
            )
        case "groupProject":
            return (
                <div style={{marginBottom: "10px"}}>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div>group projects: {part.groupProjectCount}</div>
                </div>
            )
        case "submission":
            return (
                <div style={{marginBottom: "10px"}}>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br/>
                    <i>{part.description}</i>
                    <div>submit to: {part.exerciseSubmissionLink}</div>
                </div>
            )
        case "special":
            return (
                <div style={{marginBottom: "10px"}}>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br/>
                    <i>{part.description}</i>
                    <div>
                        Required skills:{' '}
                        {part.requirements.map(req => req).join(', ')}
                    </div>
                </div>
            )
    }
};

export default Part;