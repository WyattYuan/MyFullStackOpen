const Header = ({ name }) => <h1>{name}</h1>


const Total = ({ parts }) => {
    const total = parts.reduce((sum, currValue) => {
        // console.log('what is happening', sum, currValue)
        return sum + currValue.exercises
    }, 0)
    return (
        <p>Number of exercises {total}</p>
    )
}


const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)


const Content = ({ course }) => (
    <div>
        {course.parts.map((part) =>
            <Part key={part.id} part={part}></Part>
        )}
        <Total parts={course.parts}></Total>
    </div>
)


const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name}></Header>
            <Content course={course}></Content>
        </>
    )
}


export default Course