//Problema #16 Empaquetando regalos para santa
//Fácil

function packGifts(gifts, maxWeight) {
  let giftsLength = gifts.length
  if(giftsLength <= 0) return 0 
  
  let carriages = 0
  let currentWeigth = 0
  
  for(let n = 0; n < giftsLength; n++)  {
    if (gifts[n] > maxWeight) return null
    
    if ((currentWeigth + gifts[n]) > maxWeight) { 
      carriages++
      currentWeigth = 0;
    }
    
    currentWeigth += gifts[n]
  }
  
  return currentWeigth > 0 ? carriages + 1 : carriages
}

packGifts([2, 3, 4, 1], 5)
// 2 trineos
// Trineo 1: 2 + 3 = 5
// Trineo 2: 4 + 1 = 5
