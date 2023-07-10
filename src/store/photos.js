import { defineStore } from "pinia"
import { getAllPhotos } from "../services/modules/images"

const usePhotosStore = defineStore('photos', {
  state: () => ({
    photosList: []
  }),
  actions: {
    async fetchPhotosList() {
      await getAllPhotos().then(res => {
        this.photosList = res.data.allPhotos
      })
    }
  }
})


export default usePhotosStore