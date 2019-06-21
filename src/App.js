import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.scss';

const newQuiz = [{
  name: "Food Quiz",
  author: "Grant",
  questions: [
    {
      questionName: "What do you like most?",
      answer: [
        {
          text: "Bananas"
        },
        {
          text: "Apples"
        },
        {
          text: "Oranges"
        }
      ]
    },
    {
      questionName: "Which is a fruit?",
      answer: [
        {
          text: "Potato"
        },
        {
          text: "Carrot"
        },
        {
          text: "Tomato"
        }
      ]
    }

  ]
}]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: newQuiz,
    }
  }
  // componentDidMount() {
  //   fetch('http://localhost:8080/get-all-quizzes')
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(myJson => {
  //       this.setState({
  //         quizzes: myJson,
  //       }, () => {
  //         console.log(this.state.quizzes)
  //       })
  //     });
  // }

  handleAddQuiz = (e) => {
    e.preventDefault();
    console.log(e);
    fetch('http://localhost:8080/add-quiz', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newQuiz),
    })
      .then(res => {
        if (res.status === 200) {
          console.log("quiz added")
        } else {
          console.log("something died")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="/">
            Quizzes by Grant
          </a>
          <i className="far fa-plus-square add-icon" onClick={(e => this.handleAddQuiz(e))}></i>
        </nav>
        <div className="container">
          {this.state.quizzes.map((quiz, index) => {
            return (
              <div key={index} className="card-body">
                <p><h2>{quiz.name}</h2></p>
                <p><h5>Author: {quiz.author}</h5></p>
                {quiz.questions.map((question, index) => {
                  return (
                    <div key={index} className="card">
                      <p><b>Question {index + 1}: {question.questionName}</b></p>
                      {question.answer.map((answer, index) => {
                        return (
                          <p key={index} className="answer">
                            <input type="radio" name="answer" value={answer.text}></input> {answer.text}<br/>
                          </p>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
