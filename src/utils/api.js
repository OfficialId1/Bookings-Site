export function createItem (url, item) {
    return fetch(
      url,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item)
      }
    ).then(res => {
      if (!res.ok) {
        throw new Error("There was a problem creating the item!");
      }
      return res.json();
    });
  }

  export function editItem (url, item) {
    return fetch(
      url,
      {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item)
      }
    ).then(res => {
      if (!res.ok) {
        throw new Error("There was a problem updating the item!");
      }
      return res.json();
    });
  }

  export function deleteItem (url) {
    return fetch(
      url,
      {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
      }
    ).then(res => {
      if (!res.ok) {
        throw new Error("There was a problem updating the item!");
      }
      return res.json();
    });
  }