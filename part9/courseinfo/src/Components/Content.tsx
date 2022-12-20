import { ContentProps } from '../types'

const Content = ({ parts }: { parts : ContentProps[] }) => {
    return (
        <div>
            {parts.map(part => (
                <p key={part.name}>
                    {part.name} {part.exerciseCount}
                </p>
            ))}
        </div>
    )
};

export default Content;