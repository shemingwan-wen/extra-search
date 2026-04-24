import { newCheckboxField, newInputField, newSelectField, newTextareaField } from "./components"

(function() {
  const path = window.location.pathname
  if (path.match(/tags/)) {
    tagSearch()
  } else if (path.match(/artists/)) {
    artistSearch()
  } else if (path.match(/bulk_update_requests/)) {
    burSearch()
  }
})()

function tagSearch() {
  const searchParams = new URLSearchParams(window.location.search)
  
  const searchForm = document.querySelector("#page .search-form")
  const nameInput = document.querySelector("#search_name_or_alias_matches") as HTMLInputElement
  const categorySelectDiv = document.querySelector(".search_category")
  const submitInput = document.querySelector("input[type=submit]")

  if (searchParams.get("search[name_regex]")) {
    nameInput.name = "search[name_regex]"
    nameInput.value = searchParams.get("search[name_regex]")!
  }

  const { div: regexDiv } = newCheckboxField(
    "search_enable_regex", 
    "Enable regex?", 
    (e) => {
      const target = e.target as HTMLInputElement
      nameInput.name = target.checked ? "search[name_regex]" : "search[name_or_alias_matches]"
    }, 
    () => {
      return !!searchParams.get("search[name_regex]")
    }
  )
  const { div: postCountDiv } = newInputField("search_post_count", "search[post_count]", "Post count", "text")
  const { div: createdAtDiv } = newInputField("search_created_at", "search[created_at]", "Created at", "text")
  const { div: updatedAtDiv } = newInputField("search_updated_at", "search[updated_at]", "Updated at", "text")
  const { div: impliesAnotherDiv } = newSelectField("search_implies_another", "search[has_antecedent_implications]", "Implies another tag?")
  const { div: impliedByAnotherDiv } = newSelectField("search_implied_by_another", "search[has_consequent_implications]", "Implied by another tag?")

  searchForm!.insertBefore(regexDiv, categorySelectDiv)
  searchForm!.insertBefore(postCountDiv, categorySelectDiv!.nextSibling)
  searchForm!.insertBefore(createdAtDiv, postCountDiv!.nextSibling)
  searchForm!.insertBefore(updatedAtDiv, createdAtDiv!.nextSibling)
  searchForm!.insertBefore(impliesAnotherDiv, submitInput)
  searchForm!.insertBefore(impliedByAnotherDiv, submitInput)
}

function artistSearch() {
  const searchParams = new URLSearchParams(window.location.search)

  const searchForm = document.querySelector("#page .search-form")
  const nameInput = document.querySelector("#search_any_name_matches") as HTMLInputElement
  const urlInputDiv = document.querySelector(".search_url_matches")
  const deletedDiv = document.querySelector(".search_is_deleted")
  const submitInput = document.querySelector("input[type=submit]")

  if (searchParams.get("search[name_regex]")) {
    nameInput.name = "search[name_regex]"
    nameInput.value = searchParams.get("search[name_regex]")!
  }

  const { div: regexCheckbox } = newCheckboxField(
    "search_enable_regex", 
    "Enable regex?", 
    (e) => {
      const target = e.target as HTMLInputElement
      nameInput.name = target.checked ? "search[name_regex]" : "search[any_name_matches]"
    }, 
    () => {
      return !!searchParams.get("search[name_regex]")
    }
  )
  const { div: createdAtDiv } = newInputField("search_created_at", "search[created_at]", "Created at", "text")
  const { div: updatedAtDiv } = newInputField("search_updated_at", "search[updated_at]", "Updated at", "text")
  const { div: isBannedDiv } = newSelectField("search_is_banned", "search[is_banned]", "Is banned?")

  searchForm!.insertBefore(regexCheckbox, urlInputDiv)
  searchForm!.insertBefore(createdAtDiv, deletedDiv)
  searchForm!.insertBefore(updatedAtDiv, deletedDiv)
  searchForm!.insertBefore(isBannedDiv, submitInput)
}

function burSearch() {
  const searchParams = new URLSearchParams(window.location.search)

  const searchForm = document.querySelector("#page .search-form")
  const statusSelectDiv = document.querySelector(".search_status")

  const { div: scriptDiv, textarea: scriptTextarea} = newTextareaField("search_script_matches", "search[script_matches]", "Script")
  const { div: forumTopicDiv } = newInputField("search_forum_topic_id", "search[forum_topic_id]", "Topic ID", "text")
  const { div: regexDiv  } = newCheckboxField(
    "search_enable_regex", 
    "Enable regex?", 
    (e) => {
      const target = e.target as HTMLInputElement
      scriptTextarea.name = target.checked ? "search[script_regex]" : "search[script_matches]"
    }, 
    () => {
      return !!searchParams.get("search[script_regex]")
    }
  )

  if (searchParams.get("search[script_matches]")) {
    scriptTextarea.name = "search[script_matches]"
    scriptTextarea.value = searchParams.get("search[script_matches]")!
  } else if (searchParams.get("search[script_regex]")) {
    scriptTextarea.name = "search[script_regex]"
    scriptTextarea.value = searchParams.get("search[script_regex]")!
  }

  searchForm!.insertBefore(scriptDiv, statusSelectDiv)
  searchForm!.insertBefore(regexDiv, scriptDiv.nextSibling!)
  searchForm!.insertBefore(forumTopicDiv, regexDiv.nextSibling!)
}