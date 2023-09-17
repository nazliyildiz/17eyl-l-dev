document.addEventListener('DOMContentLoaded', () => {
    let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
    let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
  
    function updateScore() {
      document.getElementById('playerScore').textContent = playerScore;
      document.getElementById('computerScore').textContent = computerScore;
    }
  
    function play(playerChoice) {
      const computerChoices = ['Taş', 'Kağıt', 'Makas'];
      const computerChoice = computerChoices[Math.floor(Math.random() * 3)];
      
      let result;
      if (
        (playerChoice === 'Taş' && computerChoice === 'Makas') ||
        (playerChoice === 'Kağıt' && computerChoice === 'Taş') ||
        (playerChoice === 'Makas' && computerChoice === 'Kağıt')
      ) {
        result = 'Kazandınız!';
        playerScore++;
      } else if (playerChoice === computerChoice) {
        result = 'Berabere!';
      } else {
        result = 'Kaybettiniz!';
        computerScore++;
      }
  
      document.getElementById('result').textContent = `Bilgisayar ${computerChoice} seçti. ${result}`;
  
      localStorage.setItem('playerScore', playerScore);
      localStorage.setItem('computerScore', computerScore);
  
      updateScore();
    }
  
    document.getElementById('tasButton').addEventListener('click', () => play('Taş'));
    document.getElementById('kagitButton').addEventListener('click', () => play('Kağıt'));
    document.getElementById('makasButton').addEventListener('click', () => play('Makas'));
  
    updateScore();
  });