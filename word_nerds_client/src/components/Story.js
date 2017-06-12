import React from 'react'



const Story = (props) => {
  console.log('Story props: ', props)
  console.log('Story props: ', props)

  //putting this here for now...
  function replaceAll(string, find, replace) {
    // return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    return string.replace(new RegExp(find, 'g'), replace)
  }

  const eachStory = props.stories.map( (story, index) =>
      <div
        key={index}
        className="Story-orange"
        >

        <h1>
          Story Title: {story.title}
          {/* <Link to={`/stories/${story.id}`}>{story.content}</Link> */}
        </h1>
          {/* Story content: {story.paragraphs.map } */}
          {/* below should be like above, not just a string of content, need more relational data persisting to database */}


          {/* Story content: {story.content } */}
          {/* Story content: {story.content.innerHTML } */}

          Story ID: {story.id}
          <br></br>
          <br></br>

          <strong>
            Story content:
          </strong>
          (splitting and adding line breaks)

          <br></br>
          <br></br>

          {story.content.split('-----').map((paragraph, key) => {
            return (
            <span key={key}>
              {replaceAll(paragraph, "HERO", props.heroName)}
              <br/><br/>
            </span>
          )
          })}

          Story ID: {story.id}
          <br></br>

          <div>
            <a
              href="#EditStoryForm"
              onClick={() => {props.renderEditForm(story.id)}}>
              Edit
            </a>

            <span>   </span>

            <button
              href="#delete"
              onClick={() => {props.handleDeleteStory(story.id)}}>
              Delete
            </button>
          </div>

      </div>
  )


  // <Switch>
  //   <Route path="/students/new" render={() => < StudentForm  onSubmit={ props.onSubmit }/>}/>
  //   <Route exact path="/students/:id" render={ ({match}) => {
  //     const student = props.students.find(student => student.id === parseInt(match.params.id))
  //     return < StudentShow student={student} onDelete={ props.onDelete }/>
  //   } }/>
  //   <Route path="/students/:id/edit" render={({match}) => {
  //     const student = props.students.find( s => s.id === parseInt(match.params.id))
  //     return < StudentEdit student={student} onSubmit={ props.onUpdate } />
  //   }} />
  // </Switch>


  return(
    <div>
      <ul>{ eachStory.reverse() }</ul>
        {/* reverse so most recent story is on the top  */}
      <p>each story can be clicked, which renders it in the EditStoryForm</p>
    </div>
  )

} //end of const Story

export default Story
