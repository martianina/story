import React, {Component} from 'react'

import CreateStoryForm from '../components/CreateStoryForm'
import EditStoryForm from '../components/EditStoryForm'
import StoryList from '../components/StoryList'
// import Story from '../components/Story'

class StoryContainer extends Component {
  constructor() {
    super()
    this.state = {
      stories: [], //array of all the (user's) stories
      story: '', //one story's content

      characters: {
        hero: {
          name: 'HERO', //default <<<<---- NEED container to receive this data from CreateStoryForm and pass it down to Story (this should replace all stories with new character names, but it's a start)
          gender: '', //default ...null gives a warning.
        },
        shadow: {
          name: 'SHADOW', //default
          gender: '', //default
        },
        friend: {
          name: 'FRIEND', //default
          gender: '', //default
        }
      },

      // story: [], //one story's content
      title: 'title here', //default title for stories
      storyID: 0, //default is zero
    }
    this.replaceAll = this.replaceAll.bind(this)
    this.updateCharacterNames = this.updateCharacterNames.bind(this)

  } //end of constructor


componentDidMount() {
  fetch('http://localhost:3000/stories', {
    method: 'GET',
  })
  .then( response => response.json() )

  .then( data => this.setState({
    stories: data //setting stories to data
    //data is an array of objects... need .content from each object
  }) )
  //////use this to console.log data after commenting out above .then::::::
  // .then(function(data) { //will replace this with above
  //   console.log('data from API: ', data)
  //   console.log('data[0].content: ', data[0].content)
  // })
} //end of componentDidMount


createStory(content) {
  return fetch("http://localhost:3000/stories", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Authorization': localStorage.getItem('jwt')
    },
    method: 'POST',
    body: JSON.stringify({story: {
      //content: content, //this has to be content, to match attributes on stories_controller on backend (same as below attributes)
      title: "default TITLE here", //default for now
      user_id: 1 //this will be whatever the loggedin user's id is
    }},

    //can i add in characters here in the post request?? do i need to do this to a separate route??
    // {characters: {
    //   hero: {
    //     name: this.state.characters.hero.name, //default
    //     gender: '', //default ...null gives a warning.
    //   },
    //   shadow: {
    //     name: this.state.characters.shadow.name, //default
    //     gender: '', //default
    //   },
    //   friend: {
    //     name: this.state.characters.friend.name, //default
    //     gender: '', //default
    //   }
    // }}
  )
  }).then( res => res.json() )
}



handleSubmit(story, characters) {
  this.createStory(story, characters) //this is calling function above, adding content to database
//THEN doing the below, which adds student to page, along with other students.
    .then( story => this.setState( prevState => ({ stories: [...prevState.stories, story] }) ))

    // .then(this.replaceAll(story, "HERO", "Spider-Man") )

    .catch(err => console.log(err)) //putting this below above line

    //tried calling renderEditForm here, after/within handleSubmit...
    // .then( this.renderEditForm(this.state.storyID).bind(this) ) //then render the story in the edit form
    // this.renderEditForm(this.state.storyID).bind(this) //then render the story in the edit form
}


// updateStory(story, title) {
updateStory(story) {
  return fetch(`http://localhost:3000/stories/${this.state.storyID}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Authorization': localStorage.getItem('jwt')
    },
    body: JSON.stringify( {story: {
        content: story, ///story! same as argument... from EditStoryForm, this is: 'this.state.input'
        title: this.state.title,
        // title: title,
        user_id: 1, //default for now
      }}
    ),
  }).then( res => res.json() )
}


handleUpdateStory(story) { //should this be storyID (or id) instead?
console.log('handleUpdateStory story: ', story)

  this.updateStory(story) //calling function above, updating story on database
  .then( (response) => this.setState({
      stories: response //nasty nas
    }) )
    this.setState({
      story: '',
      title: '',
    })
}


///////need all this just to update title????
///////need all this just to update title????
///////need all this just to update title????
///////need all this just to update title????

updateTitle(title) {
  return fetch(`http://localhost:3000/stories/${this.state.storyID}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Authorization': localStorage.getItem('jwt')
    },
    body: JSON.stringify( {story: {
        content: this.state.story, ///story! same as argument... from EditStoryForm, this is: 'this.state.input'
        title: title,
        user_id: 1, //default for now
      }}
    ),
  }).then( res => res.json() )
}


handleUpdateTitle(title) { //should this be storyID (or id) instead?
console.log('handleUpdateTitle title: ', title)

  this.updateTitle(title) //calling function above, updating story on database
  .then( (response) => this.setState({
      stories: response //nasty nas
    }) )
    this.setState({
      story: '',
      title: '',
    })
}
////////this can't be right....
////////this can't be right....
////////this can't be right....
////////this can't be right....





//below is 'id', no matter what you call it...
renderEditForm(id) {
  let editStory = this.state.stories.find(story => story.id === id)
  console.log('editing story with id: ', id)
  // console.log('editing editStory.content: ', editStory.content)

  this.setState({
    stories: this.state.stories, //this doesn't change
    // story: editStory.content, //CHANGE story TO content!!!!! (attribute in API)
    story: editStory.content, //CHANGE story TO content!!!!! (attribute in API)
    title: editStory.title, //default title for stories
    storyID: editStory.id,
  })

  this.replaceAll(this.state.story, "HERO", "Spider-Man") //this doesn't work.

} //end of renderEditForm


deleteStory(id) {
  return fetch(`http://localhost:3000/stories/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Authorization': localStorage.getItem('jwt')
    },
  }).then( res => res.json() )
  .catch(err => console.log(err))
}


handleDeleteStory(id) {
  if (window.confirm("Are you sure you want to delete this story? 😱😱😱 ")) {

    this.deleteStory(id) //calling function above

    .then( () => {
      this.setState( prevState => ({
        stories: prevState.stories.filter( story => story.id !== id )
      }) )
    })
  }//end if statement
}


// handleHeroInputChange(event) {
//   const heroName = event.target.value
//   const currentState = this.state
//   this.setState({
//     characters: {
//       hero: {
//         name: heroName, //default
//         gender: '', //default ...null gives a warning.
//       },
//       shadow: {
//         name: currentState.characters.shadow.name, //default
//         gender: '', //default
//       },
//       friend: {
//         name: currentState.characters.friend.name, //default
//         gender: '', //default
//       }
//     },
//   })
// }

updateCharacterNames(characterNames) {
  const heroName = characterNames
  const currentState = this.state
  this.setState({
    characters: {
      hero: {
        name: heroName, //default
        gender: '', //default ...null gives a warning.
      },
      shadow: {
        name: currentState.characters.shadow.name, //default
        gender: '', //default
      },
      friend: {
        name: currentState.characters.friend.name, //default
        gender: '', //default
      }
    },
  })
}

///want this function here in container too?
replaceAll(string, find, replace) {
  // return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  return string.replace(new RegExp(find, 'g'), replace)
}

  render() {
    return(
      <div>
        {/* put below forms within Switch ?? */}
        <CreateStoryForm
          handleSubmit={this.handleSubmit.bind(this)}

          renderEditForm={this.renderEditForm.bind(this)}

          updateCharacterNames={this.updateCharacterNames.bind(this)}

          story={this.state.story}

          storyID={this.state.storyID}

        />
        <br></br>
        <EditStoryForm
          handleDeleteStory={this.handleDeleteStory.bind(this)}

          handleUpdateStory={this.handleUpdateStory.bind(this)}

          handleUpdateTitle={this.handleUpdateTitle.bind(this)}

          // passing all state as props to EditStoryForm
          stories={this.state.stories}
          story={this.state.story}

          title={this.state.title}
          storyID={this.state.storyID}
        />

        <p>Below are all the stories from API, via StoryList component:</p>
        <StoryList
          handleDeleteStory={this.handleDeleteStory.bind(this)}

          renderEditForm={this.renderEditForm.bind(this)}

          stories={this.state.stories}

          heroName={this.state.characters.hero.name}

        />
        {/* <Story
          handleDeleteStory={this.handleDeleteStory.bind(this)}

          renderEditForm={this.renderEditForm.bind(this)}

          stories={this.state.stories}
        /> */}
      </div>
    )
  }
}

export default StoryContainer
