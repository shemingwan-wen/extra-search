import { newCheckboxField, newInputField, newSelectField } from "./components"

(function() {
  const path = window.location.pathname
  if (path.match(/tags/)) {
    tagSearch()
  } else if (path.match(/artists/)) {
    artistSearch()
  }
})()

function tagSearch() {
  const searchParams = new URLSearchParams(window.location.search)
  
  const searchForm = document.querySelector("#page .search-form")
  const nameInput = document.querySelector("#search_name_or_alias_matches") as HTMLInputElement
  const categorySelectDiv = document.querySelector(".search_category")
  const submitInput = document.querySelector("input[type=submit]")

  if (searchParams.get("search[name_regex]") !== null) {
    nameInput.name = "search[name_regex]"
    nameInput.value = searchParams.get("search[name_regex]")!
  }

  const regexCheckbox = newCheckboxField(
    "search_enable_regex", 
    "Enable regex?", 
    (e) => {
      const target = e.target as HTMLInputElement
      nameInput.name = target.checked ? "search[name_regex]" : "search[name_or_alias_matches]"
    }, 
    () => {
      return searchParams.get("search[name_regex]") !== null
    }
  )
  const postCountInput = newInputField("search_post_count", "search[post_count]", "Post count", "text")
  const createdAtInput = newInputField("search_created_at", "search[created_at]", "Created at", "text")
  const updatedAtInput = newInputField("search_updated_at", "search[updated_at]", "Updated at", "text")
  const impliesAnotherSelect = newSelectField("search_implies_another", "search[has_antecedent_implications]", "Implies another tag?")
  const impliedByAnotherSelect = newSelectField("search_implied_by_another", "search[has_consequent_implications]", "Implied by another tag?")

  searchForm!.insertBefore(regexCheckbox, categorySelectDiv)
  searchForm!.insertBefore(postCountInput, categorySelectDiv!.nextSibling)
  searchForm!.insertBefore(createdAtInput, postCountInput!.nextSibling)
  searchForm!.insertBefore(updatedAtInput, createdAtInput!.nextSibling)
  searchForm!.insertBefore(impliesAnotherSelect, submitInput)
  searchForm!.insertBefore(impliedByAnotherSelect, submitInput)
}

function artistSearch() {
  const submitInput = document.querySelector("input[type=submit]")
  const searchForm = document.querySelector("#page .search-form")
  const deletedDiv = document.querySelector(".search_is_deleted")

  const createdAtInput = newInputField("search_created_at", "search[created_at]", "Created at", "text")
  const updatedAtInput = newInputField("search_updated_at", "search[updated_at]", "Updated at", "text")
  const isBannedSelect = newSelectField("search_is_banned", "search[is_banned]", "Is banned?")

  searchForm!.insertBefore(createdAtInput, deletedDiv)
  searchForm!.insertBefore(updatedAtInput, deletedDiv)
  searchForm!.insertBefore(isBannedSelect, submitInput)
}
