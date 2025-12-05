//Problema #5 Cuenta atrás para el despegue
//Fácil

function timeUntilTakeOff(fromTime, takeOffTime) {
  const convertTimeZone = (timezone) => {
    return `${timezone.replaceAll('*', '-')
      .replace('@', 'T')
      .replaceAll('|', ':')
      .replace('NP', '')
      .trim()}Z`
  }

  const fromTimeUTC = new Date(convertTimeZone(fromTime))
  const takeOffTimeUTC = new Date(convertTimeZone(takeOffTime))

  const diffInSeconds = Math.floor((takeOffTimeUTC - fromTimeUTC) / 1000)

  return diffInSeconds
}

timeUntilTakeOff('2025*12*24@23|59|30 NP', takeoff)
// 30