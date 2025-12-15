//Problema 14 Encuentra el camino al regalo
//Fácil


const workshop = {
  storage: {
    shelf: {
      box1: 'train',
      box2: 'switch'
    },
    box: 'car'
  },
  gift: 'doll'
}

function findGiftPath(workshop, gift) {
  function giftPath(workshop, path = []) {
    for (const key in workshop) {
      const value = workshop[key]
      const currentPath = [...path, key]

      if (value === gift) return currentPath

      if (typeof value === "object"){
        const result = giftPath(workshop[key], currentPath)
        if (result.length) return result
      }
    }
    return []
  }

  giftPath(workshop)
} 

findGiftPath(workshop, 'train')
// ➜ ['storage', 'shelf', 'box1']