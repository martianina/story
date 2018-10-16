// for local server rails api, run `rails s` on backend, then run `npm start`:
//const baseUrl = 'http://localhost:3000'

// for hosted heroku api:
const baseUrl = process.env.REACT_APP_BASE_URL
//note: to run frontend locally, based on heroku-hosted api, run: heroku local web
//will display app in browser at localhost:5000
//(though i guess this is no different from running `npm start` with the heroku api as baseUrl)

export function getStories() {
  return fetch(`${baseUrl}/stories`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    mode: 'cors',
    method: 'GET',
  }).then( response => response.json() )
}

export function getPlots() {
  return fetch(`${baseUrl}/plots`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    mode: 'cors',
    method: 'GET',
  }).then( response => response.json() )
}

export function getUserCount() {
  return fetch(`${baseUrl}/users`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    mode: 'cors',
    method: 'GET',
  })
  .then (response => response.json() )
}

export function getCurrentUser() {
  return fetch(`${baseUrl}/users/current_user`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    mode: 'cors',
    method: 'GET',
  })
  .then (response => response.json() ) //NOTE: this is how i originally had this... fix this!

  // .then(res => {
  //   if(res.ok) {
  //     // return res;
  //     console.log('88888888888>>>>>>> res is: ', res )
  //     return res.json(); //this is wrong...
  //   } else {
  //     // throw Error(`Request rejected with status ${res.status}`);
  //     console.log(`999999999------->>> Request for current_user ejected with status ${res.status}`);
  //     return false
  //   }
  // })
  // .catch( error => console.log(error) )
}

export function createStory(genres, characters, user_id, storyType) { //adding user_id as argument -- ER Nov 2017
  return fetch(`${baseUrl}/stories`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      story: {
        title: characters.hero.name + "'s story, v1",
        genres: [
          {
            name: genres
          },
          ], //making this an array of genres -- ER Jan 2018
        user_id: user_id, //current user_id here instead of 1
        storyType: [
          {
            name: storyType
          },
        ], //doing this same as genres above...
        characters: [
          {
            name: characters.hero.name,
            gender: characters.hero.gender,
            archetype: "hero"
          },
          {
            name: characters.shadow.name,
            gender: characters.shadow.gender,
            archetype: "shadow"
          },
          {
            name: characters.friend.name,
            gender: characters.friend.gender,
            archetype: "friend"
          },
          {
            name: characters.lover.name,
            gender: characters.lover.gender,
            archetype: "lover"
          },
          {
            name: characters.mentor.name,
            gender: characters.mentor.gender,
            archetype: "mentor"
          },
          {
            name: characters.trickster.name,
            gender: characters.trickster.gender,
            archetype: "trickster"
          },
        ],
      }
    })
  }).then( res => res.json() )
}

export function updateStory(updatedStory) {
  return fetch(`${baseUrl}/stories/${updatedStory.id}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    body: JSON.stringify({
      story: {
        content: updatedStory.input,
        title: updatedStory.title,
        user_id: updatedStory.user_id //story updated by its own user_id
      }
    }),
  }).then( res => res.json() )
}

export function deleteStory(id) {
  return fetch(`${baseUrl}/stories/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    }
  }).then( res => res.json() )
}

export function logIn(params) {
  console.log('logIn function called with params: ', params);
  return fetch(`${baseUrl}/sign_in`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(params)
  }).then( res => res.json() )
}


export function signUp(params) {
  console.log('signUp function called with params: ', params);
  return fetch(`${baseUrl}/users`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        email_address: params.email, //this is email_address on backend (not email)
        name: params.username, //this is name on backend (not username)
        password: params.password
      }
    })
  }).then( res => res.json() )
}
