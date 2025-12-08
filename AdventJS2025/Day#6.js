//Problema #6 Emparejando guantes
//Fácil

function matchGloves(gloves) {
    const res = [];

    const sortGlovesByColor = gloves.reduce((obj, glove) => {
      const { hand, color } = glove;
      if (!obj[color]) obj[color] = { "L": 0, "R": 0 }
      obj[color][hand]++
      
      const pairs = Math.min(obj[color].L, obj[color].R)

      if (pairs > 0) {
          res.push(color)
          obj[color].L--;
          obj[color].R--;
        }
      
      return obj 
    }, {})

    return res;
}