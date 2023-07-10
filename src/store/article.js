import { defineStore } from "pinia"
import { getArticles } from "../services/modules/articles"

const useArticleStore = defineStore('article', {
  state: () => ({
    articlesList: []
  }),
  actions: {
    async fetchArticleList(count, offset) {
      await getArticles(count, offset).then(res => {
        this.articlesList = res.data.endResult
      })
    }
  }
})


export default useArticleStore