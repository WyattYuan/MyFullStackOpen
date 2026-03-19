import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Statistics = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let all = good + neutral + bad
  let average = good - bad
  let positive = good / all
  if (all > 0) {
    return (<table>
      <tbody>
      <StatisticLine text={"good"} value={good}></StatisticLine>
      <StatisticLine text={"neutral"} value={neutral}></StatisticLine>
      <StatisticLine text={"bad"} value={bad}></StatisticLine>
      <StatisticLine text={"all"} value={all}></StatisticLine>
      <StatisticLine text={"average"} value={average}></StatisticLine>
      <StatisticLine text={"positive"} value={positive * 100 + " %"}></StatisticLine>
      </tbody>
    </table>
    )
  }
  return (
    <>
      <p>No feedback given</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => { setGood(good + 1) }} text={"good"}></Button>
      <Button onClick={() => { setNeutral(neutral + 1) }} text={"neutral"}></Button>
      <Button onClick={() => { setBad(bad + 1) }} text={"bad"}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App