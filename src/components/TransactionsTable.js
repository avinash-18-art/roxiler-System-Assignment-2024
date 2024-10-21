import React, {useEffect, useState} from 'react'
import {getTransactions} from '../api'

const TransactionsTable = ({month}) => {
  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [perPage] = useState(10) // Default to 10 items per page

  useEffect(() => {
    fetchTransactions()
  }, [month, search, page])

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions(month, search, page, perPage)
      setTransactions(response.data)
    } catch (error) {
      console.error('Error fetching transactions', error)
    }
  }

  const handleSearchChange = e => {
    setSearch(e.target.value)
    setPage(1) // Reset to first page when searching
  }

  const handleNextPage = () => setPage(page + 1)
  const handlePrevPage = () => setPage(page > 1 ? page - 1 : 1)

  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={handleSearchChange}
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.date_of_sale).toLocaleDateString()}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  )
}

export default TransactionsTable
