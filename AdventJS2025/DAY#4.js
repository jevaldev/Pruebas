//Problema #4 Descifra el pin de santa
//Medio

function decodeSantaPin(code) {
  const number = code.match(/\[[^\]]+\]/g); 
  console.log(number)
  let password = ""
  let lastDigit
  
  const mod10 = (input, op) => {
    if(op.length === 0) return input
    let digit = op.reduce((acc, o) => o === "+" ? ++acc : --acc, input) % 10

    if(digit < 0) digit += 10
    return String(digit)
  }
  
  if (number.length < 4) return null
  
  number.forEach(n => {
    let number = n[1]
    let operation = n.slice(2, -1)
    
    if(number === "<") {
      password += lastDigit
    } else {
      number = Number(number)
      
      lastDigit = mod10(number, operation)
      password += lastDigit
    }
  })
  
  return password
}