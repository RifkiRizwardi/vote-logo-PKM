let voteCounts = [0, 0, 0]; 

document.addEventListener("DOMContentLoaded", () => {
  const voteButtons = document.querySelectorAll(".vote");
  const declineButtons = document.querySelectorAll(".decline");
  const logoContainers = document.querySelectorAll(".logo");
  const ctx = document.getElementById("voteChart").getContext("2d");
  const launchBtn = document.getElementById("launchWinnerBtn");

  
  const voteChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Logo 1", "Logo 2", "Logo 3"],
      datasets: [
        {
          label: "Jumlah Suara",
          data: voteCounts,
          backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  });

  
  voteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.closest(".logo");
      const index = Array.from(logoContainers).indexOf(parent);
      voteCounts[index]++;
      updateChartAndAnimate(index);
    });
  });

  
  declineButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.closest(".logo");
      const index = Array.from(logoContainers).indexOf(parent);
      if (voteCounts[index] > 0) {
        voteCounts[index]--;
        updateChartAndAnimate(index);
      }
    });
  });

  function updateChartAndAnimate(index) {
    voteChart.data.datasets[0].data = voteCounts;
    voteChart.update();

    const target = logoContainers[index];
    target.classList.add("voted");
    setTimeout(() => target.classList.remove("voted"), 500);

    checkWinnerAndShowLaunchButton();
  }

  function checkWinnerAndShowLaunchButton() {
    const maxVotes = Math.max(...voteCounts);
    const winners = [];

    voteCounts.forEach((count, i) => {
      if (count === maxVotes && maxVotes > 0) {
        winners.push(i);
      }
    });

    if (winners.length === 1) {
      launchBtn.style.display = "inline-block";
      launchBtn.dataset.winner = winners[0];
    } else {
      launchBtn.style.display = "none";
    }
  }

  
  launchBtn.addEventListener("click", () => {
    const index = parseInt(launchBtn.dataset.winner);
    const fileMap = {
      0: "launching logo 1.html",
      1: "launching logo 2.html",
      2: "launching logo 3.html",
    };
    const fileToOpen = fileMap[index];
    if (fileToOpen) {
      window.location.href = fileToOpen;
    } else {
      alert("Gagal meluncurkan logo.");
    }
  });
});


const scrollSections = document.querySelectorAll(".scroll-section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

scrollSections.forEach((section) => observer.observe(section));
