
// console.log('Client side javascript file is loaded.')

// client-side javascript enables the use of fetch.

// fetch the data from the url ... then run this function
// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     // extract ... whatever
//     res.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch the weather ... then run this function
function getWeather(location) {
    //const url = 'http://localhost:3000/weather?address=' + location
    const url = '/weather?address=' + location
    fetch(url).then((res) => {
        // if(!res.ok){
        //     console.log(res.text)
        // }
        res.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
                // console.log(data.error)
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
}



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-one') // access @ using #
const msgTwo = document.querySelector('#msg-two')

msgOne.textContent = 'From javascript'

// add event listener
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    // console.log(location)

    msgOne.textContent = 'Loading ...'
    msgTwo.textContent = ''

    getWeather(location)
})
