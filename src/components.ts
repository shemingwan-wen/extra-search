interface Options {
  label: string
  value: string
}

function newField(id: string) {
  const div = document.createElement("div")
  div.classList.add("input", "stacked-input", "select", "optional", id)

  return div
}

function newLabel(id: string, labelText: string) {
  const label = document.createElement("label")
  label.classList.add("select", "optional")
  label.setAttribute("for", id)
  label.innerText = labelText

  return label
}

export function newInputField(
  id: string, 
  name: string, 
  labelText: string,
  type: string
) {
  const div = newField(id)
  const label = newLabel(id, labelText)
  const input = document.createElement<"input">("input") 

  input.classList.add("w-full", "max-w-360px", "string", "optional", "input")
  input.type = type
  input.name = name
  input.id = id

  div.append(label)
  div.append(input)

  return div
}

export function newSelectField(
  id: string, 
  name: string, 
  labelText: string, 
  dptions: Options[] = [
    { label: " ", value:"" },
    { label: "yes", value:"yes" },
    { label: "no", value:"no" },
  ]
) {
  const searchParams = new URLSearchParams(window.location.search)

  const div = newField(id)
  const label = newLabel(id, labelText)
  const select = document.createElement("select")

  select.classList.add("select", "optional")
  select.name = name
  select.id = id

  for (let o of dptions) {
    let option = document.createElement("option")
    option.label = o.label
    option.innerText = o.label
    option.value = o.value
    option.selected = searchParams.get(name) === o.value

    select.append(option)
  }

  div.append(label)
  div.append(select)

  return div
}

export function newCheckboxField(
  id: string, 
  labelText: string,
  onClick: (e: PointerEvent) => void,
  checked?: () => boolean
) {
  const div = newField(id)
  const label = newLabel(id, labelText)
  const checkbox = document.createElement<"input">("input") 

  checkbox.classList.add("boolean", "optional")
  checkbox.type = "checkbox"
  checkbox.id = id
  checkbox.onclick = onClick
  if (checked !== undefined) 
    checkbox.checked = checked()
  
  div.append(label)
  div.append(checkbox)

  return div
}