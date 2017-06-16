import React, { Component } from 'react'

import { Form } from 'semantic-ui-react'

class EditStoryForm extends Component {

  constructor(props) {
    console.log('props from EditStoryForm', props)
    super(props)

    this.state = {
      input: props.story.content,
      title: props.story.title
    }
    this.handleStoryChange = this.handleStoryChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  componentWillReceiveProps(props) { //need this lifecycle method to edit text in textarea
    this.setState({
      input: props.story.content,
      title: props.story.title
    })
  }

  handleTitleChange(event) {
    const title = event.target.value
    this.setState({
      title: title
    })
  }

  handleStoryChange(event) {
    const story = event.target.value
    this.setState({
      input: story
    })
  }


////make this calling one function, not handleUpdateStory and handleUpdateTitle
  handleEditStoryFormSubmit(event) {
    event.preventDefault()
    const updatedStory = {
      input: this.state.input,
      title: this.state.title
    }
    console.log('EditStoryForm submitted: this.props.story: ', this.props.story)
    this.props.handleUpdateStory( updatedStory )
    // this.props.handleUpdateStory( this.state.input ) ///may need to change
    // this.props.handleUpdateTitle( this.state.title ) ///may need to change
    /////do i need a whole new function for handleUpdateTitle???
    this.setState({input: ''}) //this should clear the form
  }

  render() {
    console.log('render is called in EditStory');
    console.log('from EditStoryForm, this.state.input: ', this.state.input);
    return(

      <div>
        <div className="EditStoryForm-green">

          <Form id="EditStoryForm" onSubmit={this.handleEditStoryFormSubmit.bind(this)}>
            <h3>Edit Story</h3>
            Title: <span className="EditStoryText-blue"> {this.state.title}</span>
            <br></br>
            <br></br>
            Story ID: <span className="EditStoryText-blue"> {this.props.story.id}</span>
            <br></br>
            <br></br>
            <Form.Field label='Title'
              placeholder="title here"
              control='input'
              width={15}
              value={this.state.title} //value of input field is state.title, coming from componentWillReceiveProps
              onChange={this.handleTitleChange}
            />

            <Form.Field label='Edit Story'
              placeholder="this is where the story content goes for editing"
              control='textarea' rows='30'
              width={15}
              value={this.state.input} //value of textarea is state.input, coming from componentWillReceiveProps

              // value={this.state.input.split('-----').map((paragraph, key) => {
              //   return (
              //   <span key={key}>
              //     {paragraph}
              //     <br/><br/>
              //   </span>
              // )
              // })}

              onChange={this.handleStoryChange}
            />

            <Form.Button content='Save Story' type="submit" primary/>

          </Form>
        </div>

      </div>
    )
  }
}

EditStoryForm.defaultProps = {
  story: '', //need this so props aren't null
  title: ''
}

export default EditStoryForm
