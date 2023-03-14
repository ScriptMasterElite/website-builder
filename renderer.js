document
  .querySelector('.sidebar .create')
  .addEventListener('click', selectSidebarItem)

document
  .querySelector('.sidebar .collection')
  .addEventListener('click', selectSidebarItem)

function selectSidebarItem() {
  document.querySelectorAll('.sidebar .selected').forEach((el) => {
    el.classList.remove('selected')
  })
  this.classList.add('selected')
  document
    .querySelectorAll('.content > div')
    .forEach((el) => el.classList.add('hidden'))
  if (this.classList.contains('create')) {
    document.querySelector('.content .createPage').classList.remove('hidden')
    loadCreatePage()
  } else if (this.classList.contains('collection')) {
    document
      .querySelector('.content .collectionPage')
      .classList.remove('hidden')
    loadCollection()
  } else {
    location.reload()
  }
}

document
  .querySelector('.sidebar .settings')
  .addEventListener('click', function () {
    document.querySelector('.settingsPopUp').classList.toggle('hidden')
    document.querySelector('.popUpOverlay').classList.toggle('use')
  })

document.querySelector('.popUpOverlay').addEventListener('click', function (e) {
  if (e.target != this) return
  document
    .querySelectorAll('.popUpOverlay > div:not(.hidden)')
    .forEach((el) => el.classList.add('hidden'))
  this.classList.remove('use')
})

function loadCollection() {
  if (localStorage.getItem('pages') == '[]') return
  document
    .querySelectorAll('.content .collectionPage div')
    .forEach((el) => el.remove())
  JSON.parse(localStorage.getItem('pages')).forEach((page) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.id = `card-${page}`
    const title = document.createElement('div')
    title.classList.add('title')
    title.innerHTML = preload.getPageInfo(page).name
    const description = document.createElement('div')
    description.classList.add('description')
    description.innerHTML = preload.getPageInfo(page).description
    card.appendChild(title)
    card.appendChild(description)
    const editBtn = document.createElement('button')
    editBtn.classList.add('editBtn')
    editBtn.innerHTML = 'Edit'
    const startBtn = document.createElement('button')
    startBtn.classList.add('startBtn')
    startBtn.innerHTML = 'Start Server'
    startBtn.addEventListener('click', () => {
      preload.startServerBat(page)
    })
    card.appendChild(editBtn)
    card.appendChild(startBtn)
    document.querySelector('.content .collectionPage').appendChild(card)
  })
}

function loadCreatePage() {
  document
    .querySelector('.content .createPage button')
    .addEventListener('click', () => {
      const name = document.querySelector(
        '.content .createPage #createNameInput'
      ).value
      const description = document.querySelector(
        '.content .createPage #createDescriptionInput'
      ).value
      if (!name || !description) return
      preload.createPage(name, description)
    })
}
