//Problema #12 Batalla de elfos
//Medio

function elfBattle(elf1, elf2) {
  let hpElf1 = 3
  let hpElf2 = 3
  
  const actions = {
    "A": [1, 0],
    "B": [0, 1],
    "F": [2, 0]
  }
  
  const rounds = Math.min(elf1.length, elf2.length)
  
  for(let i = 0; i < rounds; i++) { 
    const [attackElf1, defenseElf1] = actions[elf1[i]] || [ 0, 0 ]
    const [attackElf2, defenseElf2] = actions[elf2[i]] || [ 0, 0 ]
    
    if (attackElf1 > defenseElf2) hpElf2 -= attackElf1
    if (attackElf2 > defenseElf1) hpElf1 -= attackElf2
    
    if (hpElf1 <= 0 || hpElf2 <= 0) break
  }
  
  if (hpElf1 === hpElf2) return 0
  return hpElf1 > hpElf2 ? 1 : 2;
}