//Problema #2 Fabrica los juguetes
//Fácil

function manufactureGifts(giftsToProduce) {
   const giftsQueue = []
  
  giftsToProduce.forEach(gift => {
    if (gift.quantity > 0) {
      for (let quantity = gift.quantity; quantity > 0; quantity--){
        giftsQueue.push(gift.toy)
      }
    }
  })
  
  return giftsQueue
}

const production1 = [
  { toy: 'car', quantity: 3 },
  { toy: 'doll', quantity: 1 },
  { toy: 'ball', quantity: 2 }
]

const result1 = manufactureGifts(production1)
console.log(result1)