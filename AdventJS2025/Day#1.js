//Problema #1 Filtrar los regalos defectuosos
//Fácil

function filterGifts(gifts) {
  return gifts.filter(gift => !gift.includes("#"))
}

const gifts1 = ['car', 'doll#arm', 'ball', '#train']
const good1 = filterGifts(gifts1)
console.log(good1)