//Problema 19 El viaje secreto de papá Noel
//Fácil

function revealSantaRoute(routes) {
  let santaRoute = new Array(...routes[0])
  const visited = new Set(santaRoute)

  let found = true

  while (found) {
    found = false
    const lastCity = santaRoute[santaRoute.length - 1]

    for (const [from, to] of routes) {
      if (from === lastCity && !visited.has(to)) {
        santaRoute.push(to)
        visited.add(to)
        found = true
        break
      }
    }
  }
  
  return santaRoute
}

revealSantaRoute([
  ['MEX', 'CAN'],
  ['UK', 'GER'],
  ['CAN', 'UK']
])