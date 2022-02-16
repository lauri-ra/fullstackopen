import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text} </td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const totalFeedback = good + neutral + bad
  const average = (good - bad) / totalFeedback
  const positive = (good / totalFeedback) * 100

  if (totalFeedback === 0) {
    return <p>No feedback given</p>
  }
  else {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={totalFeedback} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positive + ' %'} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>

      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <h2>Statistics</h2>

      <Statistics good = {good} neutral = {neutral} bad = {bad} />

    </div>
  )
}

export default App
