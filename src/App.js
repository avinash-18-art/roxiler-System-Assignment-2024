import React, {useState} from 'react'
import TransactionsTable from './components/TransactionsTable'
import Statistics from './components/Statistics'
import BarChart from './components/BarChart'
import './App.css'

const App = () => {
  const [month, setMonth] = useState('March') // Default month is March

  const handleMonthChange = e => {
    setMonth(e.target.value)
  }

  return (
    <div className="app">
      <h1>Transactions Dashboard</h1>

      <div>
        <label>Select Month: </label>
        <select value={month} onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <Statistics month={month} />
      <TransactionsTable month={month} />
      <BarChart month={month} />
    </div>
  )
}

export default App
