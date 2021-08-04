export function setDirectories(state, data) {
  console.log(data)
  this.state.directoriesModule.directories = data
}

export function addDirectory(state, data) {
  this.state.directoriesModule.directories.push(data)
}

export function setImages(state, data) {
  console.log(data)
  const {id, images} = data
  this.state.directoriesModule.images[id] = images
}


