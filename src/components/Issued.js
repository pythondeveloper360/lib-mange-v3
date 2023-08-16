import { Component } from "react";

export default class Issued extends Component {
    constructor() {
        super();
        this.state = {
            issued: []
        }
    }
    loadIssuedBooks() {
        let issued = localStorage.getItem('issued')
        this.setState({ issued })
    }
    render() {
        return (
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
                </tbody>
                {this.state.issued.map((issue)=>(<></>)) }
            </table>
        )
    }
}