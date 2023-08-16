import { Component, } from "react";
import "./App.css";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      issued: [], returned: [], window: 'issued',
      recordEntry: { book_id: '', book_name: '', borrower_name: '', borrower_role: 'student', borrower_grade: '' }
    }
    // this.loadRecords()
    this.issue = this.issue.bind(this)
    this.returnBook = this.returnBook.bind(this)
  }
  componentDidMount() {
    this.loadRecords()
  }
  loadRecords() {
    let issued = JSON.parse(localStorage.getItem('issued'))
    let returned = JSON.parse(localStorage.getItem('returned'))
    this.setState({ issued: issued ? issued : [], returned: returned ? returned : [] })
  }
  saveRecords() {
    localStorage.setItem('issued', JSON.stringify(this.state.issued))
  }
  issue() {
    if ((this.state.recordEntry.book_id) && (this.state.recordEntry.book_name) && (this.state.recordEntry.borrower_name)) {
      let date = new Date();
      let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      let newIssue = [...this.state.issued, { ...this.state.recordEntry, key: `${this.state.issued.length + 1}-${formattedDate}`, date: formattedDate }]
      this.setState({ issued: newIssue })
      localStorage.setItem('issued', JSON.stringify(newIssue))
    }
    else{
      alert('Fill the input section')

    }
  }
  returnBook(key) {
    let returnedBook = this.state.issued.filter((i) => i.key === key)
    let newReturned = [...returnedBook, ...this.state.returned ? this.state.returned : []]
    let newIssue = this.state.issued.filter((i) => i.key !== key)
    this.setState({ issued: newIssue, returned: newReturned })
    localStorage.setItem('returned', JSON.stringify(newReturned))
    localStorage.setItem('issued', JSON.stringify(newIssue))


  }
  render() {
    return (

      <div className="body">
        <button onClick={() => {
          this.setState({ window: this.state.window === 'issued' ? 'returned' : "issued" })
        }}>{this.state.window === 'issued' ? "Returned Books" : "Issued Books"}</button>
        <table id="booklist">
          <tbody>
            <tr>
              <th>Book ID </th>
              <th>Book Name </th>
              <th>Borrower Name </th>
              <th>Role </th>
              <th>Grade </th>
              <th>Date </th>
              <th>Options </th>
            </tr>
            {this.state.window === 'issued' ? (<>
              {this.state.issued.map((issue) => (<>
                <tr key={issue.key}>
                  <td>{issue.book_id}</td>
                  <td>{issue.book_name}</td>
                  <td>{issue.borrower_name}</td>
                  <td>{issue.borrower_role}</td>
                  <td>{issue.borrower_grade}</td>
                  <td>{issue.date}</td>
                  <td><button onClick={() => { this.returnBook(issue.key) }}>Returned</button></td>
                </tr>
              </>))}
            </>) : (<>
              {this.state.returned.map((issue) => (<>
                <tr key={issue.key}>
                  <td>{issue.book_id}</td>
                  <td>{issue.book_name}</td>
                  <td>{issue.borrower_name}</td>
                  <td>{issue.borrower_role}</td>
                  <td>{issue.borrower_grade}</td>
                  <td>{issue.date}</td>
                </tr>
              </>))}
            </>)}
          </tbody>
        </table>
        <div className="borrowinput">
          <p className="label"><strong>Book ID</strong></p>
          <input id="idInput" placeholder="Book ID" value={this.state.recordEntry.book_id} onChange={(t) => {
            let record = this.state.recordEntry
            record.book_id = t.target.value
            this.setState({ recordEntry: record })
          }} />
          <p className="label"><strong>Book Name</strong></p>
          <input id="bookName" placeholder="Book Name" value={this.state.recordEntry.book_name} onChange={(t) => {
            let record = this.state.recordEntry
            record.book_name = t.target.value
            this.setState({ recordEntry: record })
          }} />
          <p className="label"><strong>Borrower Name</strong></p>
          <input id="borrowername" placeholder="Borrower Name" value={this.state.recordEntry.borrower_name} onChange={(t) => {
            let record = this.state.recordEntry
            record.borrower_name = t.target.value
            this.setState({ recordEntry: record })
          }} />
          <p className="label"><strong>Borrower Role</strong></p>
          <select id="role" value={this.state.recordEntry.borrower_role} onChange={(t) => {
            let record = this.state.recordEntry
            record.borrower_role = t.target.value
            this.setState({ recordEntry: record })
          }}>
            <option value='teacher'>Teacher</option>
            <option value='student'>Student</option>
          </select>
          <p className="label">Borrower Grade(if any)</p>
          <input id="cls" placeholder="Class-Section" value={this.state.recordEntry.borrower_grade} onChange={(t) => {
            let record = this.state.recordEntry
            record.borrower_grade = t.target.value
            this.setState({ recordEntry: record })
          }} />
          <button className="label" onClick={this.issue}>Issue</button>
        </div>
      </div>
    )
  }
}