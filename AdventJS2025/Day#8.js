//Problema #8 Encuentra el juguete único
//Fácil

function findUniqueToy(toy) {
  let firstUniqueLetter = ""
  const toyLetters = toy.split("")
  
  const uniqueLetters = toyLetters.reduce((obj, letter) => {
    const letterInLowerCase = letter.toLowerCase()
    
    if(!obj[letterInLowerCase]) { 
      obj[letterInLowerCase] = {"firstLetter": letter, "repeated": false}
    } else {
      obj[letterInLowerCase].repeated = true 
    }
    
    return obj
  }, {})
  
  for (const letter in uniqueLetters) {
    const {firstLetter, repeated} = uniqueLetters[letter]
    if(!repeated) return firstUniqueLetter = firstLetter 
  }
  
  return firstUniqueLetter
}