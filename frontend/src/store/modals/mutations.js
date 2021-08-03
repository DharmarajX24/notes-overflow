export function openDirectoryModal (state) {
  this.state.modalsModule.directory.active = true
}

export function closeDirectoryModal (state) {
  this.state.modalsModule.directory.active = false
  this.state.modalsModule.directory.data = {
    name: '',
    description: ''
  }
}

export function setDirectoryName(state, name) {
  this.state.modalsModule.directory.data.name = name
}

export function setDirectoryDescription(state, desc) {
  this.state.modalsModule.directory.data.description = desc
}

export function openImageModal (state) {
  this.state.modalsModule.image.active = true
}

export function closeImageModal (state) {
  this.state.modalsModule.image.active = false
  this.state.modalsModule.image.data = null
}

export function setImage(state, data) {
  console.log(data)
  this.state.modalsModule.image.data = data
}

export function toggleLoading(state, {modal, loading}) {
  this.state.modalsModule[modal].loading = loading
}
