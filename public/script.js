const keyword = document.querySelector('#keyword')
const city = document.querySelector('#city')
const state = document.querySelector('#state')
const searchBtn = document.querySelector('#button')
const limit = document.querySelector('#limit')
const form = document.querySelector('#form')
const loading = document.createElement('h2')
const errorWeb = document.createElement('h2')
loading.className = 'loading'
errorWeb.className = 'text error loading-done'

searchBtn.addEventListener('click', getInfo)

async function getInfo(e) {
  e.preventDefault()
  try {
    // on-load
    loading.innerHTML =
      'Loading bussiness List. This might take a couple of minutes...'
    form.appendChild(loading)
    loading.innerHTML
    // set inputs
    const keywordInt = await keyword.value
    const cityInt = await city.value
    const stateInt = await state.value
    const limitInt = await limit.value
    // fetch response
    const res = await fetch(
      `http://localhost:5000/api/v1?usersInput=${keywordInt} ${cityInt} ${stateInt}&limit=${limitInt}`,
      { method: 'GET' }
    )
    const data = await res.json()
    const { queryObject } = data
    const par = document.createElement('p')

    // iterate and display info
    const bussInfo = queryObject.map((item, index) => {
      const { name, web, email, facebook, instagram } = item
      if (email !== undefined) {
        if (
          email !== 'not found' ||
          facebook !== 'not found' ||
          instagram !== 'not found'
        ) {
          return `<div class="wrapper"><h3 class="text name"><span class="text">${
            index + 1
          }.</span> ${name}</h3> 
<h4 class="text">Website: <a href="${web}">${web}</a></h4>
<h4 class="text">Facebook: <a href="${facebook}">${facebook}</a></h4>
<h4 class="text">Instagam: <a href="${instagram}">${instagram}</a></h4>
${
  email === 'not found'
    ? `<h4 class="text">Email:   ${email}</h4>`
    : `<h4 class="text">Email:   ${email}</h4>`
}</div>\b`
        }
      } else {
        return `<h2></h2>`
      }
    })

    // load-finished
    if (bussInfo) {
      loading.classList.remove('loading')
      loading.classList.add('loading-done')
      loading.innerHTML = `Found: ${queryObject.length} total businesses`
    }

    par.innerHTML = bussInfo
    form.appendChild(par)

    return par
  } catch (error) {
    console.log(error)
    errorWeb.innerHTML = 'There was an error. Please try again...'
    form.removeChild(loading)
    form.appendChild(errorWeb)
  }
}
