/*
- UPPFIFT -
Inlämning: Fredagen den 18 november (23:59).

To Do för betyg G:
[X] Hämta data med fetch (ej cities)
[X] Webbpltsen presenter infomration från fetch
[X] HTML & CSS layout
[X] Minst 2 webbsidor (HTML-filer)
[ ] Minst 2 webbsidor (HTML-filer) läser JS
[X] Nod modulen
[ ] Event modulen
[ ] Minst 10 hämtade värden visas

To Do
[X] Hamburgarmeny
[X] Datum Format
[X] Dynamiska kort med passen från Nordic Wellness
[ ] Dynamiska kort med passen från BeSportyAB
[X] Orna Nordic Wellness & Bliss efter startime
[ ] Knappar som visar enbart Bliss eller NW
[ ] Fetch karta för vart lokalerna finns
[ ] Mina spellistor
[ ] Zumba Wear favoriter
*/

/******************************************************************************/
/* HB Menu
Källa för animering: https://www.youtube.com/watch?v=dIyVTjJAkLw
*/
let menuBtn = document.querySelector('.menuBtn'), nav = document.querySelector('nav ul')

menuActive = false
nav.style.display = 'none'

menuBtn.insertAdjacentHTML('beforeend', `<span></span>`)

menuBtn.addEventListener('click', () => {
  if (!menuActive) {
    menuBtn.classList.add('open')
    menuActive = true
    nav.style.display = 'inline'
  } else if (menuActive) {
    menuBtn.classList.remove('open')
    menuActive = false
    nav.style.display = 'none'
  }
})

/* Nordic Wellness & Bliss activities
Få tillgång till valfri API: https://www.youtube.com/watch?v=6gtHzj4GMLo

Emma = https://api1.nordicwellness.se/GroupActivity/timeslot?clubIds=9097&activities=&dates=&time=&employees=13977&datespan=true
Emma + Jessica = https://api1.nordicwellness.se/GroupActivity/timeslot?clubIds=9097&activities=&dates=&time=&employees=346%2C13977&datespan=true
*/
let bliss = [
  {
    name: 'TEST',
    endtime: '2022-10-27T19:00:00',
    instructor: 'Emma Spitz',
    location: 'Sal B, Stenungsund Arena',
    starttime: '2022-10-27T18:10:00'
  },
  {
    name: 'Bliss 7-9 år',
    endtime: '2022-11-27T19:00:00',
    instructor: 'Emma Spitz',
    location: 'Sal B, Stenungsund Arena',
    starttime: '2022-11-27T18:10:00'
  },
  {
    name: 'Bliss 10-12 år',
    endtime: '2022-11-13T17:05:00',
    instructor: 'Emma Spitz',
    location: 'Sal B, Stenungsund Arena',
    starttime: '2022-11-13T16:05:00'
  },
  {
    name: 'Bliss 7-9 år',
    endtime: '2022-11-13T18:00:00',
    instructor: 'Emma Spitz',
    location: 'Sal B, Stenungsund Arena',
    starttime: '2022-11-13T17:10:00'
  },
  {
    name: 'Bliss 7-9 år',
    endtime: '2022-11-13T19:00:00',
    instructor: 'Emma Spitz',
    location: 'Sal B, Stenungsund Arena',
    starttime: '2022-11-13T18:10:00'
  },
  {
    name: 'Bliss 10-12 år',
    endtime: '2022-11-20T17:05:00',
    instructor: 'Emma Spitz',
    location: 'Sal B, Stenungsund Arena',
    starttime: '2022-11-20T16:05:00'
  },
  {
    name: 'Bliss 7-9 år',
    endtime: '2022-11-20T18:00:00',
    instructor: 'Emma Spitz',
    location: 'Sal B, Stenungsund Arena',
    starttime: "2022-11-20T17:10:00"
  },
  {
    name: 'Bliss 7-9 år',
    endtime: '2022-11-20T19:00:00',
    instructor: 'Emma Spitz',
    location: 'Sal B, Stenungsund Arena',
    starttime: '2022-11-20T18:10:00'
  },
  {
    name: 'Bliss 10-12 år',
    endtime: '2022-11-27T17:05:00',
    instructor: 'Emma Spitz',
    location: 'Sal B, Stenungsund Arena',
    starttime: '2022-11-27T16:05:00'
  },
  {
    name: 'Bliss 7-9 år',
    endtime: '2022-11-27T18:00:00',
    instructor: 'Emma Spitz',
    location: 'Sal B, Stenungsund Arena',
    starttime: '2022-11-27T17:10:00'
  }
]

//Fetch Nordic Wellness API, cards & sort cards by name
function getWorkouts() {
  fetch('https://api1.nordicwellness.se/GroupActivity/timeslot?clubIds=9097&activities=&dates=&time=&employees=346%2C13977&datespan=true')
    .then(res => res.json())
    .then(data => {
      let fetched = data.groupActivities

      /* Fetched keys lowercase
      Källa:
      https://bobbyhadz.com/blog/javascript-lowercase-object-keys
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values
       */
      let iterator = fetched.values(), nordicwellness = [], activities = bliss.concat(nordicwellness)


      for (const value of iterator) {
        function keysToLowerCase(value) {
          return Object.keys(value).reduce((accumulator, key) => { //accumulator is the value returned from the previous iteration
            accumulator[key.toLowerCase()] = value[key]
            return accumulator
          }, {})
        }
        // console.log(value) //Värdena i workoutsUpper
        // keysToLowerCase(value) //Värdena i workouts
        nordicwellness.push(keysToLowerCase(value))
      }

      /* Sort function
      Källa: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      */
      activities.sort((a, b) => {
        if (a.starttime < b.starttime) {
          return -1
        } else if (a.starttime > b.starttime) {
          return 1
        } else {
          return 0
        }
      })


      /* Bliss Button */
      // let sortBlissBtn = document.querySelector('#bliss')
      // sortBlissBtnActive = false

      // sortBlissBtn.addEventListener('click', () => {
      //   if (!sortBlissBtnActive) {
      //     // sortBlissBtn.classList.add('open')
      //     sortBlissBtnActive = true
      //     console.log(sortBlissBtnActive)
      //   } else if (sortBlissBtnActive) {
      //     // menuBtn.classList.remove('open')
      //     sortBlissBtnActive = false
      //     console.log(sortBlissBtnActive)
      //   }
      // })


      /* Cards: Ger varje aktiviet ett kort */
      activities.forEach(activity => {

        /* Change date fomrat
        Källa: https://www.youtube.com/watch?v=nmAHDEO9RW8, https://momentjs.com/
         */
        let time = moment(new Date(activity.starttime)).format('MMM DD [|] hh:mm') + ' - ' + moment(new Date(activity.starttime)).format('hh:mm')

        /* Content for cards
        Källa: https://www.youtube.com/watch?v=zUcc4vW-jsI&t=166s
        PS: Använder <br> istället för flera <p> för att minska antalet tecken.
         */
        let markup = `<li class="card">
                <p>${activity.name}
                <br>
                ${activity.instructor}
                <br>
                <span class="time">${time}</span>
                <br>
                Sal A, Nordic Wellness Stenungsund</p>
                </li>`
        document.querySelector('#cards').insertAdjacentHTML('beforeend', markup)
      })
    })
    .catch(error => console.log(error))
}
getWorkouts() //kör funktionen


/* Instagram Carousel */
let images = []
for (let i = 0; i < 10; i++) {
  let img = { img: 'images/profile.jpeg' }
  images.push(img)
}
// console.log(images)
images.forEach(element => {
  let markup = `<li><img src="${element.img}"></li>`
  document.querySelector('.slide').insertAdjacentHTML('beforeend', markup)
})



/* ©Copyright in footer */
//Källa: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
document.querySelector('#year').innerHTML = new Date().getFullYear()
